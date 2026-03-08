# Sentimento — Design & Implementation Guide

## 1. Design Philosophy: Ultra-Minimalism
The design of Sentimento follows an "Invisible Infrastructure" philosophy, inspired by high-end, intelligent systems (like Ciridae). The goal is to convey complexity through simplicity.

### Core Principles
- **Subtraction**: Remove all non-essential elements (colors, borders, shadows).
- **Typography**: Use a single, clean sans-serif typeface (Inter) with varied weights to establish hierarchy.
- **Motion**: Animation is the "texture". Instead of static images, we use a live, generated shader that implies flow, intelligence, and connection.
- **Responsiveness**: The layout adapts fluidly, maintaining the "grid" feel across devices.

### Visual Language
- **Color Palette**: 
  - Background: `#000000` (Void)
  - Text Primary: `#FFFFFF` (Signal)
  - Text Secondary: `rgba(255, 255, 255, 0.6)` (Data)
  - Text Tertiary: `rgba(255, 255, 255, 0.4)` (Structure)
  - Accents: Purely functional (hover states, slight opacity shifts).
- **Typography**: `Inter` (Google Fonts).
  - Headings: Light/Thin weights (300/400) for an elegant, modern feel.
  - Body: Regular (400) for readability.
  - Monospace: For data/IDs (e.g., "01", "EST. 2026").

## 2. Technical Implementation

### Stack
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Graphics**: Three.js + React Three Fiber (R3F) + GLSL Shaders

### The Animation (AbstractBackground.jsx)
Instead of video or images, we use a **Procedural Shader**.
- **Technique**: A custom Fragment Shader running on a full-screen Plane geometry.
- **Algorithm**: 
  - Uses **Simplex Noise** (2D) to generate organic, non-repeating patterns.
  - **Time-based evolution**: The pattern shifts slowly over time (`uTime`).
  - **Interaction**: The shader reacts to mouse position (`uMouse`), creating a subtle distortion field that follows the user's attention.
- **Performance**:
  - Runs on the GPU via WebGL.
  - Minimal CPU overhead.
  - `dpr={[1, 2]}` ensures sharp rendering on high-DPI screens without killing performance on mobile.

### UI Framework
- **Layering**: The application is composed of two z-index layers:
  1.  `z-0`: The Canvas (Background).
  2.  `z-10`: The DOM Content (Text/Interactions).
- **Component Structure**:
  - `SentimentoPage.jsx`: The main layout controller.
  - `AbstractBackground.jsx`: The visual engine.

## 3. Performance Considerations
- **60fps Target**: The shader is optimized to use simple math operations (mix, smoothstep, sin) rather than heavy texture lookups.
- **Responsive**: The canvas automatically resizes. The shader uses UV coordinates which are resolution-independent.
- **Bundle Size**: No large assets (images/videos) are loaded. The entire visual weight is code.

## 4. Future Improvements
- **Post-Processing**: Add bloom or grain for a more "cinematic" feel (using `@react-three/postprocessing`).
- **Data Integration**: Connect the "Projects" list to a CMS.
- **Route Transitions**: Use GLSL transitions between pages.
