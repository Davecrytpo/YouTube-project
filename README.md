# YouTube Clone

A modern, responsive YouTube-like UI built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Responsive layout with sidebar and mobile navigation
- Category pages, subscriptions, history, liked videos, watch later
- Video grid and player views
- Authentication scaffolding with Supabase
- Toast notifications and router-driven navigation

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- ESLint (flat config) + Prettier
- Supabase JS v2

## Getting Started

1. Install dependencies:
   - npm install
2. Create a .env.local file (or .env) using the provided example:
   - cp .env.example .env.local
3. Fill in your environment variables.
4. Start development server:
   - npm run dev

## Environment Variables

Create .env.local (not committed) with:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

Note: Never commit real secrets to the repo. Rotate your Supabase anon key if it was previously committed.

## Scripts

- dev: Start Vite dev server
- build: Production build
- preview: Preview production build
- lint: Run ESLint
- typecheck: Run TypeScript type checker
- check: Lint + typecheck
- format: Format code with Prettier
- format:check: Verify formatting

## CI

This project includes a GitHub Actions workflow to install, lint, typecheck, and build on pushes and pull requests.

## License

This repository currently does not declare a license. Add one if you plan to open source.