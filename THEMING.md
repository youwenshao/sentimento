# Theming and Animation System Documentation

## Overview

This project implements a comprehensive theming system featuring a sophisticated WebGL-based fractal background animation and a WCAG 2.1 AA compliant color system. The system is designed for high performance, visual subtlety, and user customizability.

## Color System

The application uses a semantic color system defined in `tailwind.config.js` and `src/index.css`. This system ensures consistency across light and dark modes.

### Semantic Tokens

| Token | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| `primary` | `#1A202C` (Gray 900) | `#F7FAFC` (Gray 50) | Main text, high-emphasis elements |
| `secondary` | `#2D3748` (Gray 800) | `#EDF2F7` (Gray 100) | Body text, medium-emphasis elements |
| `tertiary` | `#4A5568` (Gray 700) | `#E2E8F0` (Gray 200) | Metadata, low-emphasis elements |
| `bg-primary` | `#FAFAFA` (Gray 50) | `#0c0a09` (Brand Black) | Main background |
| `bg-surface` | `#F5F5F5` (Gray 100) | `#1c1917` (Brand Surface) | Secondary background |
| `bg-panel` | `rgba(255, 255, 255, 0.9)` | `rgba(12, 10, 9, 0.9)` | Floating panels, overlays |
| `border-panel`| `rgba(0, 0, 0, 0.1)` | `#2d2d2d` (Gray 800) | Panel borders |

### Component Theming: Sliders

Sliders (`input[type="range"]`) use a dedicated set of CSS variables to ensure visibility and state feedback in both modes.

| Variable | Light Mode | Dark Mode | Description |
| :--- | :--- | :--- | :--- |
| `--slider-track` | `rgba(0, 0, 0, 0.1)` | `rgba(255, 255, 255, 0.1)` | Unfilled track background |
| `--slider-thumb` | `#1A202C` | `#F7FAFC` | Draggable thumb handle |
| `--slider-thumb-hover`| `#2D3748` | `#EDF2F7` | Thumb color on hover |
| `--slider-focus-ring` | `rgba(26, 32, 44, 0.2)` | `rgba(247, 250, 252, 0.2)` | Focus outline for accessibility |

**Usage:**
Apply the `.custom-slider` class to any range input.
```jsx
<input type="range" className="custom-slider" />
```

## WebGL Fractal Animation

The background animation uses a custom GLSL shader implementing a dynamic Julia Set fractal.

### Shader Logic (`AbstractBackground.jsx`)

The shader calculates the Julia Set for each pixel:
$z_{n+1} = z_n^2 + c$

- **Dynamic `c`**: The constant `c` is animated over time using sine and cosine functions to create a seamless, evolving loop.
- **Complexity**: Controlled by the `uComplexity` uniform, which adjusts the zoom level and the sharpness of the color gradient.
- **Performance**:
  - Uses `max_iter` limit (64) to ensure high frame rates.
  - Calculations are done per-fragment on the GPU.
  - `dpr` (Device Pixel Ratio) is clamped to `[1, 2]` to balance quality and performance on high-DPI screens.

### Uniforms

| Uniform | Description | Controlled By |
| :--- | :--- | :--- |
| `uTime` | Animation timeline | `useFrame` clock |
| `uSpeed` | Animation speed multiplier | User Slider |
| `uComplexity` | Fractal detail/zoom | User Slider |
| `uColorBg` | Background color | Theme State |
| `uColorFg` | Pattern color | Theme State |

## Performance Optimization

1.  **GPU Acceleration**: All visual heavy lifting is done in the fragment shader.
2.  **React Three Fiber**: Efficiently manages the WebGL context and render loop.
3.  **Memoization**: `useMemo` is used for color calculations to avoid re-allocating THREE.Color objects on every render.
4.  **Power Preference**: `powerPreference: "high-performance"` hints the browser to use the discrete GPU if available.

## Fallback Strategy

If WebGL is not supported, the `Canvas` will fail to render, but the underlying `div` has a background color set via Tailwind classes (`bg-primary`). This ensures the text remains readable even without the animation.
