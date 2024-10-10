export function generateOGImage(title) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">
          ${title}
        </text>
      </svg>
    `;
  
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }