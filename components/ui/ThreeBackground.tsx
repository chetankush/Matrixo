"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

// Custom sphere point generation
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

// Shared state for scroll and interaction (module level for Three.js access)
let zoomProgress = 0;
let targetZoomProgress = 0;
let isDraggingGlobal = false;
let dragRotationX = 0;
let dragRotationY = 0;
let targetDragX = 0;
let targetDragY = 0;
let isZoomComplete = false;
let accumulatedScroll = 0;
let zoomScale = 1;
let targetZoomScale = 1;

const ZOOM_SCROLL_THRESHOLD = 400;

// Component that forces early GPU compilation
function GPUCompiler() {
  const { gl, scene, camera } = useThree();
  const compiled = useRef(false);

  useEffect(() => {
    if (!compiled.current) {
      compiled.current = true;
      gl.compile(scene, camera);
      gl.render(scene, camera);
    }
  }, [gl, scene, camera]);

  return null;
}

export const ThreeBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect 1: Initialize Three.js when browser is idle
  useEffect(() => {
    const initThree = () => {
      setMounted(true);
    };

    if ("requestIdleCallback" in window) {
      const idleId = (window as typeof window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(initThree, { timeout: 300 });
      return () => {
        (window as typeof window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      };
    } else {
      const timeoutId = setTimeout(initThree, 50);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Effect 2: Set up event listeners
  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;

    // Handle wheel for zoom effect
    const handleWheel = (e: WheelEvent) => {
      // Ctrl/Cmd + scroll = zoom in/out
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        targetZoomScale = Math.min(Math.max(targetZoomScale + delta, 0.5), 2.0);
        return;
      }

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const atTopOfPage = window.scrollY < 5;

      if (!isZoomComplete && scrollingDown && atTopOfPage) {
        e.preventDefault();
        accumulatedScroll += e.deltaY;
        targetZoomProgress = Math.min(accumulatedScroll / ZOOM_SCROLL_THRESHOLD, 1);
        if (targetZoomProgress >= 1) {
          isZoomComplete = true;
        }
      } else if (scrollingUp && window.scrollY < 50) {
        if (isZoomComplete && window.scrollY < 5) {
          e.preventDefault();
          isZoomComplete = false;
        }
        if (!isZoomComplete) {
          e.preventDefault();
          accumulatedScroll = Math.max(0, accumulatedScroll + e.deltaY);
          targetZoomProgress = Math.max(0, accumulatedScroll / ZOOM_SCROLL_THRESHOLD);
        }
      }
    };

    // Drag to rotate
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      // Only start dragging if clicking on the Three.js container
      if (container && container.contains(e.target as Node)) {
        isDraggingGlobal = true;
        setIsDragging(true);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Check if hovering over container
      if (container) {
        const rect = container.getBoundingClientRect();
        const isOver = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom;
        setIsHovering(isOver);
      }

      if (isDraggingGlobal) {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        targetDragX += deltaY * 0.005;
        targetDragY += deltaX * 0.005;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDraggingGlobal = false;
      setIsDragging(false);
    };

    // Touch support
    let lastTouchX = 0;
    let lastTouchY = 0;
    let isTouchZooming = false;
    let initialPinchDistance = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch to zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
        isTouchZooming = true;
      } else if (e.touches.length === 1) {
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        if (!isZoomComplete && window.scrollY < 5) {
          isTouchZooming = true;
        } else {
          isDraggingGlobal = true;
          setIsDragging(true);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialPinchDistance > 0) {
        // Pinch zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        const delta = (currentDistance - initialPinchDistance) * 0.005;
        targetZoomScale = Math.min(Math.max(targetZoomScale + delta, 0.5), 2.0);
        initialPinchDistance = currentDistance;
      } else if (e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY;
        const deltaX = e.touches[0].clientX - lastTouchX;

        if (isTouchZooming && !isZoomComplete) {
          if (deltaY > 0) {
            accumulatedScroll += deltaY * 2;
            targetZoomProgress = Math.min(accumulatedScroll / ZOOM_SCROLL_THRESHOLD, 1);
            if (targetZoomProgress >= 1) {
              isZoomComplete = true;
              isTouchZooming = false;
            }
          } else if (deltaY < 0) {
            accumulatedScroll = Math.max(0, accumulatedScroll + deltaY * 2);
            targetZoomProgress = accumulatedScroll / ZOOM_SCROLL_THRESHOLD;
          }
        } else if (isDraggingGlobal) {
          targetDragX += (currentY - lastTouchY) * 0.003;
          targetDragY += deltaX * 0.003;
        }

        lastTouchX = e.touches[0].clientX;
        lastTouchY = currentY;
      }
    };

    const handleTouchEnd = () => {
      isDraggingGlobal = false;
      setIsDragging(false);
      isTouchZooming = false;
      initialPinchDistance = 0;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Reset state
    zoomProgress = 0;
    targetZoomProgress = 0;
    isZoomComplete = false;
    accumulatedScroll = 0;
    zoomScale = 1;
    targetZoomScale = 1;

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  // Determine cursor class based on state
  const getCursorClass = () => {
    if (isDragging) return 'cursor-grabbing';
    if (isHovering) return 'cursor-grab';
    return 'cursor-default';
  };

  return createPortal(
    <div
      ref={containerRef}
      id="three-background-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'auto',
        background: '#000'
      }}
      className={getCursorClass()}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{ position: [0, 0, 0.5], fov: 75 }}
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl, scene, camera }) => {
          gl.compile(scene, camera);
          gl.render(scene, camera);
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <InteractiveCamera />
        <WarpField />
        <Preload all />
        <GPUCompiler />
      </Canvas>

      {/* Zoom indicator */}
      <ZoomIndicator />
    </div>,
    document.body
  );
};

// Zoom indicator component
function ZoomIndicator() {
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setZoom(Math.round(zoomScale * 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (zoom === 100) return null;

  return (
    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
      {zoom}%
    </div>
  );
}

// Interactive camera with zoom
function InteractiveCamera() {
  const { camera } = useThree();

  useFrame(() => {
    zoomProgress += (targetZoomProgress - zoomProgress) * 0.06;
    zoomScale += (targetZoomScale - zoomScale) * 0.1;
    dragRotationX += (targetDragX - dragRotationX) * 0.08;
    dragRotationY += (targetDragY - dragRotationY) * 0.08;

    const startZ = 0.5;
    const endZ = 2.2;
    const targetZ = (startZ + zoomProgress * (endZ - startZ)) / zoomScale;
    camera.position.z = targetZ;

    camera.rotation.x = dragRotationX * 0.3;
    camera.rotation.y = dragRotationY * 0.3;
  });

  return null;
}

function WarpField() {
  const ref = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const sphere = useMemo(() => {
    return generateSpherePoints(2500, 2.5);
  }, []);

  const glowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const centerX = 16;
    const centerY = 16;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (ref.current && groupRef.current) {
      ref.current.rotation.y -= delta / 104;

      const mouseInfluence = isDraggingGlobal ? 0.02 : 0.08;
      groupRef.current.rotation.x += (state.pointer.y * 0.15 - groupRef.current.rotation.x) * mouseInfluence;
      groupRef.current.rotation.y += (state.pointer.x * 0.15 - groupRef.current.rotation.y) * mouseInfluence;

      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          map={glowTexture}
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaTest={0.01}
          opacity={0.7}
        />
      </Points>
      <ColoredField />
      <TwinklingStars />
    </group>
  );
}

// Small colorful twinkling stars scattered across the universe
function TwinklingStars() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, sizes, twinkleOffsets } = useMemo(() => {
    const count = 150; // Small quantity
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);

    // Vibrant universe star colors
    const starColors = [
      new THREE.Color("#FF6B6B"), // Red
      new THREE.Color("#FF8E53"), // Orange
      new THREE.Color("#FFD93D"), // Yellow/Gold
      new THREE.Color("#6BCB77"), // Green
      new THREE.Color("#4D96FF"), // Blue
      new THREE.Color("#9B59B6"), // Purple
      new THREE.Color("#FF69B4"), // Pink
      new THREE.Color("#00D9FF"), // Cyan
      new THREE.Color("#FF4757"), // Crimson
      new THREE.Color("#70A1FF"), // Light Blue
    ];

    for (let i = 0; i < count; i++) {
      // Spread stars in a larger sphere
      const r = 1.5 + Math.random() * 2.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Random vibrant color
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varying sizes - mostly small
      sizes[i] = 0.008 + Math.random() * 0.015;

      // Random twinkle offset for varied animation
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, twinkleOffsets };
  }, []);

  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const centerX = 16;
    const centerY = 16;

    // Create a soft glowing star
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    // Add cross flare for star effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, 4);
    ctx.lineTo(centerX, 28);
    ctx.moveTo(4, centerY);
    ctx.lineTo(28, centerY);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  const shaderMaterial = useMemo(() => {
    if (!starTexture) return null;

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: starTexture },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aTwinkleOffset;
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float uTime;

        void main() {
          vColor = color;

          // Twinkle effect - varies brightness over time
          float twinkleSpeed = 2.0 + aTwinkleOffset;
          vTwinkle = 0.5 + 0.5 * sin(uTime * twinkleSpeed + aTwinkleOffset * 10.0);

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          // Size varies with twinkle
          float dynamicSize = aSize * (0.7 + 0.3 * vTwinkle);
          gl_PointSize = dynamicSize * (800.0 / -mvPosition.z);

          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vTwinkle;

        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);

          if (texColor.a < 0.01) discard;

          // Apply color with twinkle brightness
          vec3 finalColor = vColor * (0.8 + 0.4 * vTwinkle);

          gl_FragColor = vec4(finalColor, texColor.a * (0.7 + 0.3 * vTwinkle));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
  }, [starTexture]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow counter-rotation for depth effect
      ref.current.rotation.y += delta * 0.02;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  if (!shaderMaterial) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aTwinkleOffset"
          count={twinkleOffsets.length}
          array={twinkleOffsets}
          itemSize={1}
          args={[twinkleOffsets, 1]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
}

function ColoredField() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, tilts, orientations } = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const tilts = new Float32Array(count);
    const orientations = new Float32Array(count);

    const colorPalette = [
      new THREE.Color("#87CEEB"),
      new THREE.Color("#B0E2FF"),
      new THREE.Color("#FFC04D"),
      new THREE.Color("#FF6B9D"),
      new THREE.Color("#A855F7"),
    ];

    const whiteColor = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const r = 2.5 * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const isColored = Math.random() > 0.35;
      const color = isColored ? colorPalette[Math.floor(Math.random() * colorPalette.length)] : whiteColor;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      tilts[i] = 0.2 + Math.random() * 0.8;
      orientations[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, tilts, orientations };
  }, []);

  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const centerX = 32;
    const centerY = 32;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 30; j++) {
        const angle = 0.3 * j + (i * Math.PI);
        const radius = 0.8 * j;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const size = Math.max(0.5, 2 - (j * 0.05));

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  const shaderMaterial = useMemo(() => {
    if (!starTexture) return null;

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 0.015 },
        uTexture: { value: starTexture },
        uOpacity: { value: 0.8 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 }
      },
      vertexShader: `
        attribute float aTilt;
        attribute float aOrientation;
        varying vec3 vColor;
        varying float vAngle;
        varying float vTilt;
        varying float vOrientation;
        varying float vDistance;
        uniform float uTime;
        uniform float uSize;
        uniform vec2 uMouse;
        uniform float uHover;

        void main() {
          vColor = color;
          vTilt = aTilt;
          vOrientation = aOrientation;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          vDistance = -mvPosition.z;

          float mouseDistance = length(position.xy - uMouse * 2.0);
          float hoverScale = 1.0 + (1.0 - smoothstep(0.0, 0.8, mouseDistance)) * uHover * 0.5;

          gl_PointSize = uSize * hoverScale * (1000.0 / -mvPosition.z);

          gl_Position = projectionMatrix * mvPosition;

          float random = sin(dot(position.xyz, vec3(12.9898, 78.233, 45.5432)));
          float interactionSpeed = 1.0 + uHover * 0.5;
          vAngle = uTime * (0.5 + random * 1.0) * interactionSpeed + random * 100.0;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uOpacity;
        uniform float uHover;
        varying vec3 vColor;
        varying float vAngle;
        varying float vTilt;
        varying float vOrientation;
        varying float vDistance;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;

          float co = cos(vOrientation);
          float so = sin(vOrientation);
          vec2 aligned = vec2(uv.x * co + uv.y * so, -uv.x * so + uv.y * co);

          aligned.y /= vTilt;

          if (length(aligned) > 0.5) discard;

          float s = sin(vAngle);
          float c = cos(vAngle);
          vec2 spun = vec2(aligned.x * c - aligned.y * s, aligned.x * s + aligned.y * c);

          vec4 texColor = texture2D(uTexture, spun + 0.5);

          if (texColor.a < 0.01) discard;

          float depthGlow = smoothstep(2.0, 0.5, vDistance);
          vec3 glowColor = vColor + depthGlow * 0.3;

          float brightness = 1.0 + uHover * 0.2;

          gl_FragColor = vec4(glowColor * brightness, uOpacity) * texColor;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
  }, [starTexture]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta / 104;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y);

      const hoverTarget = isDraggingGlobal ? 1.0 : 0.3;
      materialRef.current.uniforms.uHover.value +=
        (hoverTarget - materialRef.current.uniforms.uHover.value) * 0.1;
    }
  });

  if (!shaderMaterial) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aTilt"
          count={tilts.length}
          array={tilts}
          itemSize={1}
          args={[tilts, 1]}
        />
        <bufferAttribute
          attach="attributes-aOrientation"
          count={orientations.length}
          array={orientations}
          itemSize={1}
          args={[orientations, 1]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
}
