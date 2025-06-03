# Contributing to GameKeeper 🎲

Hey there! 👋 Thanks for wanting to help make board gaming less tedious and more fun!

## What We're Building

Digital companions for physical board games - calculators and trackers that handle the boring math
so you can focus on strategy. We enhance games, we don't replace them! 🎯

## Quick Start

```bash
git clone https://github.com/ThanMatt/gamekeeper.git
cd gamekeeper
pnpm install
pnpm dev
```

Visit http://localhost:4321 and you're ready to go! 🎉

## Ways to Contribute

### 🎮 Add a New Game

The most impactful way to help! Pick a game with tedious calculations and build tools for it.

**Popular requests:** Power Grid, Wingspan, Terraforming Mars, Scythe, Spirit Island

### 🐛 Fix Bugs or 🎨 Improve UI

Found something broken or ugly? Fix it!

## Adding a Game (The Fun Part!)

### 1. Pick Your Game

Play it and identify what sucks about the bookkeeping. Reaching for a calculator? That's what we
should digitize!

### 2. Add to Registry

Edit `src/lib/consts.ts`:

```typescript
{
  id: "123", // BoardGameGeek ID
  name: "Your Game",
  plugins: [{
    name: "Score Calculator",
    description: "Does the math so you don't have to",
    componentId: "your-game-calculator",
    framework: "react" // or vue/astro/svelte
  }]
}
```

### 3. Build Your Component

Create in `src/components/[framework]/games/your-game/`

Check out the Acquire components for examples!

### 4. Register It

Add to `src/lib/component-registry.ts`:

```typescript
"your-game-calculator": {
  component: YourCalculator,
  framework: "react"
}
```

### 5. Test It!

Play the actual game with your digital companion. Does it make the game more fun?

## Guidelines

- **Keep it simple** - Your grandma should be able to use it during game night
- **Mobile-first** - Most people use phones/tablets while playing
- **Test with real games** - If it doesn't work during actual gameplay, it's not ready
- **Write tests** for complex calculations

## Submitting Changes

1. Fork & create a feature branch
2. Make your changes
3. Run `pnpm check` (should pass)
4. Test with the actual board game
5. Create a PR with a good description

## Good Games for GameKeeper

✅ **Great candidates:**

- Complex scoring (Wingspan, Terraforming Mars)
- Resource tracking (Power Grid, Scythe)
- Money/stock calculations (Acquire, Modern Art)#

## Need Help?

- Look at existing game implementations for examples
- Ask questions in GitHub issues/discussions
- BoardGameGeek for game rules

## Recognition

Every contributor gets credit and eternal gratitude from board gamers everywhere! 🙏

---

**Remember:** We're here to make board game nights more fun, not replace the social experience.
Build tools you'd actually want to use during game night!

Happy coding! 🎲✨
