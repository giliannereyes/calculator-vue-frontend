# Vue Calculator

A web-based calculator application built with Vue 3. This frontend application connects to a backend API to perform calculations and store history.

## Backend

The backend for this project is available at: [calculator-vue-backend](https://github.com/giliannereyes/calculator-vue-backend)

## Tech Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **TypeScript**: For type-safe development
- **State Management**: Vue Pinia
- **Routing**: Vue Router
- **Testing**: Vitest (unit tests) and Cypress (end-to-end tests)
- **CSS Framework**: Custom CSS with base styles

## How to Run

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm package manager

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd vue-calculator
```

2. Install dependencies:
```sh
npm install
# or
pnpm install
```

### Development Server

Run the development server:
```sh
npm run dev
# or
pnpm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Production Build

Create an optimized production build:
```sh
npm run build
# or
pnpm run build
```

### Running Tests

#### Unit Tests
```sh
npm run test:unit
# or
pnpm run test:unit
```

#### End-to-End Tests
```sh
npm run test:e2e:dev
# or
pnpm run test:e2e:dev
```

For production E2E tests:
```sh
npm run build
npm run test:e2e
```

### Linting

```sh
npm run lint
# or
pnpm run lint
```

## Features

- Basic arithmetic calculations (add, subtract, multiply, divide)
- Calculation history tracking
- User authentication (sign in)
- Contact form
- Responsive calculator interface

## Project Structure

```
src/
├── components/       # Vue components
├── stores/          # Pinia state management
├── views/           # Page views
├── router/          # Vue Router configuration
├── services/        # API services
├── assets/          # Static assets
└── main.ts          # Application entry point