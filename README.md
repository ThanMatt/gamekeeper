# GameKeeper: Board Game Companion Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/00e9d7e0-b588-4a07-81fd-15863f72dfe4/deploy-status)](https://app.netlify.com/projects/gamekeeper/deploys)

## Project Overview

GameKeeper is an open-source static web application that provides digital companions for physical
board games. The platform focuses on enhancing the tabletop gaming experience by handling tedious
calculations, tracking game state, and providing specialized tools while preserving the physical,
social nature of board gaming.

## Core Concept

### What It Is

- **Digital assistants** for physical board games
- **Calculation helpers** and state trackers
- **Role-based interfaces** (Banker, Player, Spectator views)
- **Static web app** requiring no backend infrastructure

### What It's NOT

- Full digital recreation of board games
- Replacement for physical components
- Real-time multiplayer gaming platform
- Complex game engine or simulation

## Technical Architecture

### Technology Stack

#### Core Framework

- **Astro** - Static site generator with island architecture
- **React** - Primary component library for interactive elements
- **TypeScript** - Type safety across the platform

#### Multi-Framework Support

- **Vue.js** - Alternative for contributors preferring Vue
- **Svelte** - Lightweight option for performance-critical components
- **Vanilla JS** - Simple plugins requiring minimal overhead

#### Styling & UI

- **Tailwind CSS** - Utility-first styling framework
- **shadcn/ui** - Pre-built accessible component library
- **Lucide React** - Consistent iconography

#### Data & Build

- **Astro Collections** - Content management for game data
- **BoardGameGeek XML API** - Game metadata during build time
- **Zod** - Runtime validation and type safety

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |
