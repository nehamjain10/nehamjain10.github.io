const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
const HOME_VARIANTS = ["survey", "splat"];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function chooseMeshVariant(canvas, mode) {
  if (mode !== "home") return "survey";

  const requested = new URLSearchParams(window.location.search).get("mesh");
  if (HOME_VARIANTS.includes(requested)) return requested;

  const variant = HOME_VARIANTS[Math.floor(Math.random() * HOME_VARIANTS.length)];
  canvas.dataset.meshVariant = variant;
  return variant;
}

function withCanvases(callback) {
  document.querySelectorAll("[data-mesh-scene]").forEach((canvas) => {
    callback(canvas, canvas.dataset.meshScene || "page");
  });
}

function resizeCanvas2d(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(320, Math.floor(rect.width * ratio));
  const height = Math.max(320, Math.floor(rect.height * ratio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  return { width, height, ratio };
}

function drawFallbackMesh(canvas, mode) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const variant = chooseMeshVariant(canvas, mode);
  const fallbackColors = [
    "rgba(185, 148, 90, 0.34)",
    "rgba(125, 156, 163, 0.3)",
    "rgba(155, 109, 116, 0.24)",
    "rgba(243, 238, 228, 0.18)"
  ];

  function draw(time = 0) {
    const { width, height } = resizeCanvas2d(canvas);
    const isCompact = width < 760;
    const countX = mode === "home" ? 12 : 9;
    const countY = mode === "home" ? 8 : 6;
    const isSplat = variant === "splat";
    const centerX = isSplat ? (isCompact ? width * 0.62 : width * 0.55) : (isCompact ? width * 0.73 : width * 0.71);
    const centerY = isSplat ? (isCompact ? height * 0.47 : height * 0.43) : (isCompact ? height * 0.48 : height * 0.42);
    const fieldWidth = isSplat ? (isCompact ? width * 0.9 : width * 0.62) : (isCompact ? width * 0.72 : width * 0.44);
    const fieldHeight = isSplat ? (isCompact ? height * 0.56 : height * 0.58) : (isCompact ? height * 0.46 : height * 0.48);
    const stepX = fieldWidth / (countX - 1);
    const stepY = fieldHeight / (countY - 1);
    const angle = -0.18 + Math.sin(time * 0.00025) * 0.035;
    const points = [];

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(13, 15, 14, 0.52)";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(centerX, centerY);
    context.rotate(angle);

    if (variant === "splat") {
      const breath = 1 + Math.sin(time * 0.0007) * 0.075;
      for (let index = 0; index < 220; index += 1) {
        const theta = index * 2.399 + time * 0.00011;
        const radius = fieldWidth * (0.04 + (index % 53) / 72) * breath;
        const x = Math.cos(theta) * radius * (0.82 + Math.sin(index) * 0.09) - fieldWidth * 0.04;
        const y = Math.sin(theta) * radius * (0.44 + Math.cos(index * 0.7) * 0.04);
        const size = 7 + (index % 9) * 2.1;
        const gradient = context.createRadialGradient(x, y, 0, x, y, size);
        const color = index % 3 === 0 ? "185, 148, 90" : index % 3 === 1 ? "125, 156, 163" : "243, 238, 228";
        gradient.addColorStop(0, `rgba(${color}, 0.44)`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fill();
      }

      context.lineWidth = Math.max(0.9, width * 0.0007);
      for (let index = 0; index < 30; index += 1) {
        const theta = index * 0.63 + time * 0.00012;
        const x = Math.cos(theta) * fieldWidth * 0.42 - fieldWidth * 0.02;
        const y = Math.sin(theta) * fieldHeight * 0.22;
        context.strokeStyle = index % 2 === 0 ? "rgba(243, 238, 228, 0.22)" : "rgba(125, 156, 163, 0.2)";
        context.beginPath();
        context.moveTo(-fieldWidth * 0.5, fieldHeight * 0.35);
        context.lineTo(x, y);
        context.stroke();
      }

      for (let ring = 0; ring < 5; ring += 1) {
        context.strokeStyle = ring % 2 === 0 ? "rgba(185, 148, 90, 0.26)" : "rgba(125, 156, 163, 0.22)";
        context.beginPath();
        context.ellipse(
          -fieldWidth * 0.05,
          -fieldHeight * 0.02,
          fieldWidth * (0.2 + ring * 0.055 + Math.sin(time * 0.0005 + ring) * 0.012),
          fieldHeight * (0.09 + ring * 0.027),
          -0.42 + ring * 0.2 + Math.sin(time * 0.00028) * 0.08,
          0,
          Math.PI * 2
        );
        context.stroke();
      }

      canvas.dataset.meshRendered = "fallback";
      canvas.dataset.meshVariant = variant;
      context.restore();
      if (!prefersReducedMotion) requestAnimationFrame(draw);
      return;
    }

    for (let y = 0; y < countY; y += 1) {
      for (let x = 0; x < countX; x += 1) {
        const wave = Math.sin(x * 0.9 + time * 0.00045) + Math.cos(y * 1.1 + time * 0.0003);
        points.push({
          x: x * stepX - fieldWidth / 2 + wave * 8,
          y: y * stepY - fieldHeight / 2 + Math.sin(x + y + time * 0.00038) * 10
        });
      }
    }

    context.lineWidth = Math.max(0.8, width * 0.00078);
    for (let y = 0; y < countY - 1; y += 1) {
      for (let x = 0; x < countX - 1; x += 1) {
        const i = y * countX + x;
        const a = points[i];
        const b = points[i + 1];
        const c = points[i + countX];
        context.strokeStyle = fallbackColors[(x + y) % fallbackColors.length];
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.lineTo(c.x, c.y);
        context.closePath();
        context.stroke();
      }
    }

    context.lineWidth = Math.max(1, width * 0.001);
    for (let ring = 0; ring < 7; ring += 1) {
      const pulse = Math.sin(time * 0.00028 + ring * 0.8) * 0.03;
      context.strokeStyle = ring % 2 === 0 ? "rgba(125, 156, 163, 0.36)" : "rgba(243, 238, 228, 0.18)";
      context.beginPath();
      context.ellipse(
        fieldWidth * 0.12,
        -fieldHeight * 0.08,
        fieldWidth * (0.16 + ring * 0.034 + pulse),
        fieldHeight * (0.08 + ring * 0.019),
        0.6 + ring * 0.08,
        0,
        Math.PI * 2
      );
      context.stroke();
    }

    context.fillStyle = "rgba(243, 238, 228, 0.42)";
    for (let index = 0; index < 34; index += 1) {
      const theta = index * 1.91 + time * 0.00012;
      const radius = fieldWidth * (0.16 + (index % 11) * 0.027);
      context.fillRect(Math.cos(theta) * radius, Math.sin(theta) * radius * 0.52, 1.4, 1.4);
    }

    context.restore();

    canvas.dataset.meshRendered = "fallback";
    canvas.dataset.meshVariant = variant;
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  draw();
  window.addEventListener("resize", () => draw(), { passive: true });
}

function warpGeometry(geometry, amplitude) {
  const position = geometry.attributes.position;
  const vertex = { x: 0, y: 0, z: 0 };

  for (let index = 0; index < position.count; index += 1) {
    vertex.x = position.getX(index);
    vertex.y = position.getY(index);
    vertex.z = position.getZ(index);

    const ripple = Math.sin(vertex.x * 2.3) * Math.cos(vertex.y * 1.7) + Math.sin(vertex.z * 2.1);
    const scale = 1 + ripple * amplitude;
    position.setXYZ(index, vertex.x * scale, vertex.y * scale, vertex.z * scale);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
}

function createContourLine(THREE, radiusX, radiusY, z, segments, phase, color, opacity) {
  const points = [];
  for (let index = 0; index <= segments; index += 1) {
    const theta = (index / segments) * Math.PI * 2;
    const taper = 1 + Math.sin(theta * 3 + phase) * 0.035;
    points.push(new THREE.Vector3(
      Math.cos(theta) * radiusX * taper,
      Math.sin(theta) * radiusY * (1 + Math.cos(theta * 2 + phase) * 0.025),
      z + Math.sin(theta * 2 + phase) * 0.035
    ));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity
    })
  );

  line.userData.phase = phase;
  line.material.userData.baseOpacity = opacity;
  return line;
}

function createSurveyField(THREE, mode) {
  const root = new THREE.Group();
  const field = new THREE.Group();
  const contours = new THREE.Group();
  const particles = new THREE.Group();
  root.add(field, contours, particles);

  const surfaceGeometry = new THREE.PlaneGeometry(
    mode === "home" ? 3.55 : 2.9,
    mode === "home" ? 2.35 : 1.9,
    mode === "home" ? 46 : 34,
    mode === "home" ? 28 : 20
  );
  const surfacePosition = surfaceGeometry.attributes.position;
  const basePositions = new Float32Array(surfacePosition.array.length);

  for (let index = 0; index < surfacePosition.count; index += 1) {
    const x = surfacePosition.getX(index);
    const y = surfacePosition.getY(index);
    const z = Math.sin(x * 0.95) * 0.16 + Math.cos(y * 1.3) * 0.11 + Math.sin((x + y) * 0.7) * 0.08;
    surfacePosition.setZ(index, z);
    basePositions[index * 3] = x;
    basePositions[index * 3 + 1] = y;
    basePositions[index * 3 + 2] = z;
  }
  surfacePosition.needsUpdate = true;
  surfaceGeometry.computeVertexNormals();

  const surfaceFill = new THREE.Mesh(
    surfaceGeometry,
    new THREE.MeshBasicMaterial({
      color: 0xb9945a,
      transparent: true,
      opacity: mode === "home" ? 0.045 : 0.035,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );

  const surfaceWire = new THREE.Mesh(
    surfaceGeometry,
    new THREE.MeshBasicMaterial({
      color: 0xb9945a,
      wireframe: true,
      transparent: true,
      opacity: mode === "home" ? 0.3 : 0.22
    })
  );

  field.add(surfaceFill, surfaceWire);
  field.position.set(-0.08, -0.24, -0.45);
  field.rotation.set(-0.58, 0.24, -0.12);

  const contourCount = mode === "home" ? 7 : 5;
  for (let index = 0; index < contourCount; index += 1) {
    const line = createContourLine(
      THREE,
      0.88 + index * 0.22,
      0.34 + index * 0.085,
      -0.28 + index * 0.055,
      160,
      index * 0.72,
      index % 2 === 0 ? 0x7d9ca3 : 0xc8bfb0,
      mode === "home" ? 0.44 : 0.26
    );
    line.rotation.set(0.98 + index * 0.025, -0.36, 0.18 + index * 0.16);
    line.position.set(0.18, 0.62, 0.16 + index * 0.025);
    contours.add(line);
  }

  const pointCount = mode === "home" ? 160 : 90;
  const pointPositions = new Float32Array(pointCount * 3);
  for (let index = 0; index < pointCount; index += 1) {
    const band = index / pointCount;
    const radius = 1.1 + Math.random() * (mode === "home" ? 2.2 : 1.6);
    const theta = Math.random() * Math.PI * 2;
    pointPositions[index * 3] = Math.cos(theta) * radius * 0.9 + 0.1;
    pointPositions[index * 3 + 1] = Math.sin(theta) * radius * 0.55 + (band - 0.5) * 0.45;
    pointPositions[index * 3 + 2] = -0.9 + Math.random() * 1.8;
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  const points = new THREE.Points(
    pointsGeometry,
    new THREE.PointsMaterial({
      color: 0xf3eee4,
      size: mode === "home" ? 0.018 : 0.014,
      transparent: true,
      opacity: mode === "home" ? 0.46 : 0.28,
      depthWrite: false
    })
  );
  particles.add(points);

  return {
    type: "survey",
    root,
    field,
    contours,
    particles,
    surfaceGeometry,
    basePositions
  };
}

function createGaussianTexture(THREE) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 96;
  textureCanvas.height = 96;
  const context = textureCanvas.getContext("2d");
  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, "rgba(255,255,255,0.96)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.42)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.needsUpdate = true;
  return texture;
}

function createRayBundle(THREE, source, targets, color, opacity) {
  const positions = new Float32Array(targets.length * 6);
  targets.forEach((target, index) => {
    positions[index * 6] = source.x;
    positions[index * 6 + 1] = source.y;
    positions[index * 6 + 2] = source.z;
    positions[index * 6 + 3] = target.x;
    positions[index * 6 + 4] = target.y;
    positions[index * 6 + 5] = target.z;
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity
  });
  material.userData.baseOpacity = opacity;

  return new THREE.LineSegments(
    geometry,
    material
  );
}

function createGaussianSplatField(THREE, mode) {
  const root = new THREE.Group();
  const splats = new THREE.Group();
  const rays = new THREE.Group();
  const covariance = new THREE.Group();
  root.add(splats, rays, covariance);

  const texture = createGaussianTexture(THREE);
  const clusters = [
    { count: mode === "home" ? 164 : 64, color: 0xb9945a, size: 0.2, opacity: 0.46, center: new THREE.Vector3(-0.68, -0.14, 0.04), scale: new THREE.Vector3(1.16, 0.42, 0.46) },
    { count: mode === "home" ? 138 : 56, color: 0x7d9ca3, size: 0.17, opacity: 0.41, center: new THREE.Vector3(0.28, 0.26, -0.08), scale: new THREE.Vector3(0.92, 0.35, 0.38) },
    { count: mode === "home" ? 94 : 42, color: 0xf3eee4, size: 0.11, opacity: 0.3, center: new THREE.Vector3(-0.08, 0.02, 0.28), scale: new THREE.Vector3(1.35, 0.58, 0.5) },
    { count: mode === "home" ? 62 : 28, color: 0x9b6d74, size: 0.14, opacity: 0.28, center: new THREE.Vector3(-1.0, 0.2, -0.16), scale: new THREE.Vector3(0.54, 0.2, 0.26) }
  ];

  const rayTargets = [];

  clusters.forEach((cluster, clusterIndex) => {
    const positions = new Float32Array(cluster.count * 3);
    for (let index = 0; index < cluster.count; index += 1) {
      const a = Math.sqrt(-2 * Math.log(Math.max(Math.random(), 0.001)));
      const theta = Math.random() * Math.PI * 2;
      const b = Math.sqrt(-2 * Math.log(Math.max(Math.random(), 0.001)));
      const phi = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * a * cluster.scale.x + cluster.center.x;
      const y = Math.sin(theta) * a * cluster.scale.y + cluster.center.y;
      const z = Math.cos(phi) * b * cluster.scale.z + cluster.center.z;
      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;

      if (index % 13 === 0) rayTargets.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: cluster.color,
      size: cluster.size,
      map: texture,
      transparent: true,
      opacity: cluster.opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, material);
    points.userData.drift = 0.18 + clusterIndex * 0.06;
    points.userData.baseOpacity = cluster.opacity;
    points.userData.baseSize = cluster.size;
    points.userData.phase = clusterIndex * 0.84;
    splats.add(points);

    const ringCount = mode === "home" ? 3 : 2;
    for (let ring = 0; ring < ringCount; ring += 1) {
      const ellipse = createContourLine(
        THREE,
        0.46 + ring * 0.21 + cluster.scale.x * 0.28,
        0.18 + ring * 0.09 + cluster.scale.y * 0.2,
        cluster.center.z,
        128,
        clusterIndex + ring,
        cluster.color,
        mode === "home" ? 0.3 - ring * 0.04 : 0.18
      );
      ellipse.position.copy(cluster.center);
      ellipse.rotation.set(0.88 + clusterIndex * 0.1, -0.34, clusterIndex * 0.46 + ring * 0.24);
      ellipse.userData.breath = 0.8 + clusterIndex * 0.17 + ring * 0.11;
      covariance.add(ellipse);
    }
  });

  rays.add(createRayBundle(THREE, new THREE.Vector3(-2.25, -1.42, 1.34), rayTargets.filter((_, index) => index % 2 === 0), 0xc8bfb0, 0.23));
  rays.add(createRayBundle(THREE, new THREE.Vector3(1.95, -1.12, 0.98), rayTargets.filter((_, index) => index % 2 === 1), 0x7d9ca3, 0.19));
  rays.add(createRayBundle(THREE, new THREE.Vector3(-0.25, 1.54, 1.18), rayTargets.filter((_, index) => index % 3 === 0), 0xb9945a, 0.13));

  root.rotation.set(-0.22, -0.1, 0.08);

  return {
    type: "splat",
    root,
    splats,
    rays,
    covariance
  };
}

function buildScene(THREE, canvas, mode) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(mode === "home" ? 42 : 36, 1, 0.1, 100);
  camera.position.set(0, 0, mode === "home" ? 8.6 : 7.4);

  const group = new THREE.Group();
  scene.add(group);

  const ambient = new THREE.AmbientLight(0xd8d0c2, 0.72);
  const key = new THREE.DirectionalLight(0xf3eee4, 1.15);
  const rim = new THREE.PointLight(0x7d9ca3, 1.4, 18);
  key.position.set(3.5, 4.5, 5);
  rim.position.set(-4, -2, 4);
  scene.add(ambient, key, rim);

  const variant = chooseMeshVariant(canvas, mode);
  canvas.dataset.meshVariant = variant;
  const fieldSystem = variant === "splat" ? createGaussianSplatField(THREE, mode) : createSurveyField(THREE, mode);
  group.add(fieldSystem.root);

  const pointer = { x: 0, y: 0 };
  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
  }, { passive: true });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(320, Math.floor(rect.width));
    const height = Math.max(320, Math.floor(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const desktop = mode === "home" && width > 760;
    group.position.x = desktop ? (variant === "splat" ? 1.28 : 2.28) : (variant === "splat" ? 0.08 : 0.42);
    group.position.y = desktop ? (variant === "splat" ? 0.02 : -0.04) : (variant === "splat" ? -0.02 : -0.06);
    group.scale.setScalar(desktop ? (variant === "splat" ? 1.52 : 0.98) : (variant === "splat" ? 0.88 : 0.72));
  }

  function render(time = 0) {
    const speed = prefersReducedMotion ? 0 : time * 0.00011;
    group.rotation.y = -0.08 + Math.sin(speed * 1.1) * 0.035 + pointer.x * 0.055;
    group.rotation.x = -0.04 + Math.cos(speed * 0.8) * 0.026 + pointer.y * 0.04;

    if (fieldSystem.type === "survey") {
      fieldSystem.field.rotation.z = -0.08 + Math.sin(speed * 1.6) * 0.025;
      fieldSystem.contours.rotation.z = speed * 0.34;
      fieldSystem.contours.rotation.y = Math.sin(speed * 0.9) * 0.06;
      fieldSystem.particles.rotation.y = -speed * 0.22;
      fieldSystem.particles.rotation.z = Math.sin(speed * 0.7) * 0.025;

      const position = fieldSystem.surfaceGeometry.attributes.position;
      for (let index = 0; index < position.count; index += 1) {
        const offset = index * 3;
        const x = fieldSystem.basePositions[offset];
        const y = fieldSystem.basePositions[offset + 1];
        const baseZ = fieldSystem.basePositions[offset + 2];
        position.setZ(index, baseZ + Math.sin(speed * 4 + x * 0.75 + y * 0.42) * 0.025);
      }
      position.needsUpdate = true;
    } else {
      const breath = 1 + Math.sin(speed * 2.6) * 0.022;
      fieldSystem.root.scale.setScalar(breath);
      fieldSystem.splats.rotation.x = Math.sin(speed * 0.72) * 0.045;
      fieldSystem.splats.rotation.y = speed * 0.48;
      fieldSystem.splats.rotation.z = Math.sin(speed * 0.9) * 0.055;
      fieldSystem.rays.rotation.x = Math.cos(speed * 0.74) * 0.026;
      fieldSystem.rays.rotation.y = Math.sin(speed * 0.85) * 0.08;
      fieldSystem.covariance.rotation.z = -speed * 0.28;
      fieldSystem.covariance.rotation.y = Math.sin(speed * 0.65) * 0.064;
      fieldSystem.splats.children.forEach((points, index) => {
        const phase = speed * (1.5 + points.userData.drift) + points.userData.phase;
        points.rotation.z = Math.sin(phase) * 0.07;
        points.rotation.y = Math.cos(phase * 0.7) * 0.035;
        points.material.opacity = points.userData.baseOpacity + Math.sin(speed * 3.1 + index) * points.userData.baseOpacity * 0.16;
        points.material.size = points.userData.baseSize * (1 + Math.sin(speed * 2.2 + index) * 0.08);
      });
      fieldSystem.rays.children.forEach((line, index) => {
        const baseOpacity = line.material.userData.baseOpacity || 0.1;
        line.material.opacity = baseOpacity + Math.sin(speed * 2.4 + index * 0.9) * baseOpacity * 0.24;
      });
      fieldSystem.covariance.children.forEach((line, index) => {
        const baseOpacity = line.material.userData.baseOpacity || 0.16;
        line.material.opacity = baseOpacity + Math.sin(speed * 2 + line.userData.breath) * baseOpacity * 0.18;
        line.scale.setScalar(1 + Math.sin(speed * 1.6 + index * 0.4) * 0.018);
      });
    }

    renderer.render(scene, camera);
    canvas.dataset.meshRendered = "three";
    canvas.dataset.meshVariant = variant;

    if (!prefersReducedMotion) requestAnimationFrame(render);
  }

  resize();
  render();
  window.addEventListener("resize", resize, { passive: true });
}

(async function initMeshFields() {
  const canvases = Array.from(document.querySelectorAll("[data-mesh-scene]"));
  if (!canvases.length) return;

  try {
    const THREE = await import(THREE_URL);
    canvases.forEach((canvas) => {
      try {
        buildScene(THREE, canvas, canvas.dataset.meshScene || "page");
      } catch (error) {
        drawFallbackMesh(canvas, canvas.dataset.meshScene || "page");
      }
    });
  } catch (error) {
    withCanvases(drawFallbackMesh);
  }
}());
