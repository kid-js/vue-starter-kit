# Vue.js Starter-kit

**Tech stack**: Vue 3 + TypeScript + Vite + Pinia + Vue-router + Nuxt UI + Ky + Valibot  
**Code quality**: ESLint + Stylelint + Commitlint + Husky  
  
The Starter Kit provides everything needed to quickly bootstrap small and medium-sized single-page applications (SPAs). It comes with a built-in API layer, user authentication, modal and notification systems, and form validation out of the box.  

## Requirements

- [Node.js](https://nodejs.org/) v24+
- [pnpm](https://pnpm.io/)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/kid-js/vue-starter-kit.git
cd vue-starter-kit

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Lint, typecheck, then build |
| `pnpm build:force` | Build without checks |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Lint JS/TS files |
| `pnpm lint:fix` | Lint and auto-fix |
| `pnpm lintcss` | Lint CSS/SCSS/Vue styles |
| `pnpm lintcss:fix` | Lint and auto-fix styles |
| `pnpm typecheck` | TypeScript type check |
| `pnpm check` | Run lint + lintcss + typecheck |
