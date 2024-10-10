export async function generateOGImage(title, imageUrl) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
  
      canvas.width = 1200;
      canvas.height = 630;
  
      img.onload = () => {
        if (ctx) {
          // Draw background image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          // Draw semi-transparent black overlay
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          // Draw text
          ctx.fillStyle = 'white';
          ctx.font = 'bold 48px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
  
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
  
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        }
      };
  
      img.src = imageUrl;
    });
  }