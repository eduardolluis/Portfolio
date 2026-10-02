import { createMorphTargets } from "./morphTargets";

type ThreeWindow = Window & { THREE?: any };

export function setupBackgroundScene(
  canvas: HTMLCanvasElement,
  getActiveId: () => string,
) {
  const THREE = (window as ThreeWindow).THREE;
  if (!THREE) return undefined;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compact = window.innerWidth < 700;
  const network = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (network?.saveData || (compact && deviceMemory !== undefined && deviceMemory <= 2)) return;

  let renderer: any;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.3 : 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);

  const colors = { violet: 0x7c5cff, cyan: 0x22d3ee, pink: 0xff5caa };
  const colorSet = [new THREE.Color(colors.violet), new THREE.Color(colors.cyan), new THREE.Color(colors.pink)];

  // ---------------------------------------------------------------------
  // Morphing developer object
  // ---------------------------------------------------------------------
  const morphCount = compact ? 520 : 1120;
  const morphPositions = new Float32Array(morphCount * 3);
  const morphColors = new Float32Array(morphCount * 3);

  const morphTargets = createMorphTargets(morphCount);
  morphPositions.set(morphTargets[0]);
  for (let i = 0; i < morphCount; i += 1) {
    const c = colorSet[i % colorSet.length];
    morphColors[i * 3] = c.r;
    morphColors[i * 3 + 1] = c.g;
    morphColors[i * 3 + 2] = c.b;
  }

  const morphGeometry = new THREE.BufferGeometry();
  const morphPositionAttribute = new THREE.BufferAttribute(morphPositions, 3);
  morphPositionAttribute.setUsage(THREE.DynamicDrawUsage);
  morphGeometry.setAttribute("position", morphPositionAttribute);
  morphGeometry.setAttribute("color", new THREE.BufferAttribute(morphColors, 3));

  const morphMaterial = new THREE.PointsMaterial({
    size: compact ? 0.052 : 0.046,
    vertexColors: true,
    transparent: true,
    opacity: 0.94,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const morphCloud = new THREE.Points(morphGeometry, morphMaterial);
  group.add(morphCloud);

  // A subtle halo stays consistent while the object morphs.
  const haloGroup = new THREE.Group();
  const halo1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.45, 0.012, 8, compact ? 88 : 150),
    new THREE.MeshBasicMaterial({ color: colors.violet, transparent: true, opacity: 0.62 }),
  );
  halo1.rotation.x = Math.PI / 2.35;
  halo1.rotation.z = 0.35;
  const halo2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.05, 0.01, 8, compact ? 72 : 120),
    new THREE.MeshBasicMaterial({ color: colors.cyan, transparent: true, opacity: 0.46 }),
  );
  halo2.rotation.x = Math.PI / 2.75;
  halo2.rotation.y = 0.8;
  const halo3 = new THREE.Mesh(
    new THREE.TorusGeometry(2.75, 0.008, 8, compact ? 80 : 132),
    new THREE.MeshBasicMaterial({ color: colors.pink, transparent: true, opacity: 0.42 }),
  );
  halo3.rotation.y = Math.PI / 2.4;
  halo3.rotation.z = -0.45;
  haloGroup.add(halo1, halo2, halo3);
  group.add(haloGroup);

  // Tiny satellites make the hero feel alive without competing with the copy.
  const satelliteGeometry = new THREE.SphereGeometry(compact ? 0.032 : 0.04, 8, 8);
  const satelliteMaterials = [
    new THREE.MeshBasicMaterial({ color: colors.cyan, transparent: true, opacity: 0.95 }),
    new THREE.MeshBasicMaterial({ color: colors.pink, transparent: true, opacity: 0.9 }),
    new THREE.MeshBasicMaterial({ color: colors.violet, transparent: true, opacity: 0.9 }),
  ];
  const satellites = satelliteMaterials.map((material: any) => new THREE.Mesh(satelliteGeometry, material));
  satellites.forEach((satellite: any) => group.add(satellite));

  scene.add(new THREE.AmbientLight(0x6655ff, 0.55));
  const light1 = new THREE.PointLight(colors.cyan, 1.7, 30);
  light1.position.set(5, 3, 6);
  scene.add(light1);
  const light2 = new THREE.PointLight(colors.pink, 1.7, 30);
  light2.position.set(-5, -2, 5);
  scene.add(light2);

  // Background star field from the previous version, intentionally lighter.
  const count = compact ? 340 : 920;
  const positions = new Float32Array(count * 3);
  const particleColors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = 5 + Math.random() * 16;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
    positions[i * 3 + 2] = r * Math.cos(phi) - 4;
    const c = colorSet[i % colorSet.length];
    particleColors[i * 3] = c.r;
    particleColors[i * 3 + 1] = c.g;
    particleColors[i * 3 + 2] = c.b;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(particles);

  const fadeMaterials: Array<{ material: any; base: number }> = [];
  group.traverse((object: any) => {
    if (object.material) fadeMaterials.push({ material: object.material, base: object.material.opacity ?? 1 });
  });

  let vw = 1;
  let vh = 1;
  let mobile = false;
  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    vh = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    vw = vh * camera.aspect;
    mobile = camera.aspect < 0.95;
  };
  resize();
  window.addEventListener("resize", resize);

  const targetFor = (id: string) => {
    if (mobile) {
      if (id === "home") return { x: 0, y: vh * 0.31, scale: 0.53, opacity: 0.78 };
      return { x: 0, y: 0, scale: 0.42, opacity: 0.08 };
    }
    switch (id) {
      case "home": return { x: vw * 0.245, y: 0, scale: 1, opacity: 1 };
      case "stack": return { x: vw * 0.3, y: 0, scale: 0.72, opacity: 0.18 };
      case "projects": return { x: 0, y: 0, scale: 0.95, opacity: 0.1 };
      case "about": return { x: -vw * 0.28, y: 0, scale: 0.8, opacity: 0.22 };
      default: return { x: 0, y: 0, scale: 1.3, opacity: 0.15 };
    }
  };

  const mouse = { nx: 0, ny: 0 };
  const onMouseMove = (event: MouseEvent) => {
    mouse.nx = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.ny = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("mousemove", onMouseMove, { passive: true });

  const current = { x: 0, y: 0, scale: 0.01, opacity: 0 };
  const initial = targetFor("home");
  current.x = initial.x;
  current.y = initial.y;
  const clock = new THREE.Clock();
  let animationFrame = 0;
  let running = false;

  const ease = (value: number) => value * value * (3 - 2 * value);

  const updateMorph = (time: number) => {
    if (reduce) return;
    const secondsPerShape = compact ? 4.8 : 4.35;
    const phase = time / secondsPerShape;
    const currentIndex = Math.floor(phase) % morphTargets.length;
    const nextIndex = (currentIndex + 1) % morphTargets.length;
    const local = phase - Math.floor(phase);
    // Hold each recognisable object for most of the cycle, then morph quickly.
    const t = ease(Math.min(1, Math.max(0, (local - 0.58) / 0.34)));
    const a = morphTargets[currentIndex];
    const b = morphTargets[nextIndex];
    for (let i = 0; i < morphPositions.length; i += 1) morphPositions[i] = a[i] + (b[i] - a[i]) * t;
    morphPositionAttribute.needsUpdate = true;
  };

  const frame = () => {
    if (!running) return;
    const time = clock.getElapsedTime() * (reduce ? 0.15 : 1);
    const target = targetFor(getActiveId());
    current.x += (target.x - current.x) * 0.05;
    current.y += (target.y - current.y) * 0.05;
    current.scale += (target.scale - current.scale) * 0.05;
    current.opacity += (target.opacity - current.opacity) * 0.06;

    updateMorph(time);

    group.position.set(current.x, current.y + Math.sin(time * 0.75) * 0.12, 0);
    group.scale.setScalar(current.scale * (1 + Math.sin(time * 1.15) * 0.018));
    const drift = reduce ? 0 : Math.sin(time * 0.22) * 0.08;
    group.rotation.y += (mouse.nx * 0.36 + drift - group.rotation.y) * 0.045;
    group.rotation.x += (mouse.ny * 0.18 - group.rotation.x) * 0.045;

    morphCloud.rotation.z = Math.sin(time * 0.34) * 0.035;
    halo1.rotation.z = 0.35 + time * 0.12;
    halo2.rotation.z = -time * 0.1;
    halo3.rotation.x = Math.sin(time * 0.16) * 0.24;
    haloGroup.scale.setScalar(1 + Math.sin(time * 0.72) * 0.025);

    const satRadius = compact ? 2.15 : 2.6;
    satellites.forEach((satellite: any, index: number) => {
      const angle = time * (0.48 + index * 0.09) + index * ((Math.PI * 2) / satellites.length);
      satellite.position.set(
        Math.cos(angle) * satRadius,
        Math.sin(angle * 1.18) * (1.25 + index * 0.13),
        Math.sin(angle) * 0.7,
      );
    });

    particles.rotation.y = time * 0.015 + mouse.nx * 0.04;
    particles.rotation.x = mouse.ny * 0.025;
    particles.position.y = -window.scrollY * 0.0014;

    fadeMaterials.forEach(({ material, base }) => { material.opacity = base * current.opacity; });
    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || document.hidden) return;
    running = true;
    animationFrame = requestAnimationFrame(frame);
  };

  const stop = () => {
    running = false;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  };

  const onVisibilityChange = () => {
    if (document.hidden) stop();
    else start();
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  start();

  return () => {
    stop();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMouseMove);
    scene.traverse((object: any) => {
      object.geometry?.dispose?.();
      if (Array.isArray(object.material)) object.material.forEach((material: any) => material.dispose?.());
      else object.material?.dispose?.();
    });
    renderer.dispose();
  };
}
