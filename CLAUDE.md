# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a **React Router v7** home management application with:

- React 19 with TypeScript
- Server-side rendering enabled by default (`react-router.config.ts`)
- Vite for bundling
- Vanilla Extract for CSS-in-JS (configured but minimal usage)
- Docker deployment ready

## Common Commands

```bash
# Development
npm run dev              # Start development server at http://localhost:5173

# Quality Assurance
npm run typecheck        # Run React Router typegen + TypeScript check
npm run build           # Production build (required before deployment)

# Production
npm run start           # Start production server
```

## Architecture Patterns

### Routing Structure

The app follows a **two-layer routing architecture**:

1. **Route layer** (`app/routes/`): Handles metadata and page wrapping
   - Defines SEO metadata via `meta()` function
   - Standardized title format: `{pageTitle}${title}` from `~/utils/const`
   - Imports and renders corresponding page components

2. **Implementation layer** (`app/pages/`): Contains actual page logic and UI
   - Business logic and component implementation
   - Data fetching and state management

Route definitions in `app/routes.ts`:

```typescript
export default [
  index("routes/home.tsx"), // /
  route("/login", "routes/login.tsx"), // /login
  route("/stock", "routes/stock.tsx"), // /stock
] satisfies RouteConfig;
```

### Component Organization

- `app/components/` for shared components (currently empty)
- `app/utils/const.ts` for application constants
- Static assets in `public/` (including `public/mocks/` for development data)

### Data Fetching Pattern

Currently uses client-side fetching with static JSON files from `public/mocks/`:

- Mock data structure follows `{status: number, data: Array}` pattern
- URL decoding used for encoded Amazon product links

## Development Workflow

### Type Safety

- React Router v7 auto-generates types in `.react-router/types/`
- Path aliases: `~/*` maps to `./app/*`
- Strict TypeScript configuration

### Static Assets

- Place static files in `public/` directory
- Mock data stored in `public/mocks/` for development
- Favicon and other assets served automatically

### Deployment

Application supports both Docker and traditional Node.js deployment:

- Docker: Multi-stage build with Node.js 20 Alpine
- Traditional: Deploy `build/` output with `npm run start`

### 注意事項

- 開発ルールは .claude/develop.md を参照してください
