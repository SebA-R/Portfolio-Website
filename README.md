# Sebastian Arellano-Rubach — Portfolio

3D interactive portfolio built with Next.js and React Three Fiber. Live at [sebastian.wiki](https://sebastian.wiki).

## Stack

- **Next.js 16** (static export)
- **React Three Fiber** + **@react-three/drei** — 3D scene
- **GSAP** — animations
- **Tailwind CSS** — UI styling
- **Cloudflare Pages** — hosting

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
npm run build
```

Outputs a static site to `out/`.

## Deployment (Cloudflare Pages)

### First-time setup

**1. Install and authenticate wrangler**

```bash
npm install -g wrangler
wrangler login
```

A browser window will open to authenticate with your Cloudflare account.

**2. Create the Pages project**

```bash
wrangler pages project create sebastian-wiki --production-branch main
```

**3. Deploy**

```bash
npm run build
wrangler pages deploy out --project-name sebastian-wiki --branch main
```

**4. Add custom domain DNS record**

In the [Cloudflare dashboard](https://dash.cloudflare.com):
- Go to **sebastian.wiki** → **DNS** → **Records**
- Add a CNAME record:
  - **Type:** CNAME
  - **Name:** `@`
  - **Target:** `sebastian-wiki.pages.dev`
  - **Proxy status:** Proxied (orange cloud ON)

Cloudflare will automatically issue an SSL certificate. The domain goes live within 1–2 minutes.

### Subsequent deploys

```bash
npm run build && wrangler pages deploy out --project-name sebastian-wiki --branch main
```

## Environment Variables

| Variable | Description |
|---|---|
| `GA_MEASUREMENT_ID` | Google Analytics measurement ID (production only) |

Set in Cloudflare Pages under **Settings → Environment variables** for production builds.

## Assets

3D models and videos live in `public/`. When adding new GLB models:

1. Compress with Draco: `npx @gltf-transform/cli draco model.glb model.glb`
2. Regenerate the component: `npx gltfjsx@6.5.3 model.glb --types --keepmaterials`
3. Place in `public/models/`

> Use `draco` (geometry-only compression), not `optimize` — the optimize command also flattens the scene graph and renames nodes, which breaks the generated component.
