const seeded = (index: number, seed: number) => {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const setPoint = (
  buffer: Float32Array,
  index: number,
  x: number,
  y: number,
  z = 0,
) => {
  const offset = index * 3;
  buffer[offset] = x;
  buffer[offset + 1] = y;
  buffer[offset + 2] = z;
};

function makeOrb(count: number) {
  const buffer = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const ripple = 1 + Math.sin(i * 0.19) * 0.055;
    setPoint(
      buffer,
      i,
      Math.cos(theta) * radius * 1.55 * ripple,
      y * 1.55 * ripple,
      Math.sin(theta) * radius * 1.55 * ripple,
    );
  }
  return buffer;
}

function makeBrowser(count: number) {
  const buffer = new Float32Array(count * 3);
  const width = 3.5;
  const height = 2.25;
  for (let i = 0; i < count; i += 1) {
    const u = i / count;
    const jitter = (seeded(i, 2) - 0.5) * 0.055;
    let x: number;
    let y: number;
    if (u < 0.54) {
      const p = u / 0.54;
      const perimeter = p * 2 * (width + height);
      if (perimeter < width) {
        x = -width / 2 + perimeter;
        y = height / 2;
      } else if (perimeter < width + height) {
        x = width / 2;
        y = height / 2 - (perimeter - width);
      } else if (perimeter < width * 2 + height) {
        x = width / 2 - (perimeter - width - height);
        y = -height / 2;
      } else {
        x = -width / 2;
        y = -height / 2 + (perimeter - width * 2 - height);
      }
    } else if (u < 0.63) {
      const p = (u - 0.54) / 0.09;
      x = -width / 2 + p * width;
      y = height / 2 - 0.43;
    } else {
      const row = Math.floor(((u - 0.63) / 0.37) * 5);
      const rowProgress = (((u - 0.63) / 0.37) * 5) % 1;
      const lineWidths = [1.35, 2.35, 1.75, 2.65, 1.15];
      x = -1.23 + rowProgress * lineWidths[row];
      y = 0.52 - row * 0.35;
    }
    setPoint(
      buffer,
      i,
      x + jitter,
      y + jitter * 0.35,
      (seeded(i, 5) - 0.5) * 0.18,
    );
  }
  return buffer;
}

function makePhone(count: number) {
  const buffer = new Float32Array(count * 3);
  const width = 1.75;
  const height = 3.2;
  for (let i = 0; i < count; i += 1) {
    const u = i / count;
    const jitter = (seeded(i, 8) - 0.5) * 0.045;
    let x: number;
    let y: number;
    if (u < 0.64) {
      const p = u / 0.64;
      const perimeter = p * 2 * (width + height);
      if (perimeter < width) {
        x = -width / 2 + perimeter;
        y = height / 2;
      } else if (perimeter < width + height) {
        x = width / 2;
        y = height / 2 - (perimeter - width);
      } else if (perimeter < width * 2 + height) {
        x = width / 2 - (perimeter - width - height);
        y = -height / 2;
      } else {
        x = -width / 2;
        y = -height / 2 + (perimeter - width * 2 - height);
      }
    } else if (u < 0.72) {
      const p = (u - 0.64) / 0.08;
      x = -0.35 + p * 0.7;
      y = height / 2 - 0.24;
    } else if (u < 0.79) {
      const angle = ((u - 0.72) / 0.07) * Math.PI * 2;
      x = Math.cos(angle) * 0.12;
      y = -height / 2 + 0.22 + Math.sin(angle) * 0.12;
    } else {
      const row = Math.floor(((u - 0.79) / 0.21) * 4);
      const rowProgress = (((u - 0.79) / 0.21) * 4) % 1;
      x = -0.58 + rowProgress * (row % 2 === 0 ? 1.16 : 0.82);
      y = 0.65 - row * 0.5;
    }
    setPoint(
      buffer,
      i,
      x + jitter,
      y + jitter * 0.25,
      (seeded(i, 10) - 0.5) * 0.2,
    );
  }
  return buffer;
}

function makeDatabase(count: number) {
  const buffer = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const u = i / count;
    const jitter = (seeded(i, 13) - 0.5) * 0.04;
    let x: number;
    let y: number;
    let z: number;
    if (u < 0.62) {
      const section = Math.floor((u / 0.62) * 4);
      const sectionU = ((u / 0.62) * 4) % 1;
      const angle = sectionU * Math.PI * 2;
      x = Math.cos(angle) * 1.48;
      z = Math.sin(angle) * 0.56;
      y = 1.22 - section * 0.81;
    } else {
      const side = i % 2 === 0 ? -1 : 1;
      const p = (u - 0.62) / 0.38;
      x = side * 1.48;
      y = 1.22 - p * 2.43;
      z = Math.sin(i * 0.41) * 0.08;
    }
    setPoint(buffer, i, x + jitter, y + jitter * 0.25, z);
  }
  return buffer;
}

function makeCode(count: number) {
  const buffer = new Float32Array(count * 3);
  const pointOnSegment = (
    ax: number,
    ay: number,
    bx: number,
    by: number,
    p: number,
  ) => [ax + (bx - ax) * p, ay + (by - ay) * p];

  for (let i = 0; i < count; i += 1) {
    const u = i / count;
    const jitter = (seeded(i, 18) - 0.5) * 0.055;
    let point: number[];
    if (u < 0.25) {
      point = pointOnSegment(-0.55, 1.25, -1.55, 0, u / 0.25);
    } else if (u < 0.5) {
      point = pointOnSegment(-1.55, 0, -0.55, -1.25, (u - 0.25) / 0.25);
    } else if (u < 0.7) {
      point = pointOnSegment(0.38, -1.5, -0.38, 1.5, (u - 0.5) / 0.2);
    } else if (u < 0.85) {
      point = pointOnSegment(0.55, 1.25, 1.55, 0, (u - 0.7) / 0.15);
    } else {
      point = pointOnSegment(1.55, 0, 0.55, -1.25, (u - 0.85) / 0.15);
    }
    setPoint(
      buffer,
      i,
      point[0] + jitter,
      point[1] + jitter * 0.35,
      (seeded(i, 20) - 0.5) * 0.22,
    );
  }
  return buffer;
}

export function createMorphTargets(count: number) {
  return [
    makeOrb(count),
    makeBrowser(count),
    makePhone(count),
    makeDatabase(count),
    makeCode(count),
  ];
}
