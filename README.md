# GameKeeper: Board Game Companion Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/00e9d7e0-b588-4a07-81fd-15863f72dfe4/deploy-status)](https://app.netlify.com/projects/gamekeeper/deploys)

GameKeeper is an open-source static web application that provides digital companions for physical
board games. The platform focuses on enhancing the tabletop gaming experience by handling tedious
calculations, tracking game state, and providing specialized tools while preserving the physical,
social nature of board gaming.

## 🎯 Vision

Create a community driven platform where developers can contribute game-specific companion tools
that eliminate bookkeeping overhead without replacing the physical game experience.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ThanMatt/gamekeeper.git
   cd gamekeeper
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:4321`

## 📦 Available Commands

### Development

| Command        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `pnpm dev`     | Start development server with hot reload on `0.0.0.0:4321` |
| `pnpm build`   | Build the application for production                       |
| `pnpm preview` | Preview the production build locally                       |

### Code Quality

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm lint`         | Run ESLint on all supported file types  |
| `pnpm lint:fix`     | Run ESLint and automatically fix issues |
| `pnpm format`       | Format code with Prettier               |
| `pnpm format:check` | Check if code is properly formatted     |
| `pnpm check`        | Run both linting and format checking    |
| `pnpm fix`          | Run lint:fix and format together        |

### Testing

| Command              | Description                                |
| -------------------- | ------------------------------------------ |
| `pnpm test`          | Run tests in watch mode                    |
| `pnpm test:ui`       | Run tests with Vitest UI                   |
| `pnpm test:run`      | Run tests once                             |
| `pnpm test:coverage` | Run tests with coverage report             |
| `pnpm test:watch`    | Run tests in watch mode (alias for `test`) |

### Git Hooks

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `pnpm prepare`    | Set up Husky git hooks                    |
| `pnpm pre-commit` | Run lint-staged (automatically triggered) |

## 🏗️ Technology Stack

### Core Framework

- **Astro** - Static site generator with island architecture
- **React** - Primary component library for interactive elements
- **TypeScript** - Type safety across the platform

### Multi-Framework Support

- **Vue.js** - Alternative for contributors preferring Vue
- **Svelte** - Lightweight option for performance-critical components
- **Vanilla JS** - Simple plugins requiring minimal overhead

### Styling & UI

- **Tailwind CSS** - Utility-first styling framework
- **shadcn/ui** - Pre-built accessible component library
- **Lucide React** - Consistent iconography

### Data & Build

- **Astro Collections** - Content management for game data
- **BoardGameGeek XML API** - Game metadata during build time
- **Zod** - Runtime validation and type safety

## 🎮 Currently Supported Games

- **Acquire** - Banking assistant and player value tracker

## 🛠️ Development Workflow

### Adding New Games

1. **Research** - Identify tedious calculations/tracking needs
2. **Design** - Plan plugin manifest and required tools
3. **Implement** - Create game components using preferred framework
4. **Test** - Validate with actual gameplay sessions
5. **Document** - Add setup instructions and usage guide

### Code Standards

- **ESLint + Prettier** - Automatic code formatting and linting
- **Husky** - Git hooks for pre-commit quality checks
- **Vitest** - Fast unit testing with coverage
- **TypeScript** - Strict type checking enabled

### Pre-commit Hooks

The project automatically runs the following checks before each commit:

- ESLint with auto-fix for `.js`, `.jsx`, `.ts`, `.tsx`, `.astro` files
- Prettier formatting for all supported file types
- Type checking with TypeScript

## 📁 Project Structure

```
gamekeeper/
├── src/
│   ├── components/
│   │   ├── react/              # React components
│   │   │   ├── games/          # Game-specific components
│   │   │   └── ui/             # Reusable UI components
│   │   └── astro/              # Astro components
│   ├── layouts/                # Page layouts
│   ├── pages/                  # Route pages
│   ├── lib/                    # Utilities and constants
│   └── styles/                 # Global styles
├── public/                     # Static assets
└── package.json               # Project configuration
```

## 🧪 Testing

The project uses Vitest for testing with the following setup:

- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Additional Jest DOM matchers
- **jsdom** - DOM simulation for testing
- **Coverage reporting** - Track test coverage with v8

Example test command:

```bash
# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Implement** your changes with tests
4. **Run** quality checks: `pnpm check`
5. **Submit** a pull request

### Plugin Development

GameKeeper supports multiple frameworks for plugin development:

- **React** - Full featured components with hooks
- **Vue** - Vue 3 composition API
- **Svelte** - Lightweight reactive components
- **Astro** - Static components with optional hydration

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🎲 Legal Notice

GameKeeper is an independent, open-source project providing calculation tools for board games. All
game names, artwork, and related intellectual property belong to their respective publishers.
GameKeeper does not reproduce game rules, components, or gameplay mechanics.

**We strongly encourage purchasing games from official retailers to support the board game
industry.**

---

Made with ❤️ for board game enthusiasts
