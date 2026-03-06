## nestjs-hexagonal-architecture

This repository is a small playground for **hexagonal (ports & adapters) architecture** built with **NestJS 11 + TypeScript**.

The goal is to keep:

- **Domain layer** – pure business logic (entities, value objects, domain services).
- **Application layer** – use cases that orchestrate domain logic and talk to the outside world via **ports** (interfaces).
- **Infrastructure / adapters** – NestJS modules, controllers, and repository implementations that plug into those ports.

Currently the main example is a simple **User** context (`create`, `get`, `delete` user, etc.).

---

### Tech stack

- **Runtime**: Node.js, TypeScript  
- **Framework**: NestJS 11  
- **Testing**: Jest  
- **Linting/formatting**: ESLint, Prettier  
- **Package manager**: `pnpm` (you can also use `npm` or `yarn` if you prefer)

---

### Project structure (high level)

- `src/app.module.ts` – Root Nest module.
- `src/user` – User bounded context following hexagonal architecture:
  - `domain/` – entities, value objects (e.g. `email.vo.ts`) and domain rules.
  - `application/` – use cases and ports (e.g. `create-user.use-case.ts`, `user.repository.port.ts`).
  - `presentation/` – Nest controllers (`users.controller.ts`).
  - `infrastructure/` (if/when added) – concrete adapters such as database repositories.

The idea is that **domain** and **application** do not depend on NestJS or the database – only on ports/interfaces. Nest-specific code lives in the outer layers.

---

### Getting started

Install dependencies:

```bash
pnpm install
```

Run the app:

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production
pnpm run build
pnpm run start:prod
```

Run tests:

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# coverage
pnpm run test:cov
```

Run lint + format:

```bash
pnpm run lint
pnpm run format
```

---

### Hexagonal architecture notes

- **Domain**: pure TS, no NestJS imports, no database logic.
- **Application/use cases**: orchestrate domain objects and expose clear methods used by controllers or other adapters.
- **Ports**: TypeScript interfaces that describe what the application needs from the outside (e.g. `UserRepositoryPort`).
- **Adapters**: concrete classes (e.g. database repositories, HTTP controllers) that implement those ports and are wired in Nest modules.

You can extend this layout with new bounded contexts (e.g. `school`, `attendance`, `fees`) while keeping the same layering approach.

