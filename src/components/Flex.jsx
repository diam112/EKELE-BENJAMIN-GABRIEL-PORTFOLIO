import React, { useEffect, useRef } from 'react';

export default function Flex() {
  const blobCanvasRef = useRef(null);
  const sludgeCanvasRef = useRef(null);
  const diceCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);

  // Bulletproof helper to parse theme colors safely
  const getThemeColors = () => {
    try {
      const computed = getComputedStyle(document.documentElement);
      const primary = (computed.getPropertyValue('--accent-primary') || '#0066FF').trim();
      const secondary = (computed.getPropertyValue('--accent-secondary') || '#7C3AED').trim();
      const cyan = (computed.getPropertyValue('--accent-cyan') || '#00F0FF').trim();
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return { primary, secondary, cyan, isLight };
    } catch (e) {
      return { primary: '#0066FF', secondary: '#7C3AED', cyan: '#00F0FF', isLight: false };
    }
  };

  const hexToRgba = (colorStr, opacity = 1) => {
    if (!colorStr) return `rgba(0, 102, 255, ${opacity})`;
    if (colorStr.startsWith('#')) {
      let hex = colorStr.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const r = parseInt(hex.substring(0, 2), 16) || 0;
      const g = parseInt(hex.substring(2, 4), 16) || 102;
      const b = parseInt(hex.substring(4, 6), 16) || 255;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return colorStr;
  };

  // ==========================================================================
  // CANVAS 1: Organic Pseudopodic Fluid Blob
  // ==========================================================================
  useEffect(() => {
    const canvas = blobCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent && parent.clientWidth > 0 ? parent.clientWidth : window.innerWidth - 80;
      canvas.width = Math.max(w, 300);
      canvas.height = 420;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let mouse = { x: canvas.width / 2, y: 210 };
    let blobCenter = { x: canvas.width / 2, y: 210 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const particles = [];
    const count = 340;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.5) * 85;
      particles.push({
        baseAngle: angle,
        baseRadius: radius,
        speed: 0.015 + Math.random() * 0.035,
        size: 1.6 + Math.random() * 2.8,
        noiseOffset: Math.random() * 100,
        opacity: 0.4 + Math.random() * 0.6,
        pseudopodFactor: 0.5 + Math.random() * 1.5
      });
    }

    let animId;
    let time = 0;

    function renderBlob() {
      if (!canvas || canvas.width === 0) {
        animId = requestAnimationFrame(renderBlob);
        return;
      }

      const { primary, cyan, isLight } = getThemeColors();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      blobCenter.x += (mouse.x - blobCenter.x) * 0.022;
      blobCenter.y += (mouse.y - blobCenter.y) * 0.022;

      const dxMouse = mouse.x - blobCenter.x;
      const dyMouse = mouse.y - blobCenter.y;
      const mouseAngle = Math.atan2(dyMouse, dxMouse);
      const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      const radialGrad = ctx.createRadialGradient(
        blobCenter.x,
        blobCenter.y,
        10,
        blobCenter.x,
        blobCenter.y,
        180
      );
      radialGrad.addColorStop(0, hexToRgba(primary, 0.3));
      radialGrad.addColorStop(0.5, hexToRgba(cyan, 0.12));
      radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(blobCenter.x, blobCenter.y, 180, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i += 3) {
        const p1 = particles[i];
        const angleDiff1 = Math.cos(p1.baseAngle - mouseAngle);
        const reach1 = Math.max(0, angleDiff1) * Math.min(mouseDist * 0.35, 60);

        const pseudoRadius1 =
          p1.baseRadius +
          reach1 +
          Math.sin(p1.baseAngle * 3 + time * 1.8 + p1.noiseOffset) * (28 * p1.pseudopodFactor) +
          Math.cos(p1.baseAngle * 5 - time * 2.4) * (18 * p1.pseudopodFactor) +
          Math.sin(p1.baseAngle * 2 + time * 0.9) * 22;

        const x1 = blobCenter.x + Math.cos(p1.baseAngle) * pseudoRadius1;
        const y1 = blobCenter.y + Math.sin(p1.baseAngle) * pseudoRadius1;

        for (let j = i + 1; j < particles.length; j += 4) {
          const p2 = particles[j];
          const angleDiff2 = Math.cos(p2.baseAngle - mouseAngle);
          const reach2 = Math.max(0, angleDiff2) * Math.min(mouseDist * 0.35, 60);

          const pseudoRadius2 =
            p2.baseRadius +
            reach2 +
            Math.sin(p2.baseAngle * 3 + time * 1.8 + p2.noiseOffset) * (28 * p2.pseudopodFactor) +
            Math.cos(p2.baseAngle * 5 - time * 2.4) * (18 * p2.pseudopodFactor) +
            Math.sin(p2.baseAngle * 2 + time * 0.9) * 22;

          const x2 = blobCenter.x + Math.cos(p2.baseAngle) * pseudoRadius2;
          const y2 = blobCenter.y + Math.sin(p2.baseAngle) * pseudoRadius2;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 55) {
            const lineAlpha = (1 - dist / 55) * (isLight ? 0.45 : 0.3);
            ctx.strokeStyle = hexToRgba(primary, lineAlpha);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angleDiff = Math.cos(p.baseAngle - mouseAngle);
        const reach = Math.max(0, angleDiff) * Math.min(mouseDist * 0.35, 60);

        const pseudoRadius =
          p.baseRadius +
          reach +
          Math.sin(p.baseAngle * 3 + time * 1.8 + p.noiseOffset) * (28 * p.pseudopodFactor) +
          Math.cos(p.baseAngle * 5 - time * 2.4) * (18 * p.pseudopodFactor) +
          Math.sin(p.baseAngle * 2 + time * 0.9) * 22;

        const px = blobCenter.x + Math.cos(p.baseAngle) * pseudoRadius;
        const py = blobCenter.y + Math.sin(p.baseAngle) * pseudoRadius;

        ctx.fillStyle = hexToRgba(i % 2 === 0 ? primary : cyan, p.opacity);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderBlob);
    }

    renderBlob();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ==========================================================================
  // CANVAS 2: Viscous Sludge Fluid
  // ==========================================================================
  useEffect(() => {
    const canvas = sludgeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent && parent.clientWidth > 0 ? parent.clientWidth : window.innerWidth - 80;
      canvas.width = Math.max(w, 300);
      canvas.height = 420;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let mouse = { x: -500, y: -500, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -500;
      mouse.y = -500;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let sludgeGrid = [];
    const rows = 26;

    const initGrid = () => {
      sludgeGrid = [];
      const w = canvas.width || 900;
      const cols = Math.floor(w / 18);
      const spacingX = w / cols;
      const spacingY = 420 / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * spacingX + spacingX / 2;
          const originY = r * spacingY + spacingY / 2;
          sludgeGrid.push({
            ox: originX,
            oy: originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            viscosity: 0.88,
            stiffness: 0.04,
            cols: cols
          });
        }
      }
    };

    initGrid();

    let animId;

    function renderSludge() {
      if (!canvas || canvas.width === 0 || sludgeGrid.length === 0) {
        animId = requestAnimationFrame(renderSludge);
        return;
      }

      const { primary, secondary, cyan, isLight } = getThemeColors();
      const width = canvas.width;
      const height = canvas.height;
      const cols = sludgeGrid[0]?.cols || Math.floor(width / 18);

      ctx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(8, 10, 16, 0.95)';
      ctx.fillRect(0, 0, width, height);

      const probeRadius = 75;

      for (let i = 0; i < sludgeGrid.length; i++) {
        const node = sludgeGrid[i];

        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < probeRadius && mouse.active) {
          const force = (probeRadius - dist) / probeRadius;
          const angle = Math.atan2(dy, dx);
          node.vx += Math.cos(angle) * force * 5.0;
          node.vy += Math.sin(angle) * force * 5.0;
        }

        const springX = (node.ox - node.x) * node.stiffness;
        const springY = (node.oy - node.y) * node.stiffness;

        node.vx += springX;
        node.vy += springY;

        node.vx *= node.viscosity;
        node.vy *= node.viscosity;

        node.x += node.vx;
        node.y += node.vy;
      }

      ctx.strokeStyle = hexToRgba(primary, 0.25);
      ctx.lineWidth = 1.2;

      for (let i = 0; i < sludgeGrid.length; i++) {
        const node = sludgeGrid[i];
        const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy);

        const blobSize = Math.min(6 + vel * 1.5, 14);
        const glowOpacity = Math.min(0.4 + vel * 0.2, 0.95);

        ctx.fillStyle = hexToRgba(i % 3 === 0 ? secondary : primary, glowOpacity);
        ctx.beginPath();
        ctx.arc(node.x, node.y, blobSize, 0, Math.PI * 2);
        ctx.fill();

        if ((i + 1) % cols !== 0 && i + 1 < sludgeGrid.length) {
          const rightNode = sludgeGrid[i + 1];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(rightNode.x, rightNode.y);
          ctx.stroke();
        }

        if (i + cols < sludgeGrid.length) {
          const bottomNode = sludgeGrid[i + cols];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(bottomNode.x, bottomNode.y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const probeGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          probeRadius
        );
        probeGrad.addColorStop(0, hexToRgba(cyan, 0.85));
        probeGrad.addColorStop(0.5, hexToRgba(primary, 0.4));
        probeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = probeGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, probeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = cyan;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, probeRadius * 0.65, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderSludge);
    }

    renderSludge();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ==========================================================================
  // CANVAS 3: 3D Dice with Smooth Rounded Edges & Roman Numerals Stuck Flat to Faces
  // ==========================================================================
  useEffect(() => {
    const canvas = diceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent && parent.clientWidth > 0 ? parent.clientWidth : window.innerWidth - 80;
      canvas.width = Math.max(w, 300);
      canvas.height = 440;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const size = 68;
    const vertices = [
      [-size, -size, -size], [size, -size, -size], [size, size, -size], [-size, size, -size],
      [-size, -size, size],  [size, -size, size],  [size, size, size],  [-size, size, size]
    ];

    const faces = [
      { verts: [0, 1, 2, 3], roman: 'I' },   // Back
      { verts: [5, 4, 7, 6], roman: 'VI' },  // Front
      { verts: [4, 0, 3, 7], roman: 'III' }, // Left
      { verts: [1, 5, 6, 2], roman: 'IV' },  // Right
      { verts: [4, 5, 1, 0], roman: 'II' },  // Top
      { verts: [3, 2, 6, 7], roman: 'V' }   // Bottom
    ];

    let rotX = 0.6;
    let rotY = 0.8;
    let velX = 0.012;
    let velY = 0.018;

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;

      velY = dx * 0.008;
      velX = -dy * 0.008;

      rotY += velY;
      rotX += velX;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      velX = (Math.random() - 0.5) * 0.35;
      velY = (Math.random() - 0.5) * 0.35;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);

    let animId;

    function renderDice() {
      if (!canvas || canvas.width === 0) {
        animId = requestAnimationFrame(renderDice);
        return;
      }

      const { primary, secondary, cyan, isLight } = getThemeColors();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        rotX += velX;
        rotY += velY;
        velX *= 0.96;
        velY *= 0.96;

        if (Math.abs(velX) < 0.002) velX = 0.002;
        if (Math.abs(velY) < 0.003) velY = 0.003;
      }

      const cx = width / 2;
      const cy = height / 2;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      const projVerts = vertices.map(([x, y, z]) => {
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;
        let y2 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;
        return { x: cx + x1, y: cy + y2, z: z2 };
      });

      const faceList = faces.map((f) => {
        const pVerts = f.verts.map((idx) => projVerts[idx]);
        const avgZ = pVerts.reduce((acc, v) => acc + v.z, 0) / pVerts.length;
        return { ...f, pVerts, avgZ };
      }).sort((a, b) => a.avgZ - b.avgZ);

      faceList.forEach((face) => {
        const v = face.pVerts;

        const v0 = v[0], v1 = v[1], v2 = v[2];
        const normalZ = (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x);

        if (normalZ <= 0) return;

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(v[0].x, v[0].y);
        ctx.lineTo(v[1].x, v[1].y);
        ctx.lineTo(v[2].x, v[2].y);
        ctx.lineTo(v[3].x, v[3].y);
        ctx.closePath();

        const faceGrad = ctx.createLinearGradient(v[0].x, v[0].y, v[2].x, v[2].y);
        faceGrad.addColorStop(0, hexToRgba(primary, isLight ? 0.95 : 0.85));
        faceGrad.addColorStop(0.5, hexToRgba(secondary, isLight ? 0.9 : 0.75));
        faceGrad.addColorStop(1, hexToRgba(cyan, isLight ? 0.85 : 0.65));

        ctx.fillStyle = faceGrad;
        ctx.fill();

        ctx.strokeStyle = hexToRgba(cyan, 0.95);
        ctx.lineWidth = 6;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.clip();

        const faceCenterX = (v[0].x + v[1].x + v[2].x + v[3].x) / 4;
        const faceCenterY = (v[0].y + v[1].y + v[2].y + v[3].y) / 4;

        ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = cyan;
        ctx.shadowBlur = 10;
        ctx.fillText(face.roman, faceCenterX, faceCenterY);

        ctx.restore();
      });

      animId = requestAnimationFrame(renderDice);
    }

    renderDice();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ==========================================================================
  // CANVAS 4: Drawing Canvas with Fine, Abundant & Pronounced Stardust Disintegration
  // ==========================================================================
  useEffect(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent && parent.clientWidth > 0 ? parent.clientWidth : window.innerWidth - 80;
      canvas.width = Math.max(w, 300);
      canvas.height = 440;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let isDrawing = false;
    let strokePoints = []; // [{ x, y, createdAt: number, hue: number, disintegrated: boolean }]
    let stardustParticles = [];
    let globalHue = 0;

    const getPoint = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const addPoint = (pt) => {
      strokePoints.push({
        x: pt.x,
        y: pt.y,
        createdAt: Date.now(),
        hue: globalHue % 360,
        disintegrated: false
      });
    };

    const handleStart = (e) => {
      e.preventDefault();
      isDrawing = true;
      addPoint(getPoint(e));
    };

    const handleMove = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      addPoint(getPoint(e));
    };

    const handleEnd = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    let animId;

    function renderDrawing() {
      if (!canvas || canvas.width === 0) {
        animId = requestAnimationFrame(renderDrawing);
        return;
      }

      const { isLight } = getThemeColors();
      const width = canvas.width;
      const height = canvas.height;
      const now = Date.now();

      globalHue += 1.5;

      ctx.fillStyle = isLight ? '#F8FAFC' : '#080A10';
      ctx.fillRect(0, 0, width, height);

      // Check points for progressive 1-second dust disintegration
      for (let i = strokePoints.length - 1; i >= 0; i--) {
        const pt = strokePoints[i];
        const ageSec = (now - pt.createdAt) / 1000.0;

        // Disintegrate specific point 1 second after it was drawn
        if (ageSec >= 1.0 && !pt.disintegrated) {
          pt.disintegrated = true;

          // Emit 16 FINE, ABUNDANT, HIGH-GLOW STARDUST PARTICLES per point
          for (let k = 0; k < 16; k++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.2 + Math.random() * 4.8;
            stardustParticles.push({
              x: pt.x + (Math.random() - 0.5) * 6,
              y: pt.y + (Math.random() - 0.5) * 6,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.5, // Subtle upward float
              life: 1.0,
              decay: 0.01 + Math.random() * 0.015, // Slower float decay
              size: 0.8 + Math.random() * 1.8, // Finer particle dot size
              hue: (pt.hue + Math.random() * 50) % 360
            });
          }
        }

        // Remove fully disintegrated points after 1.4 seconds
        if (ageSec >= 1.4) {
          strokePoints.splice(i, 1);
        }
      }

      // Render active unbroken stroke line segments (points < 1.0s old)
      if (strokePoints.length >= 2) {
        for (let i = 0; i < strokePoints.length - 1; i++) {
          const pt1 = strokePoints[i];
          const pt2 = strokePoints[i + 1];
          const ageSec = (now - pt1.createdAt) / 1000.0;

          if (ageSec < 1.0) {
            const strokeHue = (pt1.hue + globalHue) % 360;
            const lineOpacity = Math.max(0, 1.0 - ageSec * 0.3);
            const lineWidth = 4.5 + ageSec * 16; // Line expands in width as it nears 1s

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(pt1.x, pt1.y);
            ctx.lineTo(pt2.x, pt2.y);

            ctx.strokeStyle = `hsla(${strokeHue}, 100%, 65%, ${lineOpacity})`;
            ctx.shadowColor = `hsl(${strokeHue}, 100%, 55%)`;
            ctx.shadowBlur = 14 + lineWidth;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            ctx.shadowBlur = 0;
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = `hsla(${(strokeHue + 30) % 360}, 100%, 90%, ${lineOpacity})`;
            ctx.stroke();

            ctx.restore();
          }
        }
      }

      // Render fine, abundant, high-glow stardust particle cloud
      for (let p = stardustParticles.length - 1; p >= 0; p--) {
        const pt = stardustParticles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vx *= 0.97;
        pt.vy *= 0.97;
        pt.life -= pt.decay;

        if (pt.life <= 0) {
          stardustParticles.splice(p, 1);
          continue;
        }

        ctx.fillStyle = `hsla(${pt.hue}, 100%, 75%, ${pt.life})`;
        ctx.shadowColor = `hsl(${pt.hue}, 100%, 65%)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(renderDrawing);
    }

    renderDrawing();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);

      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="flex-section" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Pure Unannounced Interactive Canvas Playground Frames */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Canvas 1: Amoeba Pseudopodic Fluid Blob */}
          <div style={{ width: '100%', height: '440px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', position: 'relative', boxShadow: 'var(--shadow-card)' }}>
            <canvas ref={blobCanvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'default' }} />
          </div>

          {/* Canvas 2: Viscous Sludge Fluid */}
          <div style={{ width: '100%', height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', position: 'relative', boxShadow: 'var(--shadow-card)' }}>
            <canvas ref={sludgeCanvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'default' }} />
          </div>

          {/* Canvas 3: 3D Dice with Smooth Rounded Edges & Flat Face-Stuck Roman Numerals */}
          <div style={{ width: '100%', height: '440px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', position: 'relative', boxShadow: 'var(--shadow-card)' }}>
            <canvas ref={diceCanvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }} />
          </div>

          {/* Canvas 4: Continuous Drawing with Fine, Abundant & Pronounced Stardust Disintegration */}
          <div style={{ width: '100%', height: '440px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', position: 'relative', boxShadow: 'var(--shadow-card)' }}>
            <canvas ref={drawCanvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }} />
          </div>

        </div>
      </div>
    </section>
  );
}
