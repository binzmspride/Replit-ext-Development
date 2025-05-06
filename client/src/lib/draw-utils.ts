export function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  // Heart drawing algorithm
  const topCurveHeight = height * 0.3;
  
  ctx.save();
  ctx.beginPath();
  
  // Start at the bottom point
  ctx.moveTo(x, y + height * 0.7);
  
  // Draw the left curve
  ctx.bezierCurveTo(
    x - width / 2, y + height / 8,
    x - width / 2, y - height / 2,
    x, y - topCurveHeight
  );
  
  // Draw the right curve
  ctx.bezierCurveTo(
    x + width / 2, y - height / 2,
    x + width / 2, y + height / 8,
    x, y + height * 0.7
  );
  
  ctx.closePath();
  
  // Fill with color
  ctx.fillStyle = color;
  ctx.fill();
  
  // Add a subtle stroke
  ctx.strokeStyle = adjustColor(color, -20);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.restore();
}

// Helper to darken/lighten colors
export function adjustColor(color: string, amount: number): string {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;
  r = Math.min(255, Math.max(0, r));

  let g = ((num >> 8) & 0x00ff) + amount;
  g = Math.min(255, Math.max(0, g));

  let b = (num & 0x0000ff) + amount;
  b = Math.min(255, Math.max(0, b));

  return (usePound ? "#" : "") + (g | (r << 8) | (b << 16)).toString(16).padStart(6, '0');
}
