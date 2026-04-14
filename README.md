# Sebastian Arellano-Rubach — Portfolio

3D interactive portfolio. Live at [sebastian.wiki](https://sebastian.wiki).

**Stack:** Next.js 16 (static export) · React Three Fiber · GSAP · Tailwind · Cloudflare Pages

## Dev

```bash
npm install && npm run dev
```

## Deploy

```bash
npm run build && wrangler pages deploy out --project-name sebastian-wiki
```

## Adding 3D models

```bash
npx @gltf-transform/cli draco model.glb model.glb   # use draco, not optimize
npx gltfjsx@6.5.3 model.glb --types --keepmaterials
```

## Env vars

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics key |
