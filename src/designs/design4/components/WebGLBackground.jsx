import { useEffect, useRef } from "react";
import { DEFAULT_SCENE_SETTINGS } from "./SceneSettingsPanel";

// Returns counts, honouring settingsRef overrides with mobile-safe caps
function getNatureInstanceCounts(width, settingsRef) {
  const s = settingsRef?.current ?? {};
  let maxTrees, maxGrass;
  if (width < 760) { maxTrees = 6; maxGrass = 8; }
  else if (width < 1100) { maxTrees = 9; maxGrass = 12; }
  else { maxTrees = 12; maxGrass = 18; }

  const defTrees = width < 760 ? 5 : width < 1100 ? 7 : 9;
  const defGrass = width < 760 ? 6 : width < 1100 ? 10 : 14;

  return {
    trees: Math.min(Math.max(s.treeCount ?? defTrees, 2), maxTrees),
    grass: Math.min(Math.max(s.grassCount ?? defGrass, 2), maxGrass),
  };
}

function createNatureElements(THREE, width, settingsRef) {
  const counts = getNatureInstanceCounts(width, settingsRef);
  const group = new THREE.Group();
  group.name = "light-theme-nature";

  const texLoader = new THREE.TextureLoader();

  // 1. Crisp high-definition tree texture
  const treeTexture = texLoader.load('/tree-light.png');
  treeTexture.colorSpace = THREE.SRGBColorSpace;
  treeTexture.generateMipmaps = true;
  treeTexture.minFilter = THREE.LinearMipmapLinearFilter;

  const sharedTreeMat = new THREE.SpriteMaterial({
    map: treeTexture,
    transparent: true,
    alphaTest: 0.08,
    depthTest: true,
    depthWrite: true
  });

  // 2. High-definition grass and stone textures (6 clean isolated varieties)
  const grassTextures = [
    texLoader.load('/grass-stone-1.png'),
    texLoader.load('/grass-stone-2.png'),
    texLoader.load('/grass-stone-3.png'),
    texLoader.load('/grass-stone-4.png'),
    texLoader.load('/grass-stone-5.png'),
    texLoader.load('/grass-stone-6.png'),
  ];
  grassTextures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
  });

  const grassMaterials = grassTextures.map((t) => new THREE.SpriteMaterial({
    map: t,
    transparent: true,
    alphaTest: 0.08,
    depthTest: true,
    depthWrite: true
  }));

  const treeData = [];
  const grassData = [];
  const dummy = new THREE.Object3D();

  // Generate compact, ultra-crisp Trees with grass and stones at their base
  for (let i = 0; i < counts.trees; i++) {
    const angle = (i / counts.trees) * Math.PI * 2 + 0.18;
    const radius = 4.45 + (i % 3) * 0.42;
    // Compact scale so pixel density is sharp and crisp
    const scale = 1.45 + (i % 4) * 0.14;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const baseY = -5.08 + (scale * 0.58);

    // 3D Tree Sprite
    const treeSprite = new THREE.Sprite(sharedTreeMat);
    treeSprite.position.set(x, baseY, z);
    treeSprite.scale.set(scale * 1.40, scale * 1.40, 1);
    group.add(treeSprite);

    treeData.push({ sprite: treeSprite, x, z, baseY, phase: i * 0.73, baseScale: scale * 1.40 });

    // Companion grass & stone clump right at the root base of each tree
    const rootGrassMat = grassMaterials[i % grassMaterials.length];
    const rootGrass = new THREE.Sprite(rootGrassMat);
    const gOffsetX = (i % 2 === 0 ? 0.18 : -0.18) * scale;
    const gOffsetZ = (i % 3 === 0 ? 0.15 : -0.15) * scale;
    const gScale = scale * 0.58;
    const gBaseY = -5.08 + (gScale * 0.38);

    rootGrass.position.set(x + gOffsetX, gBaseY, z + gOffsetZ);
    rootGrass.scale.set(gScale * 1.15, gScale * 0.92, 1);
    group.add(rootGrass);

    grassData.push({ sprite: rootGrass, x: x + gOffsetX, z: z + gOffsetZ, baseY: gBaseY, phase: i * 0.95 });
  }

  // Generate additional surrounding Grass & Stone clusters along the perimeter
  for (let i = 0; i < counts.grass - counts.trees; i++) {
    const angle = (i / (counts.grass - counts.trees)) * Math.PI * 2 + 0.45;
    const radius = 3.35 + (i % 3) * 0.55;
    const gScale = 0.52 + (i % 3) * 0.12;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const gBaseY = -5.08 + (gScale * 0.38);

    const gMat = grassMaterials[(i + 2) % grassMaterials.length];
    const grassSprite = new THREE.Sprite(gMat);
    grassSprite.position.set(x, gBaseY, z);
    grassSprite.scale.set(gScale * 1.18, gScale * 0.95, 1);
    grassData.push({ sprite: grassSprite, x, z, baseY: gBaseY, phase: (i + counts.trees) * 0.82 });
  }

  group.userData = { treeData, grassData };
  return group;
}

function WebGLBackground({ chapters, active, theme, settingsRef: externalSettingsRef }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(active);
  const accentRef = useRef(null);
  const themeRef = useRef(theme);
  const applyThemeRef = useRef(null);
  // Always create an internal ref (hooks must not be conditional), use external one if provided
  const internalSettingsRef = useRef(DEFAULT_SCENE_SETTINGS);
  const settingsRef = externalSettingsRef ?? internalSettingsRef;

  useEffect(() => {
    themeRef.current = theme;
    applyThemeRef.current?.(theme);
  }, [theme]);

  useEffect(() => {
    activeRef.current = active;
    const THREE = window.THREE;
    if (!THREE) return;
    if (!accentRef.current) {
      accentRef.current = new THREE.Color(...(chapters[active]?.accent || [0.91, 0.44, 0.26]));
    } else if (chapters[active]?.accent) {
      accentRef.current.setRGB(...chapters[active].accent);
    }
  }, [active, chapters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const THREE = window.THREE;
    if (!canvas || !THREE) return;

    let dark = themeRef.current !== "light";

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = dark ? 1.15 : 1.40;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(dark ? 0x050605 : 0xdaeef5, dark ? 0.012 : 0.007);

    const hemisphereLight = new THREE.HemisphereLight(0xf2f7df, 0x6f5a3a, dark ? 0 : 1.35);
    const natureKeyLight = new THREE.DirectionalLight(0xffedbd, dark ? 0 : 1.15);
    natureKeyLight.position.set(5, 9, 4);
    scene.add(hemisphereLight, natureKeyLight);

    let natureGroup = createNatureElements(THREE, window.innerWidth, settingsRef);
    natureGroup.visible = !dark;
    scene.add(natureGroup);

    // Track last counts so we know when to rebuild
    let lastTreeCount = settingsRef.current.treeCount ?? (window.innerWidth < 760 ? 5 : window.innerWidth < 1100 ? 7 : 9);
    let lastGrassCount = settingsRef.current.grassCount ?? (window.innerWidth < 760 ? 6 : window.innerWidth < 1100 ? 10 : 14);

    // Debounced rebuild when tree/grass counts change
    let rebuildTimer = null;
    function scheduleNatureRebuild() {
      clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(() => {
        scene.remove(natureGroup);
        natureGroup.traverse((obj) => {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose();
        });
        natureGroup = createNatureElements(THREE, window.innerWidth, settingsRef);
        natureGroup.visible = !dark;
        scene.add(natureGroup);
        lastTreeCount = settingsRef.current.treeCount ?? lastTreeCount;
        lastGrassCount = settingsRef.current.grassCount ?? lastGrassCount;
      }, 300);
    }

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 4.2, 6.6);

    /* ── Central Building Group ── */
    const building = new THREE.Group();
    building.rotation.y = -0.18;
    scene.add(building);

    /* ── Procedural Skyscraper Glass Shader ── */
    const vertexShader = `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main(){
        vec3 pos = position;
        float n = sin(pos.y * 2.35 + uTime * 0.35) * 0.008 + sin((pos.x + pos.z) * 4.0 - uTime * 0.25) * 0.006;
        pos += normal * n;
        vNormal = normalize(mat3(modelMatrix) * normal);
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const fragmentShader = `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uTime;
      uniform float uDark;
      varying vec3 vNormal;
      varying vec3 vWorldPos;

      void main(){
        vec3 N = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float fresnel = pow(1.0 - max(dot(N, viewDir), 0.0), 2.2);
        float lightTerm = clamp(dot(N, normalize(vec3(0.35, 0.85, 0.45))), 0.0, 1.0);

        // Detect whether this fragment belongs mainly to a front/back face or a side face,
        // then build a clean architectural window grid in world space.
        float frontFace = step(abs(N.x), abs(N.z));
        float facadeCoord = mix(vWorldPos.z, vWorldPos.x, frontFace);
        float floorLine = 1.0 - smoothstep(0.0, 0.055, abs(fract((vWorldPos.y + 5.0) * 2.15) - 0.02));
        float bayLine   = 1.0 - smoothstep(0.0, 0.07,  abs(fract((facadeCoord + 2.5) * 2.45) - 0.02));
        float grid = clamp(floorLine * 0.92 + bayLine * 0.35, 0.0, 1.0);

        // Emerald & Gold luxury palette for light theme:
        // Deep Forest  #0d4f2e  dark emerald base
        // Rich Emerald #1a7a50  mid-tower jewel green
        // Vivid Emerald #2daa72 bright sun-lit face
        // Mint Gold    #a8d4a0  upper pale green
        // Warm Gold    #d4a520  accent / highlights
        vec3 deepForest  = vec3(0.051, 0.310, 0.180);  // #0d4f2e
        vec3 richEmerald = vec3(0.102, 0.478, 0.314);  // #1a7a50
        vec3 vividGreen  = vec3(0.176, 0.667, 0.447);  // #2daa72
        vec3 mintGold    = vec3(0.659, 0.831, 0.627);  // #a8d4a0
        vec3 warmGold    = vec3(0.831, 0.647, 0.125);  // #d4a520

        // Gradient: deep forest (bottom) → warm gold highlight (top)
        float normX = clamp((facadeCoord + 1.2) / 2.4, 0.0, 1.0);
        float normY = clamp((vWorldPos.y + 4.5) / 9.15, 0.0, 1.0);
        float gradT = clamp(normY * 0.65 + normX * 0.35, 0.0, 1.0);

        vec3 lightNeon;
        if (gradT < 0.25) {
          lightNeon = mix(deepForest, richEmerald, gradT / 0.25);
        } else if (gradT < 0.55) {
          lightNeon = mix(richEmerald, vividGreen, (gradT - 0.25) / 0.30);
        } else if (gradT < 0.80) {
          lightNeon = mix(vividGreen, mintGold, (gradT - 0.55) / 0.25);
        } else {
          lightNeon = mix(mintGold, warmGold, (gradT - 0.80) / 0.20);
        }

        vec3 teal = vec3(0.26, 0.63, 0.61);
        vec3 coral = vec3(0.91, 0.44, 0.26);
        vec3 darkNeon = mix(mix(teal, coral, normX), uColorA, 0.25);
        vec3 neon = mix(lightNeon, darkNeon, uDark);

        vec3 darkGlass = vec3(0.010, 0.014, 0.025) + uColorA * 0.025;
        // Light glass: warm ivory-white base with emerald-gold tint — premium jewel look
        vec3 lightGlass = mix(vec3(0.96, 0.97, 0.94), lightNeon, 0.32);
        vec3 glass = mix(lightGlass, darkGlass, uDark);

        vec3 color = glass;
        color += neon * grid * (uDark > 0.5 ? 0.25 : 0.32);
        color += neon * fresnel * (uDark > 0.5 ? 0.55 : 0.52);
        color += (uDark > 0.5 ? vec3(0.16, 0.20, 0.28) : vec3(0.20, 0.50, 0.30)) * lightTerm * 0.22;
        color += uColorB * (0.018 + 0.014 * sin(uTime * 0.35 + vWorldPos.y));
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const initAccent = chapters[0]?.accent || [0.91, 0.44, 0.26];
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(initAccent[0], initAccent[1], initAccent[2]) },
        uColorB: { value: new THREE.Color(0.26, 0.63, 0.61) },
        uDark: { value: dark ? 1.0 : 0.0 }
      },
      side: THREE.DoubleSide
    });

    // 1. Main Skyscraper Core Volume (2.25 × 9.15 × 1.48)
    const towerGeo = new THREE.BoxGeometry(2.25, 9.15, 1.48, 10, 40, 8);
    const towerCore = new THREE.Mesh(towerGeo, mat);
    building.add(towerCore);

    // 2. Skyscraper Inset Crown & Rooftop Slab
    const crownMat = new THREE.MeshPhongMaterial({
      color: dark ? 0x070b12 : 0xd4f0e0,  // pale mint crown in light
      specular: dark ? 0x17313d : 0xd4a520, // warm gold specular
      shininess: 140,
      transparent: true,
      opacity: dark ? 0.98 : 0.92
    });
    const crown = new THREE.Mesh(new THREE.BoxGeometry(1.90, 0.42, 1.28), crownMat);
    crown.position.y = 4.68;
    building.add(crown);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.13, 0.92), crownMat);
    roof.position.y = 4.96;
    building.add(roof);

    // Floating SigmaValue logo above the roof
    const logoTexture = new THREE.TextureLoader().load('/logo.png');
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    const logoGeo = new THREE.PlaneGeometry(0.58, 0.58);
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      side: THREE.FrontSide
    });
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, 6.05, 0);
    logoGroup.scale.setScalar(1.5);

    const glassDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.40, 48),
      new THREE.MeshBasicMaterial({
        color: dark ? 0x5cb8b2 : 0xd9f2f4,
        transparent: true,
        opacity: dark ? 0.16 : 0.22,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    logoGroup.add(glassDisc);

    const glassOutline = new THREE.Mesh(
      new THREE.RingGeometry(0.388, 0.40, 48),
      new THREE.MeshBasicMaterial({
        color: dark ? 0x5cb8b2 : 0x43a09b,
        transparent: true,
        opacity: dark ? 0.42 : 0.30,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    glassOutline.position.z = 0.003;
    logoGroup.add(glassOutline);

    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.z = 0.006;
    logoGroup.add(logoMesh);

    const logoBack = new THREE.Mesh(logoGeo, logoMat);
    logoBack.position.z = -0.006;
    logoBack.rotation.y = Math.PI;
    logoGroup.add(logoBack);
    scene.add(logoGroup);

    // Emerald & Gold palette for light theme: emerald, gold, deep forest, mint
    const neonCoralMat = new THREE.MeshBasicMaterial({
      color: dark ? 0xe87042 : 0xd4a520, // warm gold in light
      transparent: true,
      opacity: dark ? 0.78 : 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonPeachMat = new THREE.MeshBasicMaterial({
      color: dark ? 0xf0865e : 0xf0c840, // bright gold in light
      transparent: true,
      opacity: dark ? 0.75 : 0.76,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonSandMat = new THREE.MeshBasicMaterial({
      color: dark ? 0xd0a27d : 0xa8d4a0, // mint pale green in light
      transparent: true,
      opacity: dark ? 0.70 : 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonMintMat = new THREE.MeshBasicMaterial({
      color: dark ? 0x5cb8b2 : 0x1a7a50, // rich emerald in light
      transparent: true,
      opacity: dark ? 0.78 : 0.80,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonTealMat = new THREE.MeshBasicMaterial({
      color: dark ? 0x43a09b : 0x2daa72, // vivid emerald in light
      transparent: true,
      opacity: dark ? 0.82 : 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const dimCoralMat = neonCoralMat.clone();
    dimCoralMat.opacity = dark ? 0.30 : 0.34;
    const dimPeachMat = neonPeachMat.clone();
    dimPeachMat.opacity = dark ? 0.30 : 0.30;
    const dimSandMat = neonSandMat.clone();
    dimSandMat.opacity = dark ? 0.28 : 0.26;
    const dimMintMat = neonMintMat.clone();
    dimMintMat.opacity = dark ? 0.30 : 0.32;
    const dimTealMat = neonTealMat.clone();
    dimTealMat.opacity = dark ? 0.32 : 0.32;

    function addVerticalRail(x, z, material, w = 0.022, d = 0.022, h = 8.75, y = 0) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
      rail.position.set(x, y, z);
      building.add(rail);
    }

    // Front corners + rear echoes with neon teal (left) and neon coral (right)
    addVerticalRail(-1.145, 0.755, neonTealMat, 0.028, 0.028, 8.90);
    addVerticalRail(1.145, 0.755, neonCoralMat, 0.028, 0.028, 8.90);
    addVerticalRail(-1.145, -0.755, dimTealMat, 0.020, 0.020, 8.75);
    addVerticalRail(1.145, -0.755, dimCoralMat, 0.020, 0.020, 8.75);

    // Inner facade vertical emphasis lines with neon mint (left) and neon peach (right)
    addVerticalRail(-0.72, 0.766, neonMintMat, 0.020, 0.014, 8.45, -0.08);
    addVerticalRail(0.72, 0.766, neonPeachMat, 0.020, 0.014, 8.45, -0.08);

    // Floor bands (Gracefully cycling through the 5 Neon stops in light theme)
    const floorMats = [dimCoralMat, dimPeachMat, dimSandMat, dimMintMat, dimTealMat];
    for (let y = -4.05, i = 0; y <= 4.10; y += 0.48, i++) {
      const fm = dark ? (i % 2 === 0 ? dimTealMat : dimCoralMat) : floorMats[i % floorMats.length];
      const front = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.014, 0.018), fm);
      front.position.set(0, y, 0.752);
      building.add(front);

      const back = front.clone();
      back.position.z = -0.752;
      building.add(back);

      const left = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.014, 1.42), dimTealMat);
      left.position.set(-1.126, y, 0);
      building.add(left);

      const right = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.014, 1.42), dimCoralMat);
      right.position.set(1.126, y, 0);
      building.add(right);
    }

    // Sparse vertical window mullions across facades
    [-0.82, -0.41, 0, 0.41, 0.82].forEach((x, idx) => {
      let m;
      if (dark) {
        m = x <= 0 ? dimTealMat : dimCoralMat;
      } else {
        const mullionPalette = [dimTealMat, dimMintMat, dimSandMat, dimPeachMat, dimCoralMat];
        m = mullionPalette[idx] || dimSandMat;
      }
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.012, 8.28, 0.012), m);
      bar.position.set(x, -0.02, 0.761);
      building.add(bar);
      const rear = bar.clone();
      rear.position.z = -0.761;
      building.add(rear);
    });

    [-0.48, 0, 0.48].forEach((z, idx) => {
      const left = new THREE.Mesh(new THREE.BoxGeometry(0.012, 8.20, 0.012), dark ? dimTealMat : (idx === 0 ? dimTealMat : dimMintMat));
      left.position.set(-1.135, -0.04, z);
      building.add(left);
      const right = left.clone();
      right.material = dark ? dimCoralMat : (idx === 0 ? dimCoralMat : dimPeachMat);
      right.position.x = 1.135;
      building.add(right);
    });

    // Luminous Crown Roof Outline — gold in light
    const roofEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.92, 0.44, 1.30)),
      new THREE.LineBasicMaterial({
        color: dark ? 0x5cb8b2 : 0xd4a520, // warm gold crown outline in light
        transparent: true,
        opacity: dark ? 0.65 : 0.80,
        blending: THREE.AdditiveBlending
      })
    );
    roofEdges.position.copy(crown.position);
    building.add(roofEdges);

    // Stepped Base Wireframe Platforms
    function addBaseOutline(w, d, y, color, opacity) {
      const e = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.035, d));
      const l = new THREE.LineSegments(
        e,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending })
      );
      l.position.y = y;
      building.add(l);
    }
    addBaseOutline(2.75, 2.02, -4.59, dark ? 0x43a09b : 0x2daa72, 0.72); // vivid emerald
    addBaseOutline(3.05, 2.26, -4.615, dark ? 0x5cb8b2 : 0x1a7a50, 0.58); // rich emerald
    addBaseOutline(3.35, 2.50, -4.64, dark ? 0xe87042 : 0xd4a520, 0.50); // warm gold

    // Match the light-theme base treatment in dark mode.
    if (dark) {
      const darkGround = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 18, 1, 1),
        new THREE.MeshBasicMaterial({
          color: 0x17343d,
          transparent: true,
          opacity: 0.13,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      darkGround.rotation.x = -Math.PI / 2;
      darkGround.position.y = -5.10;
      scene.add(darkGround);

      [
        [5.5, 0x17343d, 0.10],
        [4.0, 0x245e63, 0.12],
        [2.8, 0x43a09b, 0.14],
        [1.8, 0x5cb8b2, 0.16],
        [1.0, 0xe87042, 0.18]
      ].forEach(([r, color, opacity]) => {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(r - 0.6, r, 64),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
          })
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -5.08;
        scene.add(ring);
      });
    }

    /* ── Light-Theme Extras ── */
    if (!dark) {
      // Reflective neon ground plane
      const groundGeo = new THREE.PlaneGeometry(18, 18, 1, 1);
      const groundMat = new THREE.MeshBasicMaterial({
        color: 0xffd2a8,
        transparent: true,
        opacity: 0.10,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -5.10;
      scene.add(ground);

      // Ground glow disc — emerald & gold rings
      [[5.5, 0xa8d4a0, 0.10], [4.0, 0x2daa72, 0.12], [2.8, 0x1a7a50, 0.14], [1.8, 0xd4a520, 0.16], [1.0, 0xf0c840, 0.18]].forEach(([r, color, op]) => {
        const rg = new THREE.RingGeometry(r - 0.6, r, 64);
        const rm = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(rg, rm);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -5.08;
        scene.add(ring);
      });
    }

    applyThemeRef.current = (nextTheme) => {
      dark = nextTheme !== "light";
      natureGroup.visible = !dark;
      renderer.toneMappingExposure = dark ? 1.15 : 1.40;
      scene.fog.color.setHex(dark ? 0x050605 : 0xdaeef5);
      scene.fog.density = dark ? 0.012 : 0.007;
      mat.uniforms.uDark.value = dark ? 1 : 0;
      hemisphereLight.intensity = dark ? 0 : 1.35;
      natureKeyLight.intensity = dark ? 0 : 1.15;
    };

    /* ── Ambient Particle Field ── */
    const PCOUNT = window.innerWidth < 760 ? 260 : 650;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PCOUNT * 3);
    const colors = new Float32Array(PCOUNT * 3);
    // Light: Emerald & Gold palette; Dark: classic coral/teal palette
    const palette = dark ? [
      [0.91, 0.44, 0.26], // Coral #E87042
      [0.94, 0.64, 0.49], // Peach #F0865E
      [0.26, 0.63, 0.61], // Teal #43A09B
      [0.36, 0.72, 0.70], // Seafoam #5CB8B2
      [0.95, 0.96, 0.98]  // White
    ] : [
      [0.051, 0.310, 0.180], // #0d4f2e Deep Forest
      [0.102, 0.478, 0.314], // #1a7a50 Rich Emerald
      [0.176, 0.667, 0.447], // #2daa72 Vivid Emerald
      [0.831, 0.647, 0.125], // #d4a520 Warm Gold
      [0.941, 0.784, 0.251], // #f0c840 Bright Gold
      [0.659, 0.831, 0.627]  // #a8d4a0 Mint pale green
    ];
    for (let i = 0; i < PCOUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: dark ? 0.045 : 0.060,
      vertexColors: true,
      transparent: true,
      opacity: dark ? 0.85 : 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ── Mouse Parallax ── */
    let mouseX = 0, mouseY = 0, camPX = 0, camPY = 0;
    const onMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Smooth Orbit Animation Loop ── */
    const ANGLE_STEP = 0.72;
    const ORBIT_RADIUS = 6.6;
    // Map ALL chapters (hero → service cards → contact/demo) evenly across
    // the full building height. chapters.length - 1 gives the total number of
    // scroll steps so chapter[0]=crown and chapter[N-1]=exactly ground level.
    const totalScrollSteps = Math.max(1, chapters.length - 1);
    let scrollRawSmooth = 0;
    let sceneOpacity = 1;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const curA = new THREE.Color(...initAccent);
    const targetA = new THREE.Color(...initAccent);

    let raf = 0;
    let previousFrame = 0;
    let windTime = 0;
    const animate = (t) => {
      raf = requestAnimationFrame(animate);
      const elapsed = t * 0.001;
      const deltaTime = previousFrame ? Math.min((t - previousFrame) * 0.001, 0.05) : 0;
      previousFrame = t;
      windTime += deltaTime;
      mat.uniforms.uTime.value = elapsed;

      // ── Live settings reads ────────────────────────────────────────────────
      const S = settingsRef.current;
      const treeScaleMult = S.treeScale ?? DEFAULT_SCENE_SETTINGS.treeScale;
      const windMult = S.windSpeed ?? DEFAULT_SCENE_SETTINGS.windSpeed;
      const buildingMult = S.buildingSpeed ?? DEFAULT_SCENE_SETTINGS.buildingSpeed;
      const particleMult = S.particleSize ?? DEFAULT_SCENE_SETTINGS.particleSize;

      // Trigger nature rebuild when count changes
      const curTrees = S.treeCount ?? lastTreeCount;
      const curGrass = S.grassCount ?? lastGrassCount;
      if (curTrees !== lastTreeCount || curGrass !== lastGrassCount) {
        scheduleNatureRebuild();
      }

      // Live particle size update
      pMat.size = (dark ? 0.045 : 0.060) * particleMult;

      if (!reduceMotion) {
        building.rotation.y += (dark ? 0.0009 : 0.0011) * buildingMult;

        if (natureGroup.visible && natureGroup.userData.treeData) {
          const { treeData, grassData } = natureGroup.userData;
          treeData.forEach((tree) => {
            // Live tree scale update
            const liveScale = tree.baseScale * treeScaleMult;
            tree.sprite.scale.set(liveScale, liveScale, 1);
            // Wind animation
            tree.sprite.position.x = tree.x + Math.sin(windTime * 0.85 * windMult + tree.phase) * 0.015 * windMult;
            tree.sprite.position.y = tree.baseY + Math.cos(windTime * 0.65 * windMult + tree.phase) * 0.008 * windMult;
          });
          if (grassData) {
            grassData.forEach((grass) => {
              grass.sprite.position.x = grass.x + Math.sin(windTime * 1.05 * windMult + grass.phase) * 0.012 * windMult;
            });
          }
        }
      }

      if (accentRef.current) {
        targetA.copy(accentRef.current);
      }
      curA.lerp(targetA, 0.04);
      mat.uniforms.uColorA.value.copy(curA);
      mat.uniforms.uColorB.value.setRGB(
        0.26 + curA.g * 0.2,
        0.55 + curA.b * 0.2,
        0.65
      );

      if (!reduceMotion) {
        const posAttr = pGeo.attributes.position;
        const drift = dark ? 0.0018 : 0.0025;
        for (let i = 0; i < PCOUNT; i++) {
          let y = posAttr.array[i * 3 + 1] + drift;
          if (y > 6.0) y = -6.0;
          posAttr.array[i * 3 + 1] = y;
        }
        posAttr.needsUpdate = true;
        points.rotation.y += 0.0004;
      }

      // Face the logo toward the viewer, then rotate it around its own axis.
      logoGroup.quaternion.copy(camera.quaternion);
      logoGroup.rotateY(elapsed * 0.72);

      const scrollRawTarget = window.scrollY / window.innerHeight;
      scrollRawSmooth += (scrollRawTarget - scrollRawSmooth) * 0.055;

      // scrollProgress: 0 = card 0 (hero, camera at crown top)
      //                 1 = card N-1 (contact/demo, camera at earth ground level)
      const scrollProgress = Math.min(Math.max(scrollRawSmooth / totalScrollSteps, 0), 1);

      const contactStageActive = chapters[activeRef.current]?.key === "contact";
      sceneOpacity += ((contactStageActive ? 0.85 : 1) - sceneOpacity) * 0.08;
      canvas.style.opacity = String(sceneOpacity);

      const orbitAngle = scrollRawSmooth * ANGLE_STEP;
      const orbitRadius = ORBIT_RADIUS + Math.sin(scrollRawSmooth * 0.4) * 0.25;
      // card 0 (hero): camera at building crown top
      // card N-1 (contact/demo): camera exactly at earth/ground level
      const camTopY = window.innerWidth < 760 ? 6.6 : 4.2;
      const camBottomY = window.innerWidth < 760 ? -4.5 : -5.08;
      const totalDescent = camTopY - camBottomY;

      camPX += (mouseX * 0.4 - camPX) * 0.04;
      camPY += (-mouseY * 0.28 - camPY) * 0.04;

      camera.position.x = Math.sin(orbitAngle) * orbitRadius + camPX;
      camera.position.z = Math.cos(orbitAngle) * orbitRadius;
      camera.position.y = camTopY - scrollProgress * totalDescent + camPY;

      // At hero, look up to frame crown & logo. By last card, look forward at ground.
      const entryFocusOffset = 0.75 - scrollProgress * 0.85;
      camera.lookAt(0, camera.position.y + entryFocusOffset, 0);

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      applyThemeRef.current = null;
      scene.traverse((obj) => {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material?.dispose();
      });
      renderer.dispose();
    };
  }, [chapters]);

  return (
    <>
      <canvas id="webgl" ref={canvasRef} />
      <div className="vignette" />
      <div className="grain" />
    </>
  );
}

export { WebGLBackground };
