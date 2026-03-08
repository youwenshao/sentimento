// --- AbstractBackground.jsx ---
// This component renders a full-screen WebGL canvas with a custom shader material.
// It uses React Three Fiber to manage the Three.js scene and Drei for the shader material helper.
// The visual style is inspired by minimalist, high-tech aesthetics (e.g., Ciridae), using
// procedural noise to create a fluid, organic background that reacts to time and mouse input.

import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';

// --- Shader Definition ---
// We use `shaderMaterial` to create a THREE.ShaderMaterial with declarative props.
// Uniforms:
// - uTime: Drives the animation over time.
// - uColorStart/End: The gradient colors (dark grey to black).
// - uResolution: Screen resolution (for potential aspect ratio fixes).
// - uMouse: Mouse position for interactive distortion.

const AbstractMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#1a1a1a'),
    uColorEnd: new THREE.Color('#000000'),
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0, 0)
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Mouse interaction
      float mouseDist = distance(uv, uMouse);
      float mouseInteraction = smoothstep(0.4, 0.0, mouseDist);
      
      // Slow down time
      float time = uTime * 0.025;

      // Generate noise pattern with mouse influence
      float noise1 = snoise(uv * 3.0 + time + mouseInteraction * 0.2);
      float noise2 = snoise(uv * 6.0 - time * 0.5);
      
      // Combine noise for complexity
      float pattern = (noise1 + noise2 * 0.5) * 0.5 + 0.5;
      
      // Create subtle lines/contours
      float lines = sin(pattern * 20.0 + time * 2.0);
      lines = smoothstep(0.4, 0.42, lines) - smoothstep(0.58, 0.6, lines);
      
      // Mix colors based on pattern
      vec3 color = mix(uColorStart, uColorEnd, pattern);
      
      // Add subtle glow/lines
      color += vec3(0.08) * lines;
      
      // Add mouse highlight
      color += vec3(0.05) * mouseInteraction;

      // Vignette
      float dist = distance(uv, vec2(0.5));
      float vignette = smoothstep(0.8, 0.2, dist);
      color *= vignette;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Register the material so R3F knows it
extend({ AbstractMaterial });

const Scene = () => {
  const materialRef = useRef();
  
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      // Convert mouse position (-1 to 1) to UV coordinates (0 to 1)
      // state.pointer.x is -1 to 1, state.pointer.y is -1 to 1 (inverted)
      // UVs are 0,0 at bottom left usually, but Three.js plane UVs are 0,0 top left or bottom left depending on geometry.
      // Let's assume standard UV mapping.
      // Map pointer to 0-1 range.
      const x = (state.pointer.x + 1) / 2;
      const y = (state.pointer.y + 1) / 2;
      
      // Smoothly interpolate mouse position for less jitter
      materialRef.current.uMouse.lerp(new THREE.Vector2(x, y), 0.1);
    }
  });

  return (
    <Plane args={[2, 2]} scale={[10, 10, 1]}>
      {/* Plane size covers viewport - adjust based on camera distance */}
      <abstractMaterial 
        ref={materialRef} 
        key={AbstractMaterial.key}
        uColorStart={new THREE.Color('#1a1a1a')} // Dark grey
        uColorEnd={new THREE.Color('#050505')}   // Black
      />
    </Plane>
  );
};

const AbstractBackground = ({ isEnabled = true }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#000' }}>
      {isEnabled && (
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      )}
    </div>
  );
};

export default AbstractBackground;
