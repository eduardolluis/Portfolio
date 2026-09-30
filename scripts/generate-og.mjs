import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#131916"/>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#25342e" stroke-width="2"/>
  <text x="32" y="41" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="24" fill="#f4f1eb" text-anchor="middle" letter-spacing="-1">EDC</text>
  <circle cx="50" cy="18" r="3.5" fill="#c06c46"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

// Generate 32x32 and 192x192 favicon PNGs
await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, 'favicon-32x32.png'));

await sharp(Buffer.from(faviconSvg))
  .resize(192, 192)
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

// 2. Generate Open Graph 1200x630 image
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1613"/>
      <stop offset="60%" stop-color="#141d18"/>
      <stop offset="100%" stop-color="#18231d"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1c2923"/>
      <stop offset="100%" stop-color="#151f1a"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d4794e"/>
      <stop offset="100%" stop-color="#b66545"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Subtle glow -->
  <circle cx="200" cy="150" r="300" fill="#b66545" opacity="0.08" filter="blur(60px)"/>
  <circle cx="1000" cy="450" r="350" fill="#2d4a3e" opacity="0.12" filter="blur(70px)"/>

  <!-- Left Content Column -->
  <g transform="translate(90, 100)">
    <!-- Location & Availability Tag -->
    <rect x="0" y="0" width="380" height="34" rx="17" fill="#1e2c25" stroke="#2e4238" stroke-width="1"/>
    <circle cx="18" cy="17" r="4" fill="#38c172"/>
    <text x="32" y="22" font-family="'DM Mono', monospace, monospace" font-size="12" font-weight="600" fill="#a4b3aa" letter-spacing="1.2">SANTO DOMINGO · FULL-STACK</text>

    <!-- Main Title -->
    <text x="0" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="800" fill="#f6f3ed" letter-spacing="-2.5">
      Eduardo de la Cruz
    </text>

    <!-- Role / Specialty -->
    <text x="0" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="600" fill="url(#accentGrad)" letter-spacing="-0.5">
      Full-Stack Software Developer
    </text>

    <!-- Value Proposition -->
    <text x="0" y="225" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#c3ccc6" letter-spacing="-0.2">
      <tspan x="0" dy="0">Custom web applications, mobile apps and</tspan>
      <tspan x="0" dy="34">internal systems built around how your business works.</tspan>
    </text>

    <!-- Pillars / Badges -->
    <g transform="translate(0, 340)">
      <rect x="0" y="0" width="130" height="34" rx="4" fill="#1b2721" stroke="#2a3d34"/>
      <text x="14" y="21" font-family="'DM Mono', monospace" font-size="11" fill="#dfa180" font-weight="600">WEB APPS</text>

      <rect x="142" y="0" width="144" height="34" rx="4" fill="#1b2721" stroke="#2a3d34"/>
      <text x="156" y="21" font-family="'DM Mono', monospace" font-size="11" fill="#dfa180" font-weight="600">MOBILE APPS</text>

      <rect x="298" y="0" width="180" height="34" rx="4" fill="#1b2721" stroke="#2a3d34"/>
      <text x="312" y="21" font-family="'DM Mono', monospace" font-size="11" fill="#dfa180" font-weight="600">INTERNAL SYSTEMS</text>
    </g>

    <!-- Tech Stack line -->
    <text x="0" y="420" font-family="'DM Mono', monospace" font-size="13" fill="#6d7d74" letter-spacing="0.5">
      React · Next.js · TypeScript · Flutter · FastAPI · Supabase · PostgreSQL
    </text>
  </g>

  <!-- Right Visual Mockup Card -->
  <g transform="translate(730, 95)">
    <!-- Main Card Frame -->
    <rect width="380" height="440" rx="16" fill="url(#cardGrad)" stroke="#2b3b33" stroke-width="1.5"/>
    
    <!-- Top Card Bar -->
    <path d="M 0 16 Q 0 0 16 0 L 364 0 Q 380 0 380 16 L 380 44 L 0 44 Z" fill="#17221d"/>
    <line x1="0" y1="44" x2="380" y2="44" stroke="#2b3b33" stroke-width="1"/>
    
    <!-- Window dots -->
    <circle cx="24" cy="22" r="5" fill="#e06c75"/>
    <circle cx="40" cy="22" r="5" fill="#e5c07b"/>
    <circle cx="56" cy="22" r="5" fill="#98c379"/>
    <text x="82" y="26" font-family="'DM Mono', monospace" font-size="11" fill="#7d8f85">gio-workspace // client system</text>

    <!-- Inside Card Content -->
    <!-- Metric Box 1 -->
    <g transform="translate(24, 68)">
      <rect width="332" height="74" rx="8" fill="#141c18" stroke="#23322b"/>
      <text x="16" y="28" font-family="'DM Mono', monospace" font-size="10" fill="#b66545" font-weight="700">CASE STUDY · PRODUCTION</text>
      <text x="16" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#f4f1eb">GIO Workspace Platform</text>
      <text x="316" y="44" font-family="'DM Mono', monospace" font-size="12" fill="#75887d" text-anchor="end">React · Supabase</text>
    </g>

    <!-- Metric Box 2 -->
    <g transform="translate(24, 156)">
      <rect width="332" height="74" rx="8" fill="#141c18" stroke="#23322b"/>
      <text x="16" y="28" font-family="'DM Mono', monospace" font-size="10" fill="#6ba78e" font-weight="700">MOBILE STREAMING APP</text>
      <text x="16" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#f4f1eb">Melodix Architecture</text>
      <text x="316" y="44" font-family="'DM Mono', monospace" font-size="12" fill="#75887d" text-anchor="end">Flutter · FastAPI</text>
    </g>

    <!-- Metric Box 3 -->
    <g transform="translate(24, 244)">
      <rect width="332" height="74" rx="8" fill="#141c18" stroke="#23322b"/>
      <text x="16" y="28" font-family="'DM Mono', monospace" font-size="10" fill="#7da5c9" font-weight="700">REAL-TIME MESSAGING</text>
      <text x="16" y="52" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#f4f1eb">Whatzapp App Project</text>
      <text x="316" y="44" font-family="'DM Mono', monospace" font-size="12" fill="#75887d" text-anchor="end">Sockets · LiveKit</text>
    </g>

    <!-- Status footer in card -->
    <g transform="translate(24, 342)">
      <rect width="332" height="60" rx="8" fill="#1b2822" stroke="#2f463b"/>
      <circle cx="24" cy="30" r="4" fill="#38c172"/>
      <text x="40" y="34" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="600" fill="#e9e5dc">Available for contract &amp; custom software</text>
    </g>
  </g>

  <!-- Bottom Accent Line -->
  <rect x="0" y="626" width="1200" height="4" fill="url(#accentGrad)"/>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .jpeg({ quality: 92 })
  .toFile(path.join(publicDir, 'og-image.jpg'));

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 8 })
  .toFile(path.join(publicDir, 'og-image.png'));

console.log('✓ Generated favicons and og-image.jpg / og-image.png successfully');
