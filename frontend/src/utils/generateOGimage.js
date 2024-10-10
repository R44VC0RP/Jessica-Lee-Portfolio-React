export function generateOGImage(title) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1200;
    canvas.height = 630;

    // Set background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text style
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text
    const maxWidth = canvas.width - 100;
    const words = title.split(' ');
    let line = '';
    let y = canvas.height / 2 - 24;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += 60;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/png');
  });
}