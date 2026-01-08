"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom sphere point generation to avoid NaN issues
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

export const ThreeBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 z-0 bg-black" />;
  }

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <WarpField />
      </Canvas>
    </div>
  );
};

function WarpField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate points for the warp field using custom function
  const sphere = useMemo(() => {
    return generateSpherePoints(2666, 1.5);
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
    if (ref.current) {
      // Horizontal movement (Right to Left)
      ref.current.rotation.y -= delta / 104; // Horizontal movement (Right to Left)
      ref.current.rotation.x = 0; // No vertical tilt
      
      // Interactive rotation based on mouse (subtle)
      ref.current.rotation.x += state.pointer.y * 0.005;
      ref.current.rotation.y += state.pointer.x * 0.005;
    }
  });

  return (
    <group>
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
          size={0.005} // Reduced size
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaTest={0.01}
          opacity={0.6} // Reduced opacity
        />
      </Points>
      <ColoredField />
    </group>
  );
}

function ColoredField() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const { positions, colors, tilts, orientations } = useMemo(() => {
    const count = 3000; // Reduced count for colored particles
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const tilts = new Float32Array(count);
    const orientations = new Float32Array(count);
    
    const colorPalette = [
      new THREE.Color("#87CEEB"), // Sky Blue
      new THREE.Color("#B0E2FF"), // Light Sky Blue
      new THREE.Color("#FFC04D"), // Light Orange
    ];

    const whiteColor = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // Positions
      const r = 1.5 * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Colors - Mix of Sky Blue, Orange and White
      const isColored = Math.random() > 0.4; // 60% colored
      const color = isColored ? colorPalette[Math.floor(Math.random() * colorPalette.length)] : whiteColor;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random Tilt (0.2 to 1.0, where 1.0 is facing camera, 0.2 is edge-on)
      tilts[i] = 0.2 + Math.random() * 0.8;
      
      // Random Orientation (0 to 2PI)
      orientations[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, colors, tilts, orientations };
  }, []);

  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64; // Increased resolution for spiral detail
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    const centerX = 32;
    const centerY = 32;

    // Draw spiral arms
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 2; i++) { // 2 arms
      for (let j = 0; j < 30; j++) {
        const angle = 0.3 * j + (i * Math.PI);
        const radius = 0.8 * j;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const size = Math.max(0.5, 2 - (j * 0.05)); // Tapering size
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Center glow with softer falloff for "galaxy" feel
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16); // Increased radius
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)'); // Bright core
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)'); // Soft middle
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fade out
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.premultiplyAlpha = true;
    return texture;
  }, []);

  // Custom shader material for rotating particles
  const shaderMaterial = useMemo(() => {
    if (!starTexture) return null;
    
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 0.012 }, // Reduced Base size
        uTexture: { value: starTexture },
        uOpacity: { value: 0.7 } // Reduced opacity
      },
      vertexShader: `
        attribute float aTilt;
        attribute float aOrientation;
        varying vec3 vColor;
        varying float vAngle;
        varying float vTilt;
        varying float vOrientation;
        uniform float uTime;
        uniform float uSize;
        
        void main() {
          vColor = color;
          vTilt = aTilt;
          vOrientation = aOrientation;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Size attenuation
          gl_PointSize = uSize * (1000.0 / -mvPosition.z);
          
          gl_Position = projectionMatrix * mvPosition;
          
          // Random rotation speed and phase based on position
          float random = sin(dot(position.xyz, vec3(12.9898, 78.233, 45.5432)));
          // Rotate based on time, with random speed and direction - Slowed down significantly
          vAngle = uTime * (0.5 + random * 1.0) + random * 100.0;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uOpacity;
        varying vec3 vColor;
        varying float vAngle;
        varying float vTilt;
        varying float vOrientation;
        
        void main() {
          // Center UVs
          vec2 uv = gl_PointCoord - 0.5;
          
          // 1. Rotate by Orientation (to align the tilt axis)
          float co = cos(vOrientation);
          float so = sin(vOrientation);
          vec2 aligned = vec2(uv.x * co + uv.y * so, -uv.x * so + uv.y * co);
          
          // 2. Apply Tilt (squash Y axis)
          aligned.y /= vTilt;
          
          // Check bounds after squash to keep it circular in the "galaxy plane"
          if (length(aligned) > 0.5) discard;
          
          // 3. Apply Spin (Animation)
          float s = sin(vAngle);
          float c = cos(vAngle);
          vec2 spun = vec2(aligned.x * c - aligned.y * s, aligned.x * s + aligned.y * c);
          
          // Sample texture
          vec4 texColor = texture2D(uTexture, spun + 0.5);
          
          // Basic alpha test
          if (texColor.a < 0.01) discard;
          
          gl_FragColor = vec4(vColor, uOpacity) * texColor;
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
      // Match the movement of the WarpField
      ref.current.rotation.y -= delta / 104;
      ref.current.rotation.x = 0;
    }
    
    // Update shader time uniform
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
