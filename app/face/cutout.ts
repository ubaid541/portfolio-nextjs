/**
 * Converts a studio portrait on a flat light background into a crisp
 * transparent cutout canvas via border-seeded BFS flood fill.
 * Because filling starts strictly from the outer borders, interior highlights
 * such as eye whites and teeth remain 100% opaque.
 * If the source image already carries an alpha channel, it passes straight through.
 */
export function makePortraitCutout(img: HTMLImageElement, size = 1024): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const d = imageData.data;

  // Already transparent (e.g., pre-cut WebP/PNG)? Return as-is.
  const topLeftA = d[3];
  const topRightA = d[(size - 1) * 4 + 3];
  if (topLeftA < 245 && topRightA < 245) {
    return canvas;
  }

  // Sample average studio background color from the top corners.
  const bgR = (d[0] + d[(size - 1) * 4]) * 0.5;
  const bgG = (d[1] + d[(size - 1) * 4 + 1]) * 0.5;
  const bgB = (d[2] + d[(size - 1) * 4 + 2]) * 0.5;

  const total = size * size;
  const visited = new Uint8Array(total);
  const isBg = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  const HARD_THRESH = 38;
  const SOFT_THRESH = 76;

  const colorDist = (idx: number) => {
    const o = idx * 4;
    const dr = d[o] - bgR;
    const dg = d[o + 1] - bgG;
    const db = d[o + 2] - bgB;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  const trySeed = (x: number, y: number) => {
    const idx = y * size + x;
    if (visited[idx]) return;
    if (colorDist(idx) <= HARD_THRESH) {
      visited[idx] = 1;
      isBg[idx] = 1;
      queue[tail++] = idx;
    }
  };

  // Seed along all four borders.
  for (let x = 0; x < size; x++) {
    trySeed(x, 0);
    trySeed(x, size - 1);
  }
  for (let y = 0; y < size; y++) {
    trySeed(0, y);
    trySeed(size - 1, y);
  }

  // Flood-fill contiguous background pixels.
  while (head < tail) {
    const idx = queue[head++];
    const x = idx % size;
    const y = (idx - x) / size;

    if (x > 0) {
      const n = idx - 1;
      if (!visited[n] && colorDist(n) <= HARD_THRESH) {
        visited[n] = 1;
        isBg[n] = 1;
        queue[tail++] = n;
      }
    }
    if (x < size - 1) {
      const n = idx + 1;
      if (!visited[n] && colorDist(n) <= HARD_THRESH) {
        visited[n] = 1;
        isBg[n] = 1;
        queue[tail++] = n;
      }
    }
    if (y > 0) {
      const n = idx - size;
      if (!visited[n] && colorDist(n) <= HARD_THRESH) {
        visited[n] = 1;
        isBg[n] = 1;
        queue[tail++] = n;
      }
    }
    if (y < size - 1) {
      const n = idx + size;
      if (!visited[n] && colorDist(n) <= HARD_THRESH) {
        visited[n] = 1;
        isBg[n] = 1;
        queue[tail++] = n;
      }
    }
  }

  // Clear background alpha.
  for (let i = 0; i < total; i++) {
    if (isBg[i]) d[i * 4 + 3] = 0;
  }

  // Soft edge feathering + white-fringe decontamination along the 2px boundary.
  const fringe = new Uint8Array(total);
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const idx = y * size + x;
      if (isBg[idx]) continue;
      if (isBg[idx - 1] || isBg[idx + 1] || isBg[idx - size] || isBg[idx + size]) {
        fringe[idx] = 1;
      }
    }
  }

  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const idx = y * size + x;
      if (!fringe[idx]) continue;
      const dist = colorDist(idx);
      const o = idx * 4;
      if (dist < SOFT_THRESH) {
        const t = Math.max(
          0,
          Math.min(1, (dist - HARD_THRESH * 0.65) / (SOFT_THRESH - HARD_THRESH * 0.65)),
        );
        const a = t * t * (3 - 2 * t);
        d[o + 3] = Math.round(a * 255);
        // Decontaminate light halo so edges sit cleanly over dark mode too.
        if (a > 0.08) {
          d[o] = Math.max(0, Math.min(255, Math.round((d[o] - bgR * (1 - a)) / a)));
          d[o + 1] = Math.max(0, Math.min(255, Math.round((d[o + 1] - bgG * (1 - a)) / a)));
          d[o + 2] = Math.max(0, Math.min(255, Math.round((d[o + 2] - bgB * (1 - a)) / a)));
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
