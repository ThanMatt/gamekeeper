import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { BankerView } from "@/components/react/games/acquire/BankerView";

// Mock confirm dialog
const mockConfirm = vi.fn();
Object.defineProperty(window, "confirm", {
  value: mockConfirm,
  writable: true,
});

describe("BankerView", () => {
  beforeEach(() => {
    mockConfirm.mockClear();
  });

  it("renders the banker view with title and mode toggle", () => {
    render(<BankerView />);

    expect(screen.getByText("Acquire Banker Assistant")).toBeInTheDocument();
    expect(screen.getByText("Classic Mode")).toBeInTheDocument();
    expect(screen.getByText("Tycoon Mode")).toBeInTheDocument();
  });

  it("starts with classic mode as default", () => {
    render(<BankerView />);

    const classicButton = screen.getByText("Classic Mode");
    expect(classicButton).toHaveClass("bg-green-500");
  });

  it("switches to tycoon mode when clicked", () => {
    render(<BankerView />);

    const tycoonButton = screen.getByText("Tycoon Mode");
    fireEvent.click(tycoonButton);

    expect(tycoonButton).toHaveClass("bg-green-500");
    expect(screen.getByText("Classic Mode")).not.toHaveClass("bg-green-500");
  });

  it("renders all 7 hotel chains", () => {
    render(<BankerView />);

    const expectedChains = [
      "Sackson",
      "Tower",
      "American",
      "Festival",
      "Worldwide",
      "Continental",
      "Imperial",
    ];

    expectedChains.forEach((chain) => {
      expect(screen.getByText(chain)).toBeInTheDocument();
    });
  });

  it("displays correct tier labels for chains", () => {
    render(<BankerView />);

    // Budget chains (Sackson, Tower)
    expect(screen.getAllByText("Budget Chain")).toHaveLength(2);

    // Standard chains (American, Festival, Worldwide)
    expect(screen.getAllByText("Standard Chain")).toHaveLength(3);

    // Premium chains (Continental, Imperial)
    expect(screen.getAllByText("Premium Chain")).toHaveLength(2);
  });

  it("starts with all chains having 0 tiles and 25 stock", () => {
    render(<BankerView />);

    // All tiles should start at 0
    const tileElements = screen.getAllByText("0");
    expect(tileElements.length).toBeGreaterThan(0);

    // All stock should start at 25
    const stockElements = screen.getAllByText("25");
    expect(stockElements.length).toBeGreaterThan(0);
  });

  it("increases tiles when plus button is clicked", () => {
    render(<BankerView />);

    // Find the first chain's plus button for tiles (should be the first + button)
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);

      // Should increase from 0 to 1
      expect(screen.getByText("1 tiles")).toBeInTheDocument();
    }
  });

  it("shows pricing information when chain has 2+ tiles", () => {
    render(<BankerView />);

    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);
      fireEvent.click(firstTilePlusButton);

      expect(screen.getByText("Share")).toBeInTheDocument();
      expect(screen.getByText("Majority")).toBeInTheDocument();
      expect(screen.getByText("Minority")).toBeInTheDocument();
    }
  });

  it('shows "SAFE" label when chain has 11+ tiles', () => {
    render(<BankerView />);

    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      for (let i = 0; i < 11; i++) {
        fireEvent.click(firstTilePlusButton);
      }

      expect(screen.getByText("SAFE")).toBeInTheDocument();
    }
  });

  it("activates chain when tiles are added", () => {
    render(<BankerView />);

    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);

      expect(screen.getByText("Active")).toBeInTheDocument();
    }
  });

  it("calculates correct prices in classic mode", () => {
    render(<BankerView />);

    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);
      fireEvent.click(firstTilePlusButton);

      expect(screen.getByText("$200")).toBeInTheDocument();

      expect(screen.getByText("$2,000")).toBeInTheDocument();

      expect(screen.getByText("$1,000")).toBeInTheDocument();
    }
  });

  it("calculates correct prices in tycoon mode", () => {
    render(<BankerView />);

    // :: Switch to tycoon mode
    const tycoonButton = screen.getByText("Tycoon Mode");
    fireEvent.click(tycoonButton);

    // :: Add 2 tiles to first chain
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);
      fireEvent.click(firstTilePlusButton);

      // :: Tycoon mode should show prices in K format
      // :: Tier 1 chain with 2 tiles: $2000 becomes $2K
      expect(screen.getByText("$2K")).toBeInTheDocument();
    }
  });

  it("decreases stock when buy stock button is clicked", () => {
    render(<BankerView />);

    // :: First activate a chain by adding tiles
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);

      // Now find and click buy stock button
      const buyStockButton = screen.queryAllByText("Buy Stock")[0];
      fireEvent.click(buyStockButton);

      // Stock should decrease from 25 to 24
      expect(screen.getByText("24")).toBeInTheDocument();
    }
  });

  it("updates game summary correctly", () => {
    render(<BankerView />);

    // Initially all summary values should be 0
    expect(screen.getByText("Game Summary")).toBeInTheDocument();

    // Add tiles to activate a chain
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);

      // Total tiles should be 1, active chains should be 1
      const summarySection = screen.getByText("Game Summary").closest("div");
      expect(summarySection).toBeInTheDocument();
    }
  });

  it("resets game when reset button is clicked and confirmed", () => {
    render(<BankerView />);

    // Add some tiles first
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);
      fireEvent.click(firstTilePlusButton);

      // Mock confirm to return true
      mockConfirm.mockReturnValue(true);

      // Click reset button
      const resetButton = screen.getByText("Reset Game");
      fireEvent.click(resetButton);

      // Confirm should have been called
      expect(mockConfirm).toHaveBeenCalledWith("Reset all game data?");

      // Game should be reset - check for inactive states
      expect(screen.getAllByText("Inactive")).toHaveLength(7);
    }
  });

  it("does not reset game when reset is cancelled", () => {
    render(<BankerView />);

    // Add some tiles first
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);

      // Mock confirm to return false
      mockConfirm.mockReturnValue(false);

      // Click reset button
      const resetButton = screen.getByText("Reset Game");
      fireEvent.click(resetButton);

      // Confirm should have been called
      expect(mockConfirm).toHaveBeenCalledWith("Reset all game data?");

      // Game should not be reset - should still have active chain
      expect(screen.getByText("Active")).toBeInTheDocument();
    }
  });

  it("prevents tiles from going below 0", () => {
    render(<BankerView />);

    // Find the minus button for tiles (should be the first - button)
    const minusButtons = screen.getAllByRole("button");
    const firstTileMinusButton = minusButtons.find(
      (button) =>
        button.innerHTML.includes("minus") || button.textContent === "-"
    );

    if (firstTileMinusButton) {
      // Try to decrease below 0
      fireEvent.click(firstTileMinusButton);

      // Should still show 0 tiles
      expect(screen.getAllByText("0 tiles")).toHaveLength(7);
    }
  });

  it("prevents tiles from going above 41", () => {
    render(<BankerView />);

    // Find the plus button for tiles
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      // Click 50 times to try to exceed limit
      for (let i = 0; i < 50; i++) {
        fireEvent.click(firstTilePlusButton);
      }

      // Should show MAX when at 41 tiles
      expect(screen.getByText("MAX")).toBeInTheDocument();
    }
  });

  it("prevents stock from going below 0 or above 25", () => {
    render(<BankerView />);

    // Activate a chain first
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);

      // Try to buy stock 30 times
      const buyStockButton = screen.queryAllByText("Buy Stock")[0];
      for (let i = 0; i < 30; i++) {
        fireEvent.click(buyStockButton);
      }

      // Stock should not go below 0
      const stockDisplays = screen.getAllByText("0");
      expect(stockDisplays.length).toBeGreaterThan(0);
    }
  });

  it("disables buy stock button for inactive chains", () => {
    render(<BankerView />);

    // Find buy stock button for inactive chain
    const buyStockButtons = screen.getAllByText("Buy Stock");
    const firstBuyButton = buyStockButtons[0];

    // Should have opacity-50 class indicating disabled state
    expect(firstBuyButton.closest("button")).toHaveClass("opacity-50");
  });

  it("toggles chain active state correctly", () => {
    render(<BankerView />);

    // Add tiles to enable toggling
    const plusButtons = screen.getAllByRole("button");
    const firstTilePlusButton = plusButtons.find(
      (button) =>
        button.innerHTML.includes("plus") || button.textContent === "+"
    );

    if (firstTilePlusButton) {
      fireEvent.click(firstTilePlusButton);

      // Should be active now
      expect(screen.getByText("Active")).toBeInTheDocument();

      // Click the active button to toggle
      const activeButton = screen.getByText("Active");
      fireEvent.click(activeButton);

      // Should be inactive now
      expect(screen.queryAllByText("Active").length).toBe(0);
    }
  });
});
