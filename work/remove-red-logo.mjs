import sharp from 'sharp';

const input = 'public/zakaas-logo.jpg';
const output = 'public/zakaas-logo.png';
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  // The red paper field is high-red / low-green; gold lettering and black shadow stay opaque.
  const redField = r > 72 && g < r * 0.47 && b < r * 0.52;
  if (redField) data[i + 3] = 0;
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(output);
