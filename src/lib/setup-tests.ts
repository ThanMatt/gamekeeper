import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
//import { cleanup as svelteCleanup } from '@testing-library/svelte';
import { afterEach, vi } from "vitest";

// Mock window.confirm globally
Object.defineProperty(window, "confirm", {
  value: vi.fn(),
  writable: true,
});

// Mock window.alert globally
Object.defineProperty(window, "alert", {
  value: vi.fn(),
  writable: true,
});

// Mock localStorage (since it's not available in Claude artifacts)
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
