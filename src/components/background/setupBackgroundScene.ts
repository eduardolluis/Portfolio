import { createMorphTargets } from "./morphTargets";

type ThreeWindow = Window & { THREE?: any };

export function setupBackgroundScene(
  canvas: HTMLCanvasElement,
  getActiveId: () => string,
) {
  const THREE = (window as ThreeWindow).THREE;

  if (!THREE) return undefined;

  const reduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const compact = window.innerWidth < 700;

  const network = (
    navigator as Navigator & {
      connection?: {
        saveData?: boolean;
      };
    }
  ).connection;

  const deviceMemory = (
    navigator as Navigator & {
      deviceMemory?: number;
    }
  ).deviceMemory;

  if (
    network?.saveData ||
    (compact && deviceMemory !== undefined && deviceMemory <= 2)
  ) {
    return;
  }

  let renderer: any;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
  } catch {
    return;
  }

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio || 1,
      compact ? 1 : 1.15,
    ),
  );

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    1,
    0.1,
    100,
  );

  camera.position.z = 8;

  const group = new THREE.Group();

  scene.add(group);

  const colors = {
    violet: 0x7c5cff,
    cyan: 0x22d3ee,
    pink: 0xff5caa,
  };

  const colorSet = [
    new THREE.Color(colors.violet),
    new THREE.Color(colors.cyan),
    new THREE.Color(colors.pink),
  ];

  // ---------------------------------------------------------------------
  // Morphing developer object
  // ---------------------------------------------------------------------

  const morphCount = compact ? 260 : 520;

  const morphColors = new Float32Array(
    morphCount * 3,
  );

  const morphTargets =
    createMorphTargets(morphCount);

  for (let i = 0; i < morphCount; i += 1) {
    const c =
      colorSet[i % colorSet.length];

    morphColors[i * 3] = c.r;
    morphColors[i * 3 + 1] = c.g;
    morphColors[i * 3 + 2] = c.b;
  }

  // Morph entirely on the GPU.
  // Instead of rewriting every point position on the CPU every frame,
  // the vertex shader interpolates between the source and target shapes.
  //
  // This keeps the animation fluid on high-refresh displays while reducing
  // the amount of JavaScript work required for each frame.

  const morphGeometry =
    new THREE.BufferGeometry();

  const morphAttributes =
    morphTargets.map(
      (target) =>
        new THREE.BufferAttribute(
          target,
          3,
        ),
    );

  morphGeometry.setAttribute(
    "position",
    morphAttributes[0],
  );

  morphGeometry.setAttribute(
    "targetPosition",
    morphAttributes[1],
  );

  morphGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(
      morphColors,
      3,
    ),
  );

  const morphBaseOpacity = 0.94;

  const morphMaterial =
    new THREE.ShaderMaterial({
      uniforms: {
        uMorph: {
          value: 0,
        },

        uOpacity: {
          value: morphBaseOpacity,
        },

        uPointSize: {
          value:
            (compact ? 3.25 : 3.0) *
            renderer.getPixelRatio(),
        },
      },

      vertexShader: `
        attribute vec3 color;
        attribute vec3 targetPosition;

        varying vec3 vColor;

        uniform float uMorph;
        uniform float uPointSize;

        void main() {
          vColor = color;

          vec3 p = mix(
            position,
            targetPosition,
            uMorph
          );

          vec4 mvPosition =
            modelViewMatrix *
            vec4(p, 1.0);

          gl_Position =
            projectionMatrix *
            mvPosition;

          gl_PointSize =
            uPointSize;
        }
      `,

      fragmentShader: `
        varying vec3 vColor;

        uniform float uOpacity;

        void main() {
          vec2 centered =
            gl_PointCoord -
            vec2(0.5);

          float distanceFromCenter =
            dot(
              centered,
              centered
            );

          if (
            distanceFromCenter >
            0.25
          ) {
            discard;
          }

          float edge =
            1.0 -
            smoothstep(
              0.12,
              0.25,
              distanceFromCenter
            );

          gl_FragColor =
            vec4(
              vColor,
              uOpacity * edge
            );
        }
      `,

      transparent: true,

      blending:
        THREE.AdditiveBlending,

      depthWrite: false,
    });

  const morphCloud =
    new THREE.Points(
      morphGeometry,
      morphMaterial,
    );

  group.add(morphCloud);

  // ---------------------------------------------------------------------
  // Halo rings
  // ---------------------------------------------------------------------

  const haloGroup =
    new THREE.Group();

  const halo1 =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        2.45,
        0.012,
        6,
        compact ? 48 : 82,
      ),

      new THREE.MeshBasicMaterial({
        color: colors.violet,
        transparent: true,
        opacity: 0.62,
      }),
    );

  halo1.rotation.x =
    Math.PI / 2.35;

  halo1.rotation.z = 0.35;

  const halo2 =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        2.05,
        0.01,
        6,
        compact ? 42 : 72,
      ),

      new THREE.MeshBasicMaterial({
        color: colors.cyan,
        transparent: true,
        opacity: 0.46,
      }),
    );

  halo2.rotation.x =
    Math.PI / 2.75;

  halo2.rotation.y = 0.8;

  const halo3 =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        2.75,
        0.008,
        6,
        compact ? 46 : 76,
      ),

      new THREE.MeshBasicMaterial({
        color: colors.pink,
        transparent: true,
        opacity: 0.42,
      }),
    );

  halo3.rotation.y =
    Math.PI / 2.4;

  halo3.rotation.z = -0.45;

  haloGroup.add(
    halo1,
    halo2,
    halo3,
  );

  group.add(haloGroup);

  // ---------------------------------------------------------------------
  // Satellites
  // ---------------------------------------------------------------------

  const satelliteGeometry =
    new THREE.SphereGeometry(
      compact ? 0.032 : 0.04,
      8,
      8,
    );

  const satelliteMaterials = [
    new THREE.MeshBasicMaterial({
      color: colors.cyan,
      transparent: true,
      opacity: 0.95,
    }),

    new THREE.MeshBasicMaterial({
      color: colors.pink,
      transparent: true,
      opacity: 0.9,
    }),

    new THREE.MeshBasicMaterial({
      color: colors.violet,
      transparent: true,
      opacity: 0.9,
    }),
  ];

  const satellites =
    satelliteMaterials.map(
      (material: any) =>
        new THREE.Mesh(
          satelliteGeometry,
          material,
        ),
    );

  satellites.forEach(
    (satellite: any) =>
      group.add(satellite),
  );

  // ---------------------------------------------------------------------
  // Lighting
  // ---------------------------------------------------------------------

  scene.add(
    new THREE.AmbientLight(
      0x6655ff,
      0.55,
    ),
  );

  const light1 =
    new THREE.PointLight(
      colors.cyan,
      1.7,
      30,
    );

  light1.position.set(
    5,
    3,
    6,
  );

  scene.add(light1);

  const light2 =
    new THREE.PointLight(
      colors.pink,
      1.7,
      30,
    );

  light2.position.set(
    -5,
    -2,
    5,
  );

  scene.add(light2);

  // ---------------------------------------------------------------------
  // Background particles
  // ---------------------------------------------------------------------

  const count =
    compact ? 150 : 340;

  const positions =
    new Float32Array(
      count * 3,
    );

  const particleColors =
    new Float32Array(
      count * 3,
    );

  for (
    let i = 0;
    i < count;
    i += 1
  ) {
    const r =
      5 +
      Math.random() * 16;

    const theta =
      Math.random() *
      Math.PI *
      2;

    const phi =
      Math.acos(
        2 * Math.random() - 1,
      );

    positions[i * 3] =
      r *
      Math.sin(phi) *
      Math.cos(theta);

    positions[i * 3 + 1] =
      r *
      Math.sin(phi) *
      Math.sin(theta) *
      0.8;

    positions[i * 3 + 2] =
      r *
      Math.cos(phi) -
      4;

    const c =
      colorSet[
      i %
      colorSet.length
      ];

    particleColors[i * 3] =
      c.r;

    particleColors[
      i * 3 + 1
    ] = c.g;

    particleColors[
      i * 3 + 2
    ] = c.b;
  }

  const particleGeometry =
    new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",

    new THREE.BufferAttribute(
      positions,
      3,
    ),
  );

  particleGeometry.setAttribute(
    "color",

    new THREE.BufferAttribute(
      particleColors,
      3,
    ),
  );

  const particles =
    new THREE.Points(
      particleGeometry,

      new THREE.PointsMaterial({
        size: 0.04,

        vertexColors: true,

        transparent: true,

        opacity: 0.7,

        blending:
          THREE.AdditiveBlending,

        depthWrite: false,
      }),
    );

  scene.add(particles);

  // ---------------------------------------------------------------------
  // Fade materials
  // ---------------------------------------------------------------------

  const fadeMaterials: Array<{
    material: any;
    base: number;
  }> = [];

  group.traverse(
    (object: any) => {
      if (
        object.material &&
        object !== morphCloud
      ) {
        fadeMaterials.push({
          material:
            object.material,

          base:
            object.material
              .opacity ?? 1,
        });
      }
    },
  );

  // ---------------------------------------------------------------------
  // Resize
  // ---------------------------------------------------------------------

  let vw = 1;
  let vh = 1;
  let mobile = false;

  const resize = () => {
    const width =
      window.innerWidth;

    const height =
      window.innerHeight;

    renderer.setSize(
      width,
      height,
      false,
    );

    morphMaterial.uniforms.uPointSize.value =
      (compact
        ? 3.25
        : 3.0) *
      renderer.getPixelRatio();

    camera.aspect =
      width / height;

    camera.updateProjectionMatrix();

    vh =
      2 *
      Math.tan(
        (camera.fov *
          Math.PI) /
        360,
      ) *
      camera.position.z;

    vw =
      vh *
      camera.aspect;

    mobile =
      camera.aspect < 0.95;
  };

  resize();

  window.addEventListener(
    "resize",
    resize,
  );

  // ---------------------------------------------------------------------
  // Position object per section
  // ---------------------------------------------------------------------

  const targetFor = (
    id: string,
  ) => {
    if (mobile) {
      if (id === "home") {
        return {
          x: 0,
          y: vh * 0.31,
          scale: 0.53,
          opacity: 0.78,
        };
      }

      return {
        x: 0,
        y: 0,
        scale: 0.42,
        opacity: 0.08,
      };
    }

    switch (id) {
      case "home":
        return {
          x: vw * 0.245,
          y: 0,
          scale: 1,
          opacity: 1,
        };

      case "stack":
        return {
          x: vw * 0.3,
          y: 0,
          scale: 0.7,
          opacity: 0.08,
        };

      case "projects":
        return {
          x: 0,
          y: 0,
          scale: 0.9,
          opacity: 0.045,
        };

      case "about":
        return {
          x: -vw * 0.34,
          y: 0,
          scale: 0.72,
          opacity: 0.02,
        };

      default:
        return {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0,
        };
    }
  };

  // ---------------------------------------------------------------------
  // Mouse interaction
  // ---------------------------------------------------------------------

  const mouse = {
    nx: 0,
    ny: 0,
  };

  const onMouseMove = (
    event: MouseEvent,
  ) => {
    mouse.nx =
      (event.clientX /
        window.innerWidth) *
      2 -
      1;

    mouse.ny =
      (event.clientY /
        window.innerHeight) *
      2 -
      1;
  };

  window.addEventListener(
    "mousemove",
    onMouseMove,
    {
      passive: true,
    },
  );

  // ---------------------------------------------------------------------
  // Animation state
  // ---------------------------------------------------------------------

  const current = {
    x: 0,
    y: 0,
    scale: 0.01,
    opacity: 0,
  };

  const initial =
    targetFor("home");

  current.x = initial.x;
  current.y = initial.y;

  const clock =
    new THREE.Clock();

  let animationFrame = 0;
  let running = false;

  let lastFrameTimestamp = 0;

  // ---------------------------------------------------------------------
  // Morph helpers
  // ---------------------------------------------------------------------

  const clamp01 = (
    value: number,
  ) =>
    Math.min(
      1,
      Math.max(
        0,
        value,
      ),
    );

  const smoothMorphStep = (
    value: number,
  ) => {
    const t =
      clamp01(value);

    // Smootherstep.
    // Very smooth acceleration and deceleration without the
    // abrupt middle movement of the previous short morph.

    return (
      t *
      t *
      t *
      (
        t *
        (
          t * 6 -
          15
        ) +
        10
      )
    );
  };

  let morphPair = -1;

  const updateMorph = (
    time: number,
  ) => {
    if (reduce) return;

    /*
     * Keep each shape readable before starting the next morph.
     *
     * 0.75s desktop / 0.8s compact provides enough time for the points
     * to travel naturally without creating the "laggy slow motion"
     * feeling of the old implementation.
     */

    const holdSeconds =
      compact
        ? 2.9
        : 2.7;

    const transitionSeconds =
      compact
        ? 0.8
        : 0.75;

    const cycleSeconds =
      holdSeconds +
      transitionSeconds;

    const cycle =
      Math.floor(
        time /
        cycleSeconds,
      );

    const currentIndex =
      cycle %
      morphTargets.length;

    const nextIndex =
      (currentIndex + 1) %
      morphTargets.length;

    const localSeconds =
      time -
      cycle *
      cycleSeconds;

    if (
      morphPair !==
      currentIndex
    ) {
      morphPair =
        currentIndex;

      morphGeometry.setAttribute(
        "position",
        morphAttributes[
        currentIndex
        ],
      );

      morphGeometry.setAttribute(
        "targetPosition",
        morphAttributes[
        nextIndex
        ],
      );
    }

    const progress =
      (localSeconds -
        holdSeconds) /
      transitionSeconds;

    morphMaterial.uniforms.uMorph.value =
      smoothMorphStep(
        progress,
      );
  };

  // ---------------------------------------------------------------------
  // Main render loop
  // ---------------------------------------------------------------------

  const frame = (
    timestamp = 0,
  ) => {
    if (!running) return;

    animationFrame =
      requestAnimationFrame(
        frame,
      );

    /*
     * requestAnimationFrame runs at the display's native refresh rate.
     *
     * That means the scene naturally supports 60Hz, 120Hz, 144Hz,
     * 165Hz and similar displays without hard-capping the render loop.
     *
     * The damping below is time-based so motion remains consistent
     * regardless of refresh rate.
     */

    const delta =
      lastFrameTimestamp
        ? Math.min(
          (timestamp -
            lastFrameTimestamp) /
          1000,
          0.05,
        )
        : 1 / 60;

    lastFrameTimestamp =
      timestamp;

    const alpha05 =
      1 -
      Math.pow(
        1 - 0.05,
        delta * 60,
      );

    const alpha06 =
      1 -
      Math.pow(
        1 - 0.06,
        delta * 60,
      );

    const alpha045 =
      1 -
      Math.pow(
        1 - 0.045,
        delta * 60,
      );

    const time =
      clock.getElapsedTime() *
      (reduce
        ? 0.15
        : 1);

    const activeId =
      getActiveId();

    const target =
      targetFor(activeId);

    current.x +=
      (target.x -
        current.x) *
      alpha05;

    current.y +=
      (target.y -
        current.y) *
      alpha05;

    current.scale +=
      (target.scale -
        current.scale) *
      alpha05;

    current.opacity +=
      (target.opacity -
        current.opacity) *
      alpha06;

    /*
     * GPU-driven morph.
     *
     * JavaScript only changes a single uniform each display frame.
     * The actual point interpolation occurs inside the vertex shader.
     */

    if (
      !reduce &&
      current.opacity >
      0.035
    ) {
      updateMorph(time);
    }

    // -----------------------------------------------------------------
    // Main group motion
    // -----------------------------------------------------------------

    group.position.set(
      current.x,

      current.y +
      Math.sin(
        time * 0.75,
      ) *
      0.12,

      0,
    );

    group.scale.setScalar(
      current.scale *
      (
        1 +
        Math.sin(
          time * 1.15,
        ) *
        0.018
      ),
    );

    const drift =
      reduce
        ? 0
        : Math.sin(
          time * 0.22,
        ) *
        0.08;

    group.rotation.y +=
      (
        mouse.nx *
        0.36 +
        drift -
        group.rotation.y
      ) *
      alpha045;

    group.rotation.x +=
      (
        mouse.ny *
        0.18 -
        group.rotation.x
      ) *
      alpha045;

    // -----------------------------------------------------------------
    // Morph cloud + halos
    // -----------------------------------------------------------------

    morphCloud.rotation.z =
      Math.sin(
        time * 0.34,
      ) *
      0.035;

    halo1.rotation.z =
      0.35 +
      time * 0.12;

    halo2.rotation.z =
      -time * 0.1;

    halo3.rotation.x =
      Math.sin(
        time * 0.16,
      ) *
      0.24;

    haloGroup.scale.setScalar(
      1 +
      Math.sin(
        time * 0.72,
      ) *
      0.025,
    );

    // -----------------------------------------------------------------
    // Satellites
    // -----------------------------------------------------------------

    const satRadius =
      compact
        ? 2.15
        : 2.6;

    satellites.forEach(
      (
        satellite: any,
        index: number,
      ) => {
        const angle =
          time *
          (
            0.48 +
            index *
            0.09
          ) +
          index *
          (
            (Math.PI * 2) /
            satellites.length
          );

        satellite.position.set(
          Math.cos(angle) *
          satRadius,

          Math.sin(
            angle * 1.18,
          ) *
          (
            1.25 +
            index *
            0.13
          ),

          Math.sin(angle) *
          0.7,
        );
      },
    );

    // -----------------------------------------------------------------
    // Background stars
    // -----------------------------------------------------------------

    particles.rotation.y =
      time * 0.015 +
      mouse.nx * 0.04;

    particles.rotation.x =
      mouse.ny * 0.025;

    particles.position.y =
      -window.scrollY *
      0.0014;

    // -----------------------------------------------------------------
    // Section fade
    // -----------------------------------------------------------------

    morphMaterial.uniforms.uOpacity.value =
      morphBaseOpacity *
      current.opacity;

    fadeMaterials.forEach(
      ({
        material,
        base,
      }) => {
        material.opacity =
          base *
          current.opacity;
      },
    );

    renderer.render(
      scene,
      camera,
    );
  };

  // ---------------------------------------------------------------------
  // Start / stop
  // ---------------------------------------------------------------------

  const start = () => {
    if (
      running ||
      document.hidden
    ) {
      return;
    }

    running = true;

    lastFrameTimestamp = 0;

    animationFrame =
      requestAnimationFrame(
        frame,
      );
  };

  const stop = () => {
    running = false;

    if (
      animationFrame
    ) {
      cancelAnimationFrame(
        animationFrame,
      );
    }

    animationFrame = 0;
  };

  const onVisibilityChange =
    () => {
      if (
        document.hidden
      ) {
        stop();
      } else {
        start();
      }
    };

  document.addEventListener(
    "visibilitychange",
    onVisibilityChange,
  );

  start();

  // ---------------------------------------------------------------------
  // Cleanup
  // ---------------------------------------------------------------------

  return () => {
    stop();

    document.removeEventListener(
      "visibilitychange",
      onVisibilityChange,
    );

    window.removeEventListener(
      "resize",
      resize,
    );

    window.removeEventListener(
      "mousemove",
      onMouseMove,
    );

    scene.traverse(
      (object: any) => {
        object.geometry?.dispose?.();

        if (
          Array.isArray(
            object.material,
          )
        ) {
          object.material.forEach(
            (material: any) =>
              material.dispose?.(),
          );
        } else {
          object.material?.dispose?.();
        }
      },
    );

    renderer.dispose();
  };
}