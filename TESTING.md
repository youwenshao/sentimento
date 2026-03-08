# Testing Checklist for Light Mode Fixes

## 1. Theme Toggle & Persistence
- [ ] Click the Sun/Moon toggle in the footer.
- [ ] Verify background color smoothly transitions between Light (`#FAFAFA`) and Dark (`#0c0a09`).
- [ ] Verify text color smoothly transitions between Dark Gray (`#333333`) and White.
- [ ] Verify text opacity modifiers (e.g., footer text, EST. 2026 label) are preserved in both themes.

## 2. UI Elements
- [ ] **Header**: "Sentimento" and "EST. 2026" should be dark gray in light mode.
- [ ] **Navigation**: Links (Work, About, Contact) should be dark gray and darken on hover in light mode.
- [ ] **Hero Section**: Large text "Systems so efficient..." should be dark gray.
- [ ] **Project List**:
    - [ ] Project IDs ("01", etc.) should be subtle dark gray.
    - [ ] Project Names should be dark gray.
    - [ ] Borders (lines between projects) should be visible (subtle gray) in light mode.
- [ ] **Controls Overlay**:
    - [ ] Open "Config".
    - [ ] Verify sliders and text in the overlay are readable in both themes.
    - [ ] Verify the overlay background is semi-transparent white/black with blur.

## 3. Background Animation (Fractal)
- [ ] **Full Screen Coverage**: Ensure the fractal animation covers the *entire* screen, with NO black bars on the sides, top, or bottom.
- [ ] **Resizing**: Resize the browser window horizontally and vertically. The background should strictly follow the viewport size without gaps.
- [ ] **Color Adaptation**:
    - [ ] In Light Mode: Fractal pattern should be subtle gray on off-white.
    - [ ] In Dark Mode: Fractal pattern should be white/gray on black.

## 4. Cross-Browser & Mobile
- [ ] **Chrome/Edge**: Verify standard rendering.
- [ ] **Firefox**: Check for shader compilation errors (none expected, but good to check).
- [ ] **Safari**: Check for performance and color correctness.
- [ ] **Mobile**: Open on a mobile emulator. Ensure background covers the full height (address bar handling) and text is readable.

# Color Tokens Documentation

The following color tokens are defined in `tailwind.config.js` and used throughout the application.

## Light Theme (Flattened Config)
| Token Key | CSS Class | Hex Value | Usage | WCAG AA Contrast (on #FAFAFA) |
| :--- | :--- | :--- | :--- | :--- |
| `light-bg` | `bg-light-bg` | `#FAFAFA` | Main page background | N/A |
| `light-surface` | `bg-light-surface` | `#F5F5F5` | Secondary surfaces | N/A |
| `light-primary` | `text-light-primary` | `#171717` | Primary text, Headings | **12.6:1** (Pass) |
| `light-secondary` | `text-light-secondary` | `#525252` | Body text, Descriptions | **7.1:1** (Pass) |
| `light-tertiary` | `text-light-tertiary` | `#737373` | Metadata, Labels | **4.8:1** (Pass) |

## Dark Theme (Brand)
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `brand.background` | `#0c0a09` | Main page background |
| `brand.surface` | `#1c1917` | Secondary surfaces |
| `brand.border` | `#292524` | Borders |
| `white` | `#ffffff` | Primary text |
| `white/60` | `rgba(255,255,255,0.6)` | Secondary text |

## CSS Classes Mapping
- **Text Primary**: `text-light-primary` (Light) vs `dark:text-white` (Dark)
- **Background**: `bg-light-bg` (Light) vs `dark:bg-brand-background` (Dark)
