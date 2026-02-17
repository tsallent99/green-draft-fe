# Green Draft

Fantasy golf platform where users create or join leagues, pick players for tournaments, and compete against friends based on real tournament results.

## What is Green Draft?

Green Draft is a fantasy sports web application focused on golf. Users can:

- **Create leagues** with custom entry fees and invite friends via invitation codes
- **Join leagues** using an invitation code shared by a friend
- **Make picks** — select 5 players for a tournament, constrained by a category system (total category sum must be >= 13)
- **Track standings** — view league leaderboards with rankings, scores, and prize pool distribution

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript (strict mode) |
| Framework | React 19 |
| Build Tool | Create React App + CRACO |
| Routing | React Router DOM 7 |
| Server State | TanStack React Query 5 |
| Client State | Zustand 5 |
| Forms | React Hook Form 7 |
| Validation | Zod 4 |
| HTTP Client | Axios |
| Styling | Tailwind CSS 3 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Icons | Lucide React |
| Notifications | Sonner |

## Architecture

The project follows **Clean Architecture** with **Domain-Driven Design (DDD)** principles, organized into independent domain modules.

### Project Structure

```
src/
├── components/          # Shared UI components (shadcn/ui)
│   └── ui/              # Button, Card, Tabs, Badge, Dialog, Command, etc.
├── lib/                 # App-level utilities (queryClient, cn helper)
├── pages/               # Page components (one per route)
├── routes/              # Route definitions and guards (ProtectedRoute, PublicOnlyRoute)
└── libs/
    ├── modules/         # Domain modules
    │   ├── entry/
    │   ├── leaderboard/
    │   ├── league/
    │   ├── player/
    │   ├── team/
    │   ├── tournament/
    │   └── user/
    ├── presentation/    # Shared presentational components (form fields)
    └── shared/          # Cross-cutting concerns
        ├── auth/        # Auth store (Zustand)
        ├── backend/     # HTTP client setup (Axios)
        ├── data-access-config/
        ├── dependency-injection-context/
        ├── external-lib/ # Third-party library wrappers
        └── utils/       # Transformation utilities
```

### Module Structure

Each domain module under `src/libs/modules/` follows the same structure:

```
module/
├── domain/
│   ├── entities/        # Entity classes with Zod schema validation
│   ├── repositories/    # Repository interfaces (ports)
│   └── value-objects/
└── data-access/
    ├── application/
    │   ├── queries/     # React Query hooks (useGet*)
    │   └── mutations/   # React Query mutation hooks (useCreate*, useUpdate*, useDelete*)
    ├── infrastructure/
    │   ├── api.ts       # API endpoint definitions
    │   ├── api.dto.ts   # Data Transfer Objects
    │   ├── apiAdapter.ts        # Real API adapter (implements repository interface)
    │   └── FakeAdapter.ts       # Fake adapter for development/testing
    └── dependency-injection/
        ├── RepositoryContext.ts  # React Context for DI
        └── useRepositoryFactory.ts  # Hook to access the repository
```

### Key Architectural Patterns

- **Repository Pattern** — Domain modules define repository interfaces; infrastructure provides API adapters that implement them
- **Dependency Injection** — Adapters are injected via React Context at app root (`ContextProvider`), making modules swappable (real API vs fake adapter)
- **Entity Validation** — All entities validate incoming data using Zod schemas in their constructors
- **Path Aliases** — Clean imports via `@modules/*`, `@libs/shared/*`, `@presentation/*`, `@/*`

## Pages & Routes

| Route | Page | Auth |
|-------|------|------|
| `/login` | Login | Public only |
| `/register` | Register | Public only |
| `/` | Home | Protected |
| `/create-league` | Create a League | Protected |
| `/join-league` | Join a League | Protected |
| `/your-leagues` | Your Leagues list | Protected |
| `/your-leagues/:leagueId` | League Detail (Picks + Standings tabs) | Protected |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.development` with:

```
REACT_APP_API_URL=http://localhost:3001
```

### Development

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

Output goes to the `build/` folder.
