# Testwiz Anatomy

The interactive 3D anatomy explorer from Testwiz, built with React, Three.js, and shadcn/ui. Switch between male and female reference bodies, reveal anatomical systems, search named concepts, and inspect individual structures in 3D.

**[Open Testwiz Anatomy](https://anatomy.testwiz.ng)**

## Explore

- Orbit, zoom, and select structures directly on the body.
- Toggle individual systems or use skeleton and organ presets.
- Move from assembled anatomy to a spaced inventory of every visible piece.
- Search anatomical names and source identifiers.
- Isolate a selected structure and read its details.
- Jump to head and neck, thorax, abdomen, pelvis, upper-limb, or lower-limb regions without losing your current explode state.
- Follow short clinical pathways for blood flow, air, digestion, urinary flow, pelvic anatomy, and cranial nerves.
- Use clinical aliases such as windpipe, breast, voice box, and uterine tube when searching.
- Center a selected structure, review nursing-focused location and assessment notes, and try active-recall Identify Mode when launched inside Testwiz Pro.
- Start an anatomy entity Q&A session that identifies a highlighted structure, checks anatomy and clinical understanding, explains each answer, and feeds missed entities into local review.
- Identify Mode is a Testwiz Pro study tool; the public atlas keeps it visibly locked and links learners to the Medical hub, while the approved Pro embed handshake unlocks it for subscribers.
- Share region/pathway deep links with a class or study group. Hidden tabs pause the renderer, Save-Data devices choose the optimized mode automatically, and decoded model chunks are cached locally for repeat visits.
- Use compact controls and detail panels on mobile.

## Run locally

Requires Node.js 22.13 or newer. No API keys or accounts are needed.

```sh
npm ci
npm run dev
```

Open http://localhost:3016. To build the static site, run `npm run build`; the output is in `dist/`.

## Validate

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

Validation covers mesh buffers, names and concept membership, nonoverlapping exploded layouts at desktop and mobile aspect ratios, search and inspection contracts, and tap-versus-drag handling. Browser interaction checks have exercised selection, system controls, search, isolation, rotation, and 390×844, 320×568, and 844×390 layouts. Phone controls stay clear of the exploded inventory, and isolated structures fit the space above or beside the detail panel. Physical-device performance and real multitouch hardware have not been tested.

## Anatomy data

The male edition uses **BodyParts3D 4.0** and the female edition uses the **HuBMAP Human Reference Atlas female reference**. Both datasets are licensed **CC BY 4.0**. Neither reference represents every human structure or variation. Individual source meshes are distinct from named concepts, which may group multiple meshes. Descriptions distinguish general system context from individual organ explanations.

Geometry is simplified for browser performance while retaining the packaged source meshes. Full credits, source links, dataset-specific scope notes, and adaptation details are in [ATTRIBUTION.md](public/ATTRIBUTION.md).

Testwiz Anatomy is an educational explorer, not a diagnostic or surgical tool.

## How it works

Geometry is merged into batches. Per-structure GPU textures control translation, visibility, and selection, while component geometry supports accurate picking. Exploded layouts pack only the visible pieces. Rendering updates when the scene changes; orbit controls remain responsive without thousands of separate draw calls.

The optional WebMCP tools expose anatomy search and inspection in compatible browsers. The visible interface works without them.

## Rebuilding geometry

The repository includes browser-ready geometry. Rebuilding it is optional. For the male edition, obtain the official BodyParts3D OBJ archive and English metadata tables, prepare the joined concepts and display-system mappings, run `scripts/convert-anatomy.py`, then `node scripts/optimize-anatomy.mjs atlas.json` and `node scripts/compress-models.mjs`. For the female edition, download the official HRA united-female v1.10 GLB and its v1.5 GLB supplement, then run `node scripts/convert-anatomy-glb.mjs v1.10.glb --supplement v1.5.glb`, `node scripts/optimize-anatomy.mjs atlas-female.json`, and `node scripts/compress-models.mjs`. The female converter preserves source identifiers, transforms, hierarchy, and only the eight carried-over pelvic structures. The viewer shows the female whole-body surface as a translucent orientation shell by default; pregnancy reference structures remain opt-in. Simplification uses a 0.2% relative error limit per structure; no anatomy is fetched at runtime.

## Deploy

Import this repository into Vercel as a Vite project. The included `vercel.json` configures `npm ci`, `npm run build`, and the `dist` output directory. It can also be served by a static host.

Production uses `anatomy.testwiz.ng`. Vercel deployment URLs are internal release targets; link to the custom domain for users. The viewer sends versioned `progress`, `ready`, and `error` messages to approved `testwiz.ng` parent pages and accepts their light/dark theme preference without reloading model data.

## License

Original application code is released under the [MIT License](LICENSE). **The anatomy data has its own CC BY 4.0 license**; preserve the attribution when redistributing it. Third-party dependencies retain their respective licenses.

Issues and pull requests are welcome. Please include reproduction steps and browser/device details for interaction problems.
