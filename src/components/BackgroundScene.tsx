import { useEffect, useRef } from "react";

export function BackgroundScene({ activeId }: { activeId: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(activeId);
  activeRef.current = activeId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const THREE = (window as unknown as { THREE?: any }).THREE;
    if (!canvas || !THREE) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.innerWidth < 700;
    let renderer: any;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.35 : 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 8;

    const group = new THREE.Group();
    scene.add(group);

    const colors = { violet: 0x7c5cff, cyan: 0x22d3ee, pink: 0xff5caa };

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshStandardMaterial({
        color: 0x1b1450,
        metalness: 0.7,
        roughness: 0.25,
        flatShading: true,
        emissive: 0x2a1a8a,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 1,
      }),
    );
    group.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, compact ? 1 : 2),
      new THREE.MeshBasicMaterial({ color: colors.cyan, wireframe: true, transparent: true, opacity: 0.32 }),
    );
    group.add(wire);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.2, 0.025, compact ? 120 : 240, compact ? 6 : 8, 2, 3),
      new THREE.MeshBasicMaterial({ color: colors.pink, transparent: true, opacity: 0.85 }),
    );
    group.add(knot);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.012, 8, compact ? 96 : 160),
      new THREE.MeshBasicMaterial({ color: colors.violet, transparent: true, opacity: 0.7 }),
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    const device = (geometry: any, color: number) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x0f0c2e, transparent: true, opacity: 0.85 })));
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 1 })));
      return g;
    };

    const browser = device(new THREE.BoxGeometry(1.5, 1, 0.06), colors.violet);
    const phone = device(new THREE.BoxGeometry(0.55, 1.1, 0.06), colors.cyan);
    const orbA = new THREE.Group();
    orbA.add(browser);
    browser.position.x = 3.3;
    orbA.rotation.z = 0.35;
    const orbB = new THREE.Group();
    orbB.add(phone);
    phone.position.x = -3.1;
    orbB.rotation.z = -0.4;
    group.add(orbA, orbB);

    scene.add(new THREE.AmbientLight(0x6655ff, 0.7));
    const light1 = new THREE.PointLight(colors.cyan, 2.2, 30);
    light1.position.set(5, 3, 6);
    scene.add(light1);
    const light2 = new THREE.PointLight(colors.pink, 2.2, 30);
    light2.position.set(-5, -2, 5);
    scene.add(light2);

    const count = compact ? 650 : 1400;
    const positions = new Float32Array(count * 3);
    const particleColors = new Float32Array(count * 3);
    const colorSet = [new THREE.Color(colors.violet), new THREE.Color(colors.cyan), new THREE.Color(colors.pink)];
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
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
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
        if (id === "home") return { x: 0, y: vh * 0.3, scale: 0.52, opacity: 0.72 };
        return { x: 0, y: 0, scale: 0.42, opacity: 0.09 };
      }
      switch (id) {
        case "home": return { x: vw * 0.24, y: 0, scale: 1, opacity: 1 };
        case "stack": return { x: vw * 0.30, y: 0, scale: 0.7, opacity: 0.2 };
        case "projects": return { x: 0, y: 0, scale: 0.95, opacity: 0.12 };
        case "about": return { x: -vw * 0.28, y: 0, scale: 0.8, opacity: 0.26 };
        default: return { x: 0, y: 0, scale: 1.3, opacity: 0.18 };
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

    const frame = () => {
      animationFrame = requestAnimationFrame(frame);
      const time = clock.getElapsedTime() * (reduce ? 0.15 : 1);
      const target = targetFor(activeRef.current);
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      current.scale += (target.scale - current.scale) * 0.05;
      current.opacity += (target.opacity - current.opacity) * 0.06;

      group.position.set(current.x, current.y + Math.sin(time * 0.8) * 0.15, 0);
      group.scale.setScalar(current.scale * (1 + Math.sin(time * 1.2) * 0.02));
      group.rotation.y += (mouse.nx * 0.55 + window.scrollY * 0.0012 - group.rotation.y) * 0.05;
      group.rotation.x += (mouse.ny * 0.3 - group.rotation.x) * 0.05;

      core.rotation.y = time * 0.35;
      core.rotation.x = time * 0.2;
      wire.rotation.y = -time * 0.18;
      wire.rotation.z = time * 0.12;
      knot.rotation.x = time * 0.25;
      knot.rotation.y = time * 0.15;
      ring.rotation.z = time * 0.2;
      orbA.rotation.y = time * 0.5;
      orbB.rotation.y = -time * 0.42;
      browser.rotation.y = -orbA.rotation.y;
      phone.rotation.y = -orbB.rotation.y;
      particles.rotation.y = time * 0.02 + mouse.nx * 0.05;
      particles.rotation.x = mouse.ny * 0.03;
      particles.position.y = -window.scrollY * 0.0015;

      fadeMaterials.forEach(({ material, base }) => { material.opacity = base * current.opacity; });
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      particleGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="gl" aria-hidden="true" />;
}
