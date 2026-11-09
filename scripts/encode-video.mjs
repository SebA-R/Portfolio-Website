// Encodes the background video from the one stored source (media/) into the
// renditions the site serves, plus a poster frame. Runs before `next build`
// and `next dev`. Outputs are content-hashed and skipped when already present,
// so only the first run after the source or settings change does any work.
//
// ffmpeg: uses FFMPEG_PATH if set, else the `ffmpeg-static` package if it is
// installed, else `ffmpeg` on PATH. The AV1 encode needs libsvtav1.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(root, 'media', 'stitched6.webm');
const OUT_DIR = join(root, 'public', 'video');
const MANIFEST = join(root, 'app', 'generated', 'video-manifest.json');
const NAME = 'stitched6';

// Phones get 720p; everything wider gets 1080p. Each size is offered as AV1
// first and H.264 as the fallback for browsers without AV1 decoding.
const RENDITIONS = [
  { id: 'av1-720', height: 720, codec: 'av1', media: '(max-width: 768px)' },
  { id: 'h264-720', height: 720, codec: 'h264', media: '(max-width: 768px)' },
  { id: 'av1-1080', height: 1080, codec: 'av1', media: null },
  { id: 'h264-1080', height: 1080, codec: 'h264', media: null },
];

const ENCODER_ARGS = {
  av1: ['-c:v', 'libsvtav1', '-crf', '38', '-preset', '6', '-g', '50'],
  h264: ['-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-profile:v', 'high'],
};

function findFfmpeg() {
  if (process.env.FFMPEG_PATH) {
    return process.env.FFMPEG_PATH;
  }
  try {
    const require = createRequire(import.meta.url);
    const bundled = require('ffmpeg-static');
    if (bundled && existsSync(bundled)) {
      return bundled;
    }
  } catch {
    // ffmpeg-static is optional.
  }
  return 'ffmpeg';
}

const ffmpeg = findFfmpeg();

function run(bin, args) {
  return execFileSync(bin, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function checkEncoders() {
  let encoders;
  try {
    encoders = run(ffmpeg, ['-hide_banner', '-encoders']);
  } catch {
    throw new Error(`encode-video: could not run ffmpeg (${ffmpeg}). Install ffmpeg or set FFMPEG_PATH.`);
  }
  for (const lib of ['libsvtav1', 'libx264', 'libwebp']) {
    if (!encoders.includes(lib)) {
      throw new Error(`encode-video: ${ffmpeg} has no ${lib} encoder.`);
    }
  }
}

// Reads the codec level ffmpeg wrote so the <source type> codecs string is exact.
// ffprobe ships beside ffmpeg; fall back to the one on PATH.
function probeLevel(file) {
  const sibling = join(dirname(ffmpeg), 'ffprobe');
  let ffprobe = 'ffprobe';
  if (existsSync(sibling)) {
    ffprobe = sibling;
  }
  const out = run(ffprobe, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=level', '-of', 'csv=p=0', file]);
  return Number.parseInt(out.trim(), 10);
}

function codecsString(codec, level) {
  if (codec === 'av1') {
    // Main profile, 8-bit: av01.<profile>.<level><tier>.<bitdepth>
    return `av01.0.${String(level).padStart(2, '0')}M.08`;
  }
  // High profile (0x64), no constraint flags, level as hex.
  return `avc1.6400${level.toString(16).padStart(2, '0').toUpperCase()}`;
}

function encodeRendition(rendition, outFile) {
  const args = [
    '-y', '-v', 'error', '-i', SOURCE, '-an',
    // Never upscale: a 1056px source stays 1056px in the "1080p" rendition.
    '-vf', `scale=-2:'min(${rendition.height},ih)'`,
    ...ENCODER_ARGS[rendition.codec],
    '-pix_fmt', 'yuv420p',
    // Index at the front so playback starts before the download finishes.
    '-movflags', '+faststart',
    outFile,
  ];
  run(ffmpeg, args);
}

function encodePoster(outFile) {
  run(ffmpeg, ['-y', '-v', 'error', '-i', SOURCE, '-frames:v', '1', '-vf', 'scale=1280:-2', '-c:v', 'libwebp', '-quality', '60', outFile]);
}

function main() {
  if (!existsSync(SOURCE)) {
    throw new Error(`encode-video: source not found at ${SOURCE}`);
  }
  // The hash covers the source bytes and this script's own text (which holds
  // every encode setting), so changing either produces new file names and
  // busts the immutable cache.
  const hash = createHash('sha256')
    .update(readFileSync(SOURCE))
    .update(readFileSync(fileURLToPath(import.meta.url)))
    .digest('hex')
    .slice(0, 10);

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(dirname(MANIFEST), { recursive: true });

  const posterFile = `${NAME}.${hash}.poster.webp`;
  const wanted = new Set([posterFile]);
  for (const r of RENDITIONS) {
    wanted.add(`${NAME}.${hash}.${r.id}.mp4`);
  }

  const missing = [...wanted].filter((f) => !existsSync(join(OUT_DIR, f)));
  if (missing.length > 0) {
    checkEncoders();
  }

  const sources = [];
  for (const r of RENDITIONS) {
    const file = `${NAME}.${hash}.${r.id}.mp4`;
    const path = join(OUT_DIR, file);
    if (!existsSync(path)) {
      const started = Date.now();
      encodeRendition(r, path);
      console.log(`encode-video: ${file} (${((Date.now() - started) / 1000).toFixed(1)} s)`);
    }
    const codecs = codecsString(r.codec, probeLevel(path));
    sources.push({ src: `/video/${file}`, type: `video/mp4; codecs="${codecs}"`, media: r.media });
  }

  const posterPath = join(OUT_DIR, posterFile);
  if (!existsSync(posterPath)) {
    encodePoster(posterPath);
    console.log(`encode-video: ${posterFile}`);
  }

  // Remove outputs from older hashes so public/video only holds what ships.
  for (const f of readdirSync(OUT_DIR)) {
    if (!wanted.has(f)) {
      rmSync(join(OUT_DIR, f));
    }
  }

  const manifest = { poster: `/video/${posterFile}`, sources };
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  if (missing.length === 0) {
    console.log('encode-video: up to date');
  }
}

main();
