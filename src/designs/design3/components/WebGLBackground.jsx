import { useEffect, useRef } from "react";

function WebGLBackground({ chapters, active, theme }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(active);
  const accentRef = useRef(null);

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

    const dark = theme !== "light";

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = dark ? 1.15 : 1.40;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(dark ? 0x050605 : 0xdaeef5, dark ? 0.012 : 0.007);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 6.2, 6.6);

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

        // Soft user-friendly light-theme palette:
        // Sky Blue   #6EC6D8  warmly lit glass facade
        // Sky Pale   #A8D8E8  upper tower catches sky
        // Warm White #F5F0E8  neutral mid-glass
        // Sage Mint  #7DC8B5  cool lower accent
        // Warm Coral #F0876A  warm sunrise base accent
        vec3 lightCoral  = vec3(0.941, 0.529, 0.416);  // #F0876A warm coral
        vec3 lightPeach  = vec3(0.957, 0.690, 0.494);  // #F4B07E warm peach
        vec3 lightSand   = vec3(0.961, 0.851, 0.659);  // #F5D9A8 soft sand
        vec3 lightSky    = vec3(0.431, 0.776, 0.847);  // #6EC6D8 sky blue
        vec3 lightPale   = vec3(0.659, 0.847, 0.910);  // #A8D8E8 pale sky

        // Diagonal gradient: warm coral (bottom-right) → pale sky (top-left)
        float normX = clamp((facadeCoord + 1.2) / 2.4, 0.0, 1.0);
        float normY = clamp((vWorldPos.y + 4.5) / 9.15, 0.0, 1.0);
        float gradT = clamp(normY * 0.55 + (1.0 - normX) * 0.45, 0.0, 1.0);

        vec3 lightNeon;
        if (gradT < 0.30) {
          lightNeon = mix(lightCoral, lightPeach, gradT / 0.30);
        } else if (gradT < 0.55) {
          lightNeon = mix(lightPeach, lightSand, (gradT - 0.30) / 0.25);
        } else if (gradT < 0.75) {
          lightNeon = mix(lightSand, lightSky, (gradT - 0.55) / 0.20);
        } else {
          lightNeon = mix(lightSky, lightPale, (gradT - 0.75) / 0.25);
        }

        vec3 teal = vec3(0.26, 0.63, 0.61);
        vec3 coral = vec3(0.91, 0.44, 0.26);
        vec3 darkNeon = mix(mix(teal, coral, normX), uColorA, 0.25);
        vec3 neon = mix(lightNeon, darkNeon, uDark);

        vec3 darkGlass = vec3(0.010, 0.014, 0.025) + uColorA * 0.025;
        // Light glass: bright, airy, slightly warm white with gentle color tint
        vec3 lightGlass = mix(vec3(0.96, 0.97, 0.98), lightNeon, 0.28);
        vec3 glass = mix(lightGlass, darkGlass, uDark);

        vec3 color = glass;
        color += neon * grid * (uDark > 0.5 ? 0.25 : 0.30);
        color += neon * fresnel * (uDark > 0.5 ? 0.55 : 0.45);
        color += (uDark > 0.5 ? vec3(0.16, 0.20, 0.28) : vec3(0.55, 0.68, 0.75)) * lightTerm * 0.18;
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
      color: dark ? 0x070b12 : 0xe8f4f8,  // airy pale sky in light
      specular: dark ? 0x17313d : 0x6ec6d8, // sky blue specular
      shininess: 95,
      transparent: true,
      opacity: dark ? 0.98 : 0.90
    });
    const crown = new THREE.Mesh(new THREE.BoxGeometry(1.90, 0.42, 1.28), crownMat);
    crown.position.y = 4.68;
    building.add(crown);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.13, 0.92), crownMat);
    roof.position.y = 4.96;
    building.add(roof);

    // 3. Spire Mast (Height = 0.72)
    const mastMat = new THREE.MeshBasicMaterial({
      color: dark ? 0x5cb8b2 : 0x6ec6d8, // soft sky blue in light
      transparent: true,
      opacity: dark ? 0.95 : 0.80,
      blending: THREE.AdditiveBlending
    });
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.024, 0.72, 8), mastMat);
    mast.position.y = 5.35;
    building.add(mast);

    // 4. Circular SigmaValue Logo Disc & Glowing Ring (Above Mast)
    const logoTexture = new THREE.TextureLoader().load('/logo.png');
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    const logoRadius = 0.38;
    const logoGeo = new THREE.CircleGeometry(logoRadius, 48);
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, 6.05, 0);
    scene.add(logoMesh);

    const logoRingGeo = new THREE.RingGeometry(logoRadius * 0.98, logoRadius * 1.05, 48);
    const logoRingMat = new THREE.MeshBasicMaterial({
      color: dark ? 0x5cb8b2 : 0x6ec6d8, // sky blue ring in light
      transparent: true,
      opacity: dark ? 0.92 : 0.75,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const logoRing = new THREE.Mesh(logoRingGeo, logoRingMat);
    logoRing.position.copy(logoMesh.position);
    scene.add(logoRing);

    // 5. Soft friendly palette for light, neon for dark
    // Light:  sky blue #6EC6D8, sage #7DC8B5, coral #F0876A, peach #F4B07E, lavender #A8C4E0
    // Dark:   original neon coral/teal palette
    const neonCoralMat = new THREE.MeshBasicMaterial({
      color: dark ? 0xe87042 : 0xf0876a, // warm coral (friendlier than neon)
      transparent: true,
      opacity: dark ? 0.78 : 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonPeachMat = new THREE.MeshBasicMaterial({
      color: dark ? 0xf0865e : 0xf4b07e, // warm peach
      transparent: true,
      opacity: dark ? 0.75 : 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonSandMat = new THREE.MeshBasicMaterial({
      color: dark ? 0xd0a27d : 0xf5d9a8, // soft sand
      transparent: true,
      opacity: dark ? 0.70 : 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonMintMat = new THREE.MeshBasicMaterial({
      color: dark ? 0x5cb8b2 : 0x7dc8b5, // sage mint (muted, friendly)
      transparent: true,
      opacity: dark ? 0.78 : 0.70,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const neonTealMat = new THREE.MeshBasicMaterial({
      color: dark ? 0x43a09b : 0x6ec6d8, // sky blue (replaces harsh teal)
      transparent: true,
      opacity: dark ? 0.82 : 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const dimCoralMat = neonCoralMat.clone();
    dimCoralMat.opacity = dark ? 0.30 : 0.30;
    const dimPeachMat = neonPeachMat.clone();
    dimPeachMat.opacity = dark ? 0.30 : 0.28;
    const dimSandMat = neonSandMat.clone();
    dimSandMat.opacity = dark ? 0.28 : 0.26;
    const dimMintMat = neonMintMat.clone();
    dimMintMat.opacity = dark ? 0.30 : 0.30;
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

    // Luminous Crown Roof Outline
    const roofEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.92, 0.44, 1.30)),
      new THREE.LineBasicMaterial({
        color: dark ? 0x5cb8b2 : 0x6ec6d8, // soft sky blue outline in light
        transparent: true,
        opacity: dark ? 0.65 : 0.55,
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
    addBaseOutline(2.75, 2.02, -4.59, dark ? 0x43a09b : 0x6ec6d8, 0.65); // sky blue
    addBaseOutline(3.05, 2.26, -4.615, dark ? 0x5cb8b2 : 0x7dc8b5, 0.50); // sage
    addBaseOutline(3.35, 2.50, -4.64, dark ? 0xe87042 : 0xf4b07e, 0.42); // warm peach

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

      // Ground glow disc — soft friendly rings
      [[5.5, 0xa8d8e8, 0.10], [4.0, 0x7dc8b5, 0.12], [2.8, 0xf5d9a8, 0.14], [1.8, 0xf4b07e, 0.16], [1.0, 0xf0876a, 0.18]].forEach(([r, color, op]) => {
        const rg = new THREE.RingGeometry(r - 0.6, r, 64);
        const rm = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
        
        // ── STRUCTURAL BEAM SYSTEM — soft friendly palette ──
        // Sky blue, sage, warm coral, peach, lavender
        const beamCoralMat  = new THREE.MeshBasicMaterial({ color: 0xf0876a, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
        const beamPeachMat  = new THREE.MeshBasicMaterial({ color: 0xf4b07e, transparent: true, opacity: 0.52, blending: THREE.AdditiveBlending, depthWrite: false });
        const beamSandMat   = new THREE.MeshBasicMaterial({ color: 0xf5d9a8, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending, depthWrite: false });
        const beamMintMat   = new THREE.MeshBasicMaterial({ color: 0x7dc8b5, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
        const beamTealMat   = new THREE.MeshBasicMaterial({ color: 0x6ec6d8, transparent: true, opacity: 0.58, blending: THREE.AdditiveBlending, depthWrite: false });
        
        const ring = new THREE.Mesh(rg, rm);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -5.08;
        scene.add(ring);
      });

      // ── 4. Corner Column Node Caps — soft friendly colours ──
      // Octahedrons at major beam–column intersections
      const nodeColors = [0x6ec6d8, 0xf0876a, 0x7dc8b5, 0xf4b07e]; // sky, coral, sage, peach
      const orbPositions = [[-1.145, 0.755], [1.145, 0.755], [-1.145, -0.755], [1.145, -0.755]];
      orbPositions.forEach(([x, z], i) => {
        const orbGeo = new THREE.SphereGeometry(0.07, 12, 12);
        const orbMat = new THREE.MeshBasicMaterial({
          color: nodeColors[i],
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        [-4.2, -2.8, -1.4, 0, 1.4, 2.8, 4.2].forEach(y => {
          const orb = new THREE.Mesh(orbGeo, orbMat);
          orb.position.set(x, y, z);
          building.add(orb);
        });
      });

      // Floating neon diamond accents mid-tower
      [[0, 0, 0.78], [0, 0, -0.78], [1.15, 0, 0], [-1.15, 0, 0]].forEach(([x, y, z], i) => {
        const diamondGeo = new THREE.OctahedronGeometry(0.085, 0);
        const diamondMat = new THREE.MeshBasicMaterial({
          color: [0xf0876a, 0x6ec6d8, 0xf5d9a8, 0x7dc8b5][i],
          transparent: true,
          opacity: 0.75,
          blending: THREE.AdditiveBlending,
          wireframe: true
        });
        const diamond = new THREE.Mesh(diamondGeo, diamondMat);
        diamond.position.set(x, y, z);
        building.add(diamond);
      });
    }

    /* ── Ambient Particle Field ── */
    const PCOUNT = window.innerWidth < 760 ? 260 : 650;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PCOUNT * 3);
    const colors = new Float32Array(PCOUNT * 3);
    // Light: exact 5-stop neon brand colors; Dark: classic coral/teal palette
    const palette = dark ? [
      [0.91, 0.44, 0.26], // Coral #E87042
      [0.94, 0.64, 0.49], // Peach #F0865E
      [0.26, 0.63, 0.61], // Teal #43A09B
      [0.36, 0.72, 0.70], // Seafoam #5CB8B2
      [0.95, 0.96, 0.98]  // White
    ] : [
      [0.431, 0.776, 0.847], // #6EC6D8 Sky Blue
      [0.490, 0.784, 0.709], // #7DC8B5 Sage Mint
      [0.941, 0.529, 0.415], // #F0876A Warm Coral
      [0.956, 0.690, 0.494], // #F4B07E Warm Peach
      [0.960, 0.850, 0.658], // #F5D9A8 Sand
      [0.658, 0.768, 0.878]  // #A8C4E0 Lavender Tint
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
    let scrollRawSmooth = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const curA = new THREE.Color(...initAccent);
    const targetA = new THREE.Color(...initAccent);

    let raf = 0;
    const animate = (t) => {
      raf = requestAnimationFrame(animate);
      const elapsed = t * 0.001;
      mat.uniforms.uTime.value = elapsed;

      if (!reduceMotion) {
        // Slightly faster rotation in light for more dynamism
        building.rotation.y += dark ? 0.0009 : 0.0011;
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

      // Pulse the logo ring scale in light theme
      if (!dark) {
        const pulse = 1.0 + 0.08 * Math.sin(elapsed * 1.8);
        logoRing.scale.set(pulse, pulse, pulse);
      }

      // Keep circular logo billboard facing camera smoothly
      logoMesh.quaternion.copy(camera.quaternion);
      logoRing.quaternion.copy(camera.quaternion);

      const scrollRawTarget = window.scrollY / window.innerHeight;
      scrollRawSmooth += (scrollRawTarget - scrollRawSmooth) * 0.055;

      const totalChapters = Math.max(1, chapters.length - 1);
      const scrollProgress = Math.min(Math.max(scrollRawSmooth / totalChapters, 0), 1);

      const orbitAngle = scrollRawSmooth * ANGLE_STEP;
      const orbitRadius = ORBIT_RADIUS + Math.sin(scrollRawSmooth * 0.4) * 0.25;
      const camTopY = window.innerWidth < 760 ? 6.6 : 6.2;
      const camBottomY = -4.5;
      const totalDescent = camTopY - camBottomY;

      camPX += (mouseX * 0.4 - camPX) * 0.04;
      camPY += (-mouseY * 0.28 - camPY) * 0.04;

      camera.position.x = Math.sin(orbitAngle) * orbitRadius + camPX;
      camera.position.z = Math.cos(orbitAngle) * orbitRadius;
      camera.position.y = camTopY - scrollProgress * totalDescent + camPY;
      camera.lookAt(0, camera.position.y - 0.7, 0);

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material?.dispose();
      });
      renderer.dispose();
    };
  }, [chapters, theme]);

  return (
    <>
      <canvas id="webgl" ref={canvasRef} />
      <div className="vignette" />
      <div className="grain" />
    </>
  );
}

export { WebGLBackground };
