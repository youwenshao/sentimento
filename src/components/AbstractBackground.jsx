import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';

// --- Shader Definition ---
// Implements a dynamic Julia Set fractal animation.
// Uniforms:
// - uTime: Animation time
// - uSpeed: Animation speed multiplier
// - uComplexity: Controls fractal detail/zoom/iterations
// - uColorBg: Background color
// - uColorFg: Foreground/Pattern color
// - uResolution: Viewport resolution
// - uMouse: Mouse position for interaction

const FractalMaterial = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 0.5,
    uComplexity: 0.5,
    uColorBg: new THREE.Color('#FAFAFA'),
    uColorFg: new THREE.Color('#333333'),
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
    uniform float uSpeed;
    uniform float uComplexity;
    uniform vec3 uColorBg;
    uniform vec3 uColorFg;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    #define MAX_ITER 64.0

    void main() {
      // Normalize coordinates to -1.0 to 1.0, correcting for aspect ratio
      vec2 uv = (vUv - 0.5) * 2.0;
      uv.x *= uResolution.x / uResolution.y;

      // Mouse interaction
      vec2 mouse = (uMouse - 0.5) * 2.0;
      // uv += mouse * 0.1; // Slight parallax

      // Animation parameters
      float time = uTime * uSpeed * 0.2;
      
      // Julia Set Constant 'c'
      // Animate c in a loop to create evolving patterns
      vec2 c = vec2(
        sin(time) * 0.4 + sin(time * 2.0) * 0.1,
        cos(time * 1.3) * 0.4 + sin(time * 1.7) * 0.1
      );

      // Add mouse influence to 'c'
      c += mouse * 0.2;

      // Zoom/Scale based on complexity
      // Lower complexity = larger view (more abstract), Higher = zoomed in details
      float zoom = mix(1.5, 0.8, uComplexity);
      vec2 z = uv * zoom;

      float iter = 0.0;
      float smooth_val = 0.0;

      // Iteration loop
      for(float i = 0.0; i < MAX_ITER; i++) {
        // z = z^2 + c
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (2.0 * z.x * z.y) + c.y;
        z = vec2(x, y);

        // Check for divergence
        if(length(z) > 4.0) {
           break;
        }
        iter++;
      }

      // Smooth coloring
      // smooth_val = iter - log2(log2(dot(z,z))) + 4.0; 
      // Simplified smoothing for aesthetics
      float t = iter / MAX_ITER;
      
      // Adjust pattern based on complexity
      // Low complexity: smooth gradients
      // High complexity: sharper edges
      float sharpness = mix(2.0, 8.0, uComplexity);
      t = pow(t, 1.0 / sharpness);

      // Mix colors
      // We want a subtle background, so we mix mostly background with some foreground
      vec3 color = mix(uColorBg, uColorFg, t * 0.15); // Keep it subtle (15% opacity max)

      // Add a vignette for depth
      float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv));
      color = mix(color, uColorBg, 1.0 - vignette);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ FractalMaterial });

const FractalPlane = ({ isEnabled, speed, complexity, theme }) => {
  const materialRef = useRef();
  const { viewport } = useThree();
  
  // Determine colors based on theme
  const colors = useMemo(() => {
    return theme === 'light' 
      ? { bg: new THREE.Color('#FAFAFA'), fg: new THREE.Color('#333333') }
      : { bg: new THREE.Color('#0c0a09'), fg: new THREE.Color('#ffffff') };
  }, [theme]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uResolution = new THREE.Vector2(state.size.width, state.size.height);
      
      // Smoothly interpolate mouse position if needed, or just pass it
      materialRef.current.uMouse = state.pointer;
      
      // Update uniforms that might change
      materialRef.current.uSpeed = speed;
      materialRef.current.uComplexity = complexity;
      materialRef.current.uColorBg.lerp(colors.bg, 0.05); // Smooth transition
      materialRef.current.uColorFg.lerp(colors.fg, 0.05);
    }
  });

  if (!isEnabled) return null;

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <fractalMaterial
        ref={materialRef}
        uSpeed={speed}
        uComplexity={complexity}
        uColorBg={colors.bg}
        uColorFg={colors.fg}
      />
    </mesh>
  );
};

const AbstractBackground = ({ isEnabled = true, speed = 1.0, complexity = 0.5, theme = 'light' }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]} // Optimize for pixel ratio
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: true
        }}
      >
        <FractalPlane 
            isEnabled={isEnabled} 
            speed={speed} 
            complexity={complexity} 
            theme={theme} 
        />
      </Canvas>
    </div>
  );
};

export default AbstractBackground;
