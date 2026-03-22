# Design System Reference

## Color Tokens

### Primary Colors
- **Indigo**: `#4f46e5` - Primary actions, brand
- **Cyan**: `#06b6d4` - Secondary accents
- **Purple**: `#8b5cf6` - Tertiary elements

### Neutral Colors
- **Black**: `#0f0f0f` - Main background
- **Near-White**: `#f8f8f8` - Text/foreground
- **Gray**: `#a0a0a0` - Muted text

### Semantic Colors
- **Error**: `#ef4444` - Destructive actions
- **Success**: `#10b981` - Positive feedback
- **Warning**: `#f59e0b` - Caution

## Glassmorphism Utilities

### Standard Glass
```html
<div class="glass">
  <!-- backdrop-blur-xl, bg-white/5, border-white/10 -->
</div>
```

### Small Glass
```html
<div class="glass-sm">
  <!-- Subtle: backdrop-blur-md, bg-white/7%, border-white/15 -->
</div>
```

### Large Glass
```html
<div class="glass-lg">
  <!-- Bold: backdrop-blur-2xl, bg-white/8%, border-white/15, shadow-2xl -->
</div>
```

## Animation Utilities

### Entrance Animations
```html
<!-- Slide up from bottom -->
<div class="animate-in"></div>

<!-- Slide in from left -->
<div class="animate-in-left"></div>

<!-- Fade in -->
<div class="animate-fade-in"></div>

<!-- Pulsing glow -->
<div class="animate-glow"></div>
```

### Gradient Text
```html
<!-- Primary gradient -->
<h1 class="gradient-text">Heading</h1>

<!-- Alternative gradient -->
<h1 class="gradient-text-alt">Heading</h1>
```

## Component Examples

### Glass Button
```html
<button class="glass px-4 py-2 rounded-lg hover:glass transition">
  Click me
</button>
```

### Gradient Button
```html
<button class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 text-white px-4 py-2 rounded-lg transition">
  Primary Action
</button>
```

### Glass Card
```html
<div class="glass-lg p-6 rounded-2xl">
  <h3 class="text-foreground font-bold">Card Title</h3>
  <p class="text-muted-foreground">Content here</p>
</div>
```

### Animated Message Bubble
```html
<div class="glass-lg px-4 py-3 rounded-2xl animate-fade-in">
  <p class="text-foreground">Message</p>
</div>
```

### Loading Spinner
```html
<div class="flex gap-2">
  <div class="w-2 h-2 rounded-full bg-primary animate-bounce" />
  <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 0.2s" />
  <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 0.4s" />
</div>
```

## Typography Scale

- **H1**: 2.25rem (36px), Bold
- **H2**: 1.875rem (30px), Bold
- **H3**: 1.5rem (24px), Semi-bold
- **H4**: 1.25rem (20px), Semi-bold
- **Body**: 1rem (16px), Regular
- **Small**: 0.875rem (14px), Regular
- **Tiny**: 0.75rem (12px), Regular

## Spacing Scale

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

## Border Radius

- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 1rem (16px)
- **xl**: 1.5rem (24px)
- **2xl**: 2rem (32px)
- **full**: 9999px

## Animations Timing

- **Fast**: 0.2s - Micro-interactions
- **Normal**: 0.3-0.5s - Primary animations
- **Slow**: 0.8s-1s - Entrance animations
- **Very Slow**: 3s - Pulsing effects

## Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Usage Patterns

### Page Entry
```html
<main class="animate-in">
  <!-- Page content slides up -->
</main>
```

### List Items with Stagger
```html
<div className="animate-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
  {/* Each item delays by 0.1s */}
</div>
```

### Hover Effects
```html
<div class="glass-sm hover:glass hover:scale-105 transition-all duration-300">
  Hover over me
</div>
```

### Loading State
```html
{isLoading && (
  <div class="glass-lg px-4 py-3 rounded-2xl">
    <div class="flex gap-2">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce"
             style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  </div>
)}
```

## Accessibility

### Focus States
```css
/* All form inputs have focus ring */
focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
```

### Color Contrast
- Text on background: 15:1 ratio
- Interactive elements: 4.5:1+ ratio
- Badges: 7:1+ ratio

### Reduced Motion
All animations respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

## Best Practices

1. **Use semantic classes**: Prefer `.glass-lg` over raw backdrop-filter values
2. **Animate entrances**: Use `.animate-in` for initial page load
3. **Stagger lists**: Add animation delays to list items (0.1s increments)
4. **Hover feedback**: Always add scale/opacity change on hover
5. **Focus states**: Ensure keyboard navigation is visible
6. **Load states**: Use the three-dot animation for loading states
7. **Gradients**: Use for buttons, headings, and accents
8. **Glass cards**: Use for content containers and overlays

---

**Last Updated**: 2024
**Design System**: Gemini-inspired with glassmorphism
**Version**: 1.0
