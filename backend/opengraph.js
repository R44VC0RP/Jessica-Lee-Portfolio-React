const sharp = require('sharp');
const path = require('path');

// Image metadata
const size = {
  width: 1200,
  height: 630,
};

// Image generation
async function GenerateImage(params) {
  const { title, description, imagePath, fillType = 'cover' } = params;
  if (!['cover', 'contain', 'fill'].includes(fillType)) {
    throw new Error('Invalid fillType. Must be "cover", "contain", or "fill".');
  }

  // Load fonts
  const interSemiBoldPath = path.join(__dirname, 'fonts', 'Inter-SemiBold.ttf');
  const interLightPath = path.join(__dirname, 'fonts', 'Inter-Light.ttf');

  const logoPath = "https://itsmejessicalee.com/jhlogo.png"

  // Create a black overlay
  const overlay = await sharp({
    create: {
      width: size.width,
      height: size.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0.5 }
    }
  }).png().toBuffer();

  // Create the text overlay
  const svgText = `
    <svg width="${size.width}" height="${size.height}">
      <style>
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          src: url('${interSemiBoldPath}') format('truetype');
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 300;
          src: url('${interLightPath}') format('truetype');
        }
      </style>
      <text x="50%" y="20%" text-anchor="middle" font-family="Inter" font-weight="800" font-size="80" fill="white">${title}</text>
      <text x="50%" y="30%" text-anchor="middle" font-family="Inter" font-weight="400" font-size="42" fill="white">
        ${description.map((line, index) => (
          `<tspan x="50%" dy="${index === 0 ? '0' : '1.2em'}">${line}</tspan>`
        )).join('')}
      </text>
      <text x="50" y="${size.height - 50}" font-family="Inter" font-weight="400" font-size="40" fill="white">itsmejessicalee.com</text>
    </svg>
  `;

  // Fetch the main image from the URL
  const response = await fetch(imagePath);
  const imageBuffer = await response.arrayBuffer();

  const logoResponse = await fetch(logoPath);
  const logoBufferPath = await logoResponse.arrayBuffer();

  // Load the logo image
  const logoBuffer = await sharp(logoBufferPath)
    .resize(100, 100, { fit: 'inside' }) // Adjust size as needed
    .toBuffer();

  // Generate the final image
  const finalImage = await sharp(imageBuffer)
    .resize(size.width, size.height, { fit: fillType })
    .composite([
      { input: overlay, blend: 'over' },
      { input: Buffer.from(svgText), blend: 'over' },
      { 
        input: logoBuffer, 
        top: size.height - 120, // Adjust position as needed
        left: size.width - 120, // Adjust position as needed
      }
    ])
    .png()
    .toBuffer();

  return finalImage;
}

module.exports = { GenerateImage, size };