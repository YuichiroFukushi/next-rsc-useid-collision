# `useId()` in Server Components collides across client-side navigations

Minimal reproduction for a Next.js App Router bug. `useId()` called in a
**Server Component** returns ids from a counter that restarts at 1 for every
RSC request (`_S_1_`, `_S_2_`, …). A client-side navigation renders only the
changed segment, so the new segment's first `useId()` returns `_S_1_` again,
the same id a Server Component in the persisted root layout already put in the
DOM. Anything resolved document-wide by id (`fill="url(#…)"`, `mask`,
`clip-path`, `aria-labelledby`, `htmlFor`) then points at the wrong element.

## Reproduce

```sh
npm install
npm run dev
```

1. Open <http://localhost:3000/other> (a hard load).
2. Click **Back to /** (a `next/link` client-side navigation).
3. The home page's "dots" texture is drawn with the root layout's **lines**
   pattern, and both captions print the same id, `_S_1_`.
4. Reload the page: the dots come back and the ids differ (`_S_1_`, `_S_2_`).

The same happens with `npm run build && npm start`. The layout sets
`export const dynamic = "force-dynamic"` so the routes render per request, as
any route that reads `cookies()` or `headers()` does. A fully static route does
not reproduce it: a prerender renders the whole tree in one pass, so the page's
ids never restart.

Reproduced on `next@16.3.4` and `next@16.4.0-canary.20` (this repo pins the
canary).

## Files

- `app/texture.tsx`: the Server Component that calls `useId()` for an SVG
  `<pattern id>` and prints the id it received.
- `app/layout.tsx`: renders it once in the persistent root layout ("lines").
- `app/page.tsx`: renders it once in the home segment ("dots").
- `app/other/page.tsx`: the page to hard-load first, with the link back.
