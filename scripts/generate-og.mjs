import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0c0f"/>
  <path d="M0 82H1200M0 548H1200" stroke="#25303a"/>
  <path d="M82 0V630M1118 0V630" stroke="#25303a"/>
  <g opacity=".42" stroke="#56d6c9" fill="none">
    <path d="M82 126H252L328 202H478L548 132H736L806 202H1118"/>
    <path d="M82 504H238L302 440H490L558 508H742L814 438H1118"/>
    <circle cx="328" cy="202" r="5" fill="#56d6c9"/>
    <circle cx="806" cy="202" r="5" fill="#56d6c9"/>
    <circle cx="302" cy="440" r="5" fill="#56d6c9"/>
    <circle cx="814" cy="438" r="5" fill="#56d6c9"/>
  </g>
  <text x="82" y="102" fill="#a8b2bc" font-size="20" font-family="Arial, sans-serif" letter-spacing="5">ARCA COMPUTER / WEB3</text>
  <text x="82" y="305" fill="#f4efe5" font-size="82" font-weight="700" font-family="Arial, sans-serif">Shipped.</text>
  <text x="82" y="392" fill="#f4efe5" font-size="82" font-weight="700" font-family="Arial, sans-serif">Verifiable.</text>
  <text x="82" y="516" fill="#56d6c9" font-size="24" font-family="monospace">Base · Farcaster · Snapchain · Identity · Payments</text>
</svg>`;

const outputPath = fileURLToPath(new URL('../public/og.png', import.meta.url));
await sharp(Buffer.from(svg)).png().toFile(outputPath);
console.log('generated public/og.png');
