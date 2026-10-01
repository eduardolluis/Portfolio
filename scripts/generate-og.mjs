import sharp from "sharp";

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#10221b"/>
  <circle cx="102" cy="100" r="31" fill="#f5f3ee"/>
  <text x="102" y="111" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="800" fill="#174a3a">E</text>
  <text x="154" y="109" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" fill="#f5f3ee">Eduardo De La Cruz</text>
  <text x="72" y="245" font-family="Arial, Helvetica, sans-serif" font-weight="750" font-size="66" fill="#f5f3ee">Custom software</text>
  <text x="72" y="322" font-family="Arial, Helvetica, sans-serif" font-weight="750" font-size="66" fill="#a9c9b5">for businesses.</text>
  <text x="72" y="389" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#bdc9c2">Web apps · Mobile apps · Internal systems</text>
  <line x1="72" y1="468" x2="1128" y2="468" stroke="#385047"/>
  <text x="72" y="522" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" fill="#f5f3ee">GIO Workspace</text>
  <text x="298" y="522" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" fill="#f5f3ee">Melodix</text>
  <text x="432" y="522" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" fill="#f5f3ee">Whatzapp</text>
  <text x="72" y="576" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#91a298">Full-Stack Software Developer · Santo Domingo, DR</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile("public/og-image.jpg");
await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log("Generated public/og-image.jpg and public/og-image.png");
