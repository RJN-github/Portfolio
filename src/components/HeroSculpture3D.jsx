import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const _vec3 = new THREE.Vector3();
const _targetVec = new THREE.Vector3();

function detectSoftwareWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createCodeHaloTexture(maxAnisotropy) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 1024, 128);
    ctx.fillStyle = 'rgba(24, 24, 28, 0.9)';
    ctx.fillRect(0, 18, 1024, 92);

    ctx.strokeStyle = 'rgba(225, 29, 72, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(1024, 20);
    ctx.moveTo(0, 108);
    ctx.lineTo(1024, 108);
    ctx.stroke();

    ctx.font = '600 28px monospace';
    ctx.textBaseline = 'middle';
    const tokens = [
      '</> REACT',
      'MERN STACK',
      'NEXT.JS',
      'NODE.JS',
      'MONGODB',
      'WORDPRESS',
      'MYSQL',
      'SOCKET.IO',
    ];
    let x = 26;
    tokens.forEach((token, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? '#FAFAF9' : '#FB7185';
      ctx.fillText(token, x, 64);
      x += 126;
    });
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = Math.min(8, maxAnisotropy || 1);
  return tex;
}

const MODES = [
  { id: 'trinity', label: 'Trinity' },
  { id: 'code', label: 'Code </>' },
  { id: 'football', label: 'Football' },
  { id: 'valorant', label: 'Valorant' },
  { id: 'explode', label: 'Explode' },
  { id: 'wireframe', label: 'Wireframe' },
];

const MODE_CAPTIONS = {
  trinity: 'Web Dev · Football · Valorant fused into one kinetic core',
  code: 'Beveled </> syntax monoliths & stack telemetry band',
  football: 'Faceted 12-panel geodesic match sphere & pitch gimbal',
  valorant: 'Tactical V-wing blades & precision 4-point crosshair reticle',
  explode: 'Spatial layer separation across all 3 disciplines',
  wireframe: 'CAD mesh topology across custom procedural geometries',
};

const HeroSculpture3D = () => {
  const mountRef = useRef(null);
  const modeRef = useRef('trinity');
  const [mode, setMode] = useState('trinity');
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSoftwareGl = detectSoftwareWebGL();

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      queueMicrotask(() => setContextLost(true));
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const handleContextLost = (e) => {
      e.preventDefault();
      setContextLost(true);
    };
    const handleContextRestored = () => setContextLost(false);
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.042);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.68;

    // 3-Point Warm/Cool Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0x94a3b8, 0x18181b, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1e6, 2.3);
    keyLight.position.set(4, 6, 5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -3.5;
      keyLight.shadow.camera.right = 3.5;
      keyLight.shadow.camera.top = 3.5;
      keyLight.shadow.camera.bottom = -3.5;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe11d48, 2.5);
    rimLight.position.set(-4.5, 2.5, -3.5);
    scene.add(rimLight);

    const accentPoint = new THREE.PointLight(0xfb7185, 2.4, 12, 2);
    accentPoint.position.set(0, 0.25, 2.6);
    scene.add(accentPoint);

    // Materials (varied roughness >= 0.25 contrast)
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x16161b,
      roughness: 0.76,
      metalness: 0.16,
    });
    const brushedTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0xe4e4e7,
      roughness: 0.2,
      metalness: 0.92,
      clearcoat: 0.45,
      clearcoatRoughness: 0.22,
    });
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x272730,
      roughness: 0.42,
      metalness: 0.8,
    });
    const vermilionCoreMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0x881337,
      emissiveIntensity: 0.75,
      roughness: 0.26,
      metalness: 0.76,
    });
    const codeHaloTex = createCodeHaloTexture(renderer.capabilities.getMaxAnisotropy());
    const codeHaloMat = new THREE.MeshStandardMaterial({
      map: codeHaloTex,
      transparent: true,
      opacity: 0.92,
      roughness: 0.35,
      metalness: 0.4,
      side: THREE.DoubleSide,
    });

    const wireframeMaterials = [
      obsidianMat,
      brushedTitaniumMat,
      gunmetalMat,
      vermilionCoreMat,
      codeHaloMat,
    ];

    const assembly = new THREE.Group();
    scene.add(assembly);

    const disposables = [];
    const explodableParts = [];
    const registerPart = (obj, restPos, explodeOffset) => {
      obj.position.copy(restPos);
      assembly.add(obj);
      explodableParts.push({
        obj,
        restPos: restPos.clone(),
        explodeOffset: explodeOffset.clone(),
      });
    };

    // 1. Stepped Base Plinth (LatheGeometry)
    const plinthPoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.42, 0),
      new THREE.Vector2(1.36, 0.14),
      new THREE.Vector2(1.1, 0.2),
      new THREE.Vector2(1.02, 0.3),
      new THREE.Vector2(0, 0.3),
    ];
    const plinthGeo = new THREE.LatheGeometry(plinthPoints, 8);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, obsidianMat);
    plinthMesh.castShadow = !isSoftwareGl;
    plinthMesh.receiveShadow = !isSoftwareGl;
    registerPart(plinthMesh, new THREE.Vector3(0, -1.65, 0), new THREE.Vector3(0, -0.5, 0));

    // 2. FOOTBALL CORE — Faceted Geodesic Match Ball (Dodecahedron + 12 Pentagon Panels + Seam Rings)
    const footballGroup = new THREE.Group();
    const ballBaseGeo = new THREE.IcosahedronGeometry(0.68, 2);
    const panelGeo = new THREE.CylinderGeometry(0.21, 0.23, 0.055, 5);
    const seamRingGeo = new THREE.TorusGeometry(0.695, 0.014, 8, 48);
    disposables.push(ballBaseGeo, panelGeo, seamRingGeo);

    const ballCore = new THREE.Mesh(ballBaseGeo, brushedTitaniumMat);
    ballCore.castShadow = !isSoftwareGl;
    footballGroup.add(ballCore);

    // 12 pentagonal dark-obsidian panels oriented on dodecahedron vertices
    const dodecaGeo = new THREE.DodecahedronGeometry(0.66, 0);
    const posAttr = dodecaGeo.attributes.position;
    const seenKeys = new Set();
    const uniqueDirs = [];
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const key = `${vx.toFixed(2)},${vy.toFixed(2)},${vz.toFixed(2)}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueDirs.push(new THREE.Vector3(vx, vy, vz).normalize());
      }
    }
    dodecaGeo.dispose();

    const upAxis = new THREE.Vector3(0, 1, 0);
    uniqueDirs.forEach((dir) => {
      const panel = new THREE.Mesh(panelGeo, obsidianMat);
      panel.position.copy(dir).multiplyScalar(0.665);
      panel.quaternion.setFromUnitVectors(upAxis, dir);
      footballGroup.add(panel);
    });

    // Stitched vermilion seam rings around the football core
    [
      [0, 0, 0],
      [Math.PI / 2, Math.PI / 5, 0],
      [Math.PI / 3, 0, Math.PI / 2],
    ].forEach(([rx, ry, rz]) => {
      const seam = new THREE.Mesh(seamRingGeo, vermilionCoreMat);
      seam.rotation.set(rx, ry, rz);
      footballGroup.add(seam);
    });
    registerPart(footballGroup, new THREE.Vector3(0, 0.02, 0), new THREE.Vector3(0, 0.2, 0));

    // 3. CODING / WEB DEV — Beveled < / > Angle Monoliths + Procedural Syntax Halo Band
    const bracketShape = new THREE.Shape();
    bracketShape.moveTo(0.22, 0.56);
    bracketShape.lineTo(0.08, 0.64);
    bracketShape.lineTo(-0.34, 0.08);
    bracketShape.lineTo(-0.34, -0.08);
    bracketShape.lineTo(0.08, -0.64);
    bracketShape.lineTo(0.22, -0.56);
    bracketShape.lineTo(-0.14, 0);
    bracketShape.closePath();

    const bracketGeo = new THREE.ExtrudeGeometry(bracketShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.024,
      bevelThickness: 0.024,
    });
    bracketGeo.center();
    disposables.push(bracketGeo);

    const codeGroup = new THREE.Group();
    const leftBracket = new THREE.Mesh(bracketGeo, brushedTitaniumMat);
    leftBracket.position.set(-1.12, 0.05, 0);
    const rightBracket = new THREE.Mesh(bracketGeo, brushedTitaniumMat);
    rightBracket.position.set(1.12, 0.05, 0);
    rightBracket.rotation.y = Math.PI;

    // Code Syntax Telemetry Cylinder Band
    const haloGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.24, 48, 1, true);
    disposables.push(haloGeo);
    const syntaxHalo = new THREE.Mesh(haloGeo, codeHaloMat);
    syntaxHalo.rotation.x = Math.PI * 0.08;
    syntaxHalo.rotation.z = -Math.PI * 0.06;

    codeGroup.add(leftBracket, rightBracket, syntaxHalo);
    registerPart(codeGroup, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0.52));

    // 4. VALORANT — Twin Chamfered Tactical V-Wing Blades & Precision 4-Point Crosshair Reticle
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, -0.95);
    wingShape.lineTo(0.22, -0.45);
    wingShape.lineTo(0.14, 0.55);
    wingShape.lineTo(0.32, 0.96);
    wingShape.lineTo(0.04, 0.88);
    wingShape.lineTo(-0.14, 0.2);
    wingShape.lineTo(-0.12, -0.68);
    wingShape.closePath();

    const wingGeo = new THREE.ExtrudeGeometry(wingShape, {
      depth: 0.09,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    wingGeo.center();
    disposables.push(wingGeo);

    const valorantGroup = new THREE.Group();
    const wingLeft = new THREE.Mesh(wingGeo, gunmetalMat);
    wingLeft.position.set(-1.38, 0.1, -0.15);
    wingLeft.rotation.z = 0.22;

    const wingRight = new THREE.Mesh(wingGeo, gunmetalMat);
    wingRight.position.set(1.38, 0.1, -0.15);
    wingRight.rotation.y = Math.PI;
    wingRight.rotation.z = 0.22;

    // Crosshair Reticle Ring + 4 Cardinal Crimson Ticks
    const reticleRingGeo = new THREE.TorusGeometry(1.26, 0.032, 14, 64);
    const tickGeo = new THREE.BoxGeometry(0.055, 0.24, 0.055);
    disposables.push(reticleRingGeo, tickGeo);

    const reticleRing = new THREE.Mesh(reticleRingGeo, vermilionCoreMat);
    valorantGroup.add(wingLeft, wingRight, reticleRing);

    [
      [0, 1.26, 0, 0],
      [0, -1.26, 0, 0],
      [1.26, 0, 0, Math.PI / 2],
      [-1.26, 0, 0, Math.PI / 2],
    ].forEach(([tx, ty, tz, rz]) => {
      const tick = new THREE.Mesh(tickGeo, vermilionCoreMat);
      tick.position.set(tx, ty, tz);
      tick.rotation.z = rz;
      valorantGroup.add(tick);
    });

    registerPart(valorantGroup, new THREE.Vector3(0, 0.05, 0), new THREE.Vector3(0, 0.35, -0.48));

    // 5. Orbital Satellite Nodes (InstancedMesh)
    const nodeGeo = new THREE.OctahedronGeometry(0.052, 0);
    disposables.push(nodeGeo);
    const nodeCount = 24;
    const orbitalNodes = new THREE.InstancedMesh(nodeGeo, brushedTitaniumMat, nodeCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < nodeCount; i++) {
      const t = (i / nodeCount) * Math.PI * 2;
      const r = 1.95;
      dummy.position.set(Math.cos(t) * r, Math.sin(t * 2) * 0.32, Math.sin(t) * r);
      const s = 0.78 + (i % 3) * 0.22;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      orbitalNodes.setMatrixAt(i, dummy.matrix);
    }
    orbitalNodes.computeBoundingSphere();
    assembly.add(orbitalNodes);

    // Ground Contact Shadow Disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 6, 64, 64, 62);
      grad.addColorStop(0, 'rgba(0,0,0,0.68)');
      grad.addColorStop(0.55, 'rgba(0,0,0,0.22)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.CircleGeometry(1.95, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.78,
    });
    disposables.push(shadowTex, shadowGeo, shadowMat);
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.86;
    scene.add(shadowPlane);

    // Subtle Pointer Parallax Tilt
    let targetTiltX = 0;
    let targetTiltY = 0;
    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltY = nx * 0.2;
      targetTiltX = ny * 0.14;
    };
    renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 520;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const startTime = performance.now();
    let lastTime = startTime;
    let explodeFactor = 0;
    let footballScale = 1;
    let codeScale = 1;
    let valorantScale = 1;
    let frameId = 0;
    let disposed = false;

    const afterDraw = (cb) => {
      const gl = renderer.getContext();
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) {
            if (sync) gl.deleteSync(sync);
            return;
          }
          const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (status === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    };

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;
      const currentMode = modeRef.current;

      const isWire = currentMode === 'wireframe';
      wireframeMaterials.forEach((mat) => {
        if (mat.wireframe !== isWire) mat.wireframe = isWire;
      });

      const targetExplode = currentMode === 'explode' ? 1 : 0;
      explodeFactor = THREE.MathUtils.damp(explodeFactor, targetExplode, 6, dt);

      const targetFootballScale = currentMode === 'football' ? 1.38 : currentMode === 'trinity' ? 1 : 0.72;
      const targetCodeScale = currentMode === 'code' ? 1.18 : currentMode === 'trinity' ? 1 : 0.8;
      const targetValorantScale = currentMode === 'valorant' ? 1.16 : currentMode === 'trinity' ? 1 : 0.82;

      footballScale = THREE.MathUtils.damp(footballScale, targetFootballScale, 6, dt);
      codeScale = THREE.MathUtils.damp(codeScale, targetCodeScale, 6, dt);
      valorantScale = THREE.MathUtils.damp(valorantScale, targetValorantScale, 6, dt);

      footballGroup.scale.setScalar(footballScale);
      codeGroup.scale.setScalar(codeScale);
      valorantGroup.scale.setScalar(valorantScale);

      explodableParts.forEach((part) => {
        _vec3.copy(part.restPos).addScaledVector(part.explodeOffset, explodeFactor);
        if (currentMode === 'code' && part.obj === codeGroup) {
          _targetVec.set(0, 0, 0.45);
          _vec3.add(_targetVec);
        }
        part.obj.position.copy(_vec3);
      });

      if (!prefersReducedMotion) {
        assembly.rotation.y += dt * 0.24;
        assembly.rotation.x = THREE.MathUtils.damp(assembly.rotation.x, targetTiltX, 4, dt);
        assembly.rotation.z = THREE.MathUtils.damp(assembly.rotation.z, -targetTiltY * 0.5, 4, dt);

        footballGroup.rotation.y += dt * (currentMode === 'football' ? 1.15 : 0.48);
        footballGroup.rotation.x = Math.sin(elapsed * 0.7) * 0.22;

        codeHaloTex.offset.x = (elapsed * 0.06) % 1;
        syntaxHalo.rotation.y -= dt * 0.25;
        valorantGroup.rotation.y = Math.sin(elapsed * 0.55) * 0.16;
        reticleRing.rotation.z += dt * (currentMode === 'valorant' ? 0.8 : 0.25);
        orbitalNodes.rotation.y -= dt * 0.18;
      }

      controls.update();
      renderer.render(scene, camera);

      if (prefersReducedMotion) return;
      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      controls.dispose();
      disposables.forEach((item) => item.dispose());
      codeHaloTex.dispose();
      wireframeMaterials.forEach((m) => m.dispose());
      envTex.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[430px] sm:h-[460px] lg:h-[520px] rounded-2xl border border-white/10 bg-[#111115] overflow-hidden select-none"
      data-cursor="Drag 3D"
    >
      {/* Subtle Architectural Radial Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(225, 29, 72, 0.15) 0%, rgba(17, 17, 21, 0.42) 55%, #09090B 100%)',
        }}
      />

      {/* Quiet Discipline Legend Top-Left */}
      <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <p className="text-[11px] font-mono text-[#A1A1AA] truncate">
          {MODE_CAPTIONS[mode]}
        </p>
        <span className="text-[11px] font-mono text-[#71717A] whitespace-nowrap shrink-0">
          3D Kinetic Core
        </span>
      </div>

      {/* Isolated WebGL Mount Ref (Zero backdrop-blur over WebGL) */}
      <div
        ref={mountRef}
        data-testid="hero-3d-canvas"
        aria-label="Interactive 3D kinetic sculpture blending coding, football, and Valorant motifs"
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {contextLost && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#111115]">
          <div className="w-24 h-24 rounded-full border border-[#E11D48]/50 flex items-center justify-center mb-4">
            <div className="w-10 h-10 rotate-45 border-2 border-[#E11D48]" />
          </div>
          <p className="font-display text-lg font-semibold text-white">Code · Football · Valorant</p>
          <p className="text-xs text-[#A1A1AA] mt-1 max-w-xs">
            Interactive 3D viewport paused when hardware WebGL is unavailable.
          </p>
        </div>
      )}

      {/* Responsive Grid / Flex Bottom Control Dock (Zero Horizontal Scrollbar, Zero Truncation) */}
      <div
        data-testid="hero-3d-controls"
        className="absolute bottom-3 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-20 grid grid-cols-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-1 p-1 rounded-xl bg-[#09090B]/92 border border-white/15 sm:w-max sm:max-w-[calc(100%-1.5rem)]"
      >
        {MODES.map((item) => {
          const active = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              aria-pressed={active}
              className={`px-2 sm:px-3 py-1.5 text-[11px] font-medium rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#E11D48] text-white'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSculpture3D;
