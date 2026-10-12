
import sharp from "sharp";

const images = [
    {
    input: "public/hero-home.png",
    output: "public/hero-home-optimized.webp",
    width: 900,
  },
];

for (const img of images) {
  await sharp(img.input)
    .resize({ width: img.width, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(img.output);

  console.log(`Optimized: ${img.output}`);
}
