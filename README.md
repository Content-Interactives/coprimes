# Coprimes

React + Vite tool: accepts two integers, computes \(\gcd\) and reports whether they are relatively prime (coprime). Core logic in `Coprimes.jsx`.

**Live site:** [https://content-interactives.github.io/coprimes](https://content-interactives.github.io/coprimes)

Curriculum alignment and placement: [Standards.md](Standards.md).

---

## Stack

| Layer | Notes |
|--------|--------|
| Build | Vite 6, `@vitejs/plugin-react` |
| UI | React 19 |
| Styling | Tailwind 3 |
| Icons | lucide-react |
| Deploy | `gh-pages -d dist`; `predeploy` runs `vite build` |

---

## Layout

```
vite.config.js          # base: '/coprimes/'
src/
  main.jsx → App.jsx → components/Coprimes.jsx
  components/ui/
```

---

## `vite.config.js`

`base: '/coprimes/'` must match the GitHub Pages repository path.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run deploy` | Build and push `dist/` to `gh-pages` |

---

## Embedding

Minimal form UI; height dominated by `Coprimes.jsx` result/explanation block.
