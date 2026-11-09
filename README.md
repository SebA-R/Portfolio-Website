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

## Background video

The one stored source is `media/stitched6.webm`. `npm run dev` and `npm run build` first run `scripts/encode-video.mjs`, which writes AV1 and H.264 renditions (720p for phones, 1080p otherwise) and a poster into the gitignored `public/video/`, with content-hashed names. It needs ffmpeg with libsvtav1, libx264 and libwebp (`FFMPEG_PATH` overrides). It only re-encodes when the source or the script changes.

## Adding 3D models

```bash
npx @gltf-transform/cli draco model.glb model.glb   # use draco, not optimize
npx gltfjsx@6.5.3 model.glb --types --keepmaterials
```

## Env vars

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics key |
