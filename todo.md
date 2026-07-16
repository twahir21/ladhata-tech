🎨 Design Theme & Color Palette

To represent both "advanced software engineering" and "approachable African business solutions," we want a tech-forward dark theme with high-contrast vibrant accents.

    Primary Deep (Background): #09090B (Zinc 950 / Near Black) — Keeps the website feeling ultra-premium and modern.

    Brand Teal (The "Tech" Vibe): #0D9488 (Teal 600) — Represents reliability and data structures.

    Vibrant Amber (The "Simamia" Vibe): #F59E0B (Amber 500) — Represents East African warmth, commerce, and success.

    Accent Purple / Blue: #6366F1 (Indigo 500) — Used sparingly for interactive elements and button gradients.

✨ Crucial Interactive Animations

Too many 3D assets will tank your SEO and performance scores (especially on mobile in regions with limited bandwidth). The strategy is targeted, performant visual triggers:

    A Scroll-Triggered Parallax Hero: Use simple SVG layers or lightweight 2D graphics that shift positions slightly at different speeds as the user scrolls.

    Product Reveal on Scroll: As the user scrolls down to the Simamia section, a mock-up of a mobile phone slides smoothly from the bottom right into view while its features fade in from the left.

    Performant 3D (Interactive Interactive Cards): Use Three.js (via @react-three/fiber and @react-three/drei) or CSS 3D transforms. For example, hovering over a service card tilts it subtly in 3D space tracking the user's cursor.

🏗️ Components to Include
1. Hero Section (with 3D Mouse Tracker)

A bold heading ("We Build the Digital Engines for East African Enterprises") paired with a subtle, interactive 3D particle field or rotating glowing wireframe globe in the background.
2. "Our Flagship Products" Spotlight (Featuring Simamia)

A dedicated interactive split section. On one side, highlight Simamia App (sales tracking, offline mode). On the other side, show a responsive smartphone canvas that shifts perspective based on which feature the user is hovering over.
3. Interactive Technology Stack Explorer

A interactive grid showing what Ladhata Tech Solutions builds with (Next.js, Bun, Go, Supabase).



### prompt
Coding Prompt: Ladhata Tech Solutions Hero Page (Next.js + R3F)

I need you to generate the code for a premium, performant hero section for a technology company landing page, using Next.js (App Router), TypeScript, and Tailwind CSS.

The core requirement is to create a dynamic background visualization using React Three Fiber (@react-three/fiber and @react-three/drei) that implements a complex mouse-tracking animation and adheres strictly to a specific design theme.
1. Tech Stack & Setup

Assume a fresh Next.js App Router project initialized with TypeScript and Tailwind CSS.
Your code must include the necessary imports for @react-three/fiber, @react-three/drei, three, and framer-motion.
2. Design Theme & Color Palette (Strict Adherence)

Apply these colors using Tailwind classes or hex codes within the Three.js scene:

    Background: #09090B (Zinc 950 / Near Black). The Three.js Canvas must be set as a background layer (-z-10) behind HTML content.

    Primary Accent (Tech Vibe): #0D9488 (Teal 600). Used for the main interactive visual elements.

    Secondary Accent (Warmth/Simamia): #F59E0B (Amber 500). Used sparingly for highlights.

    Tertiary Accent (Interactive): #6366F1 (Indigo 500).

3. Component Structure

Create a main page component (page.tsx) that structures the section:

A. HTML Overlay Layer (z-10):

    This layer must use Tailwind for layout (flex flex-col justify-center, relative, z-10, min-h-screen).

    Heading (Center-Aligned): "We Build the Digital Engines for East African Enterprises." Use a bold, premium sans-serif font (e.g., Inter, bold), white text, large size (text-5xl md:text-7xl), and tight tracking (tracking-tighter).

    Call to Action (CTA): Below the heading, a gradient button (Indigo #6366F1 to Teal #0D9488).

B. Three.js Background Layer (-z-10):

    Create a dedicated <LadhataHeroScene/> component for the R3F Canvas.

    Setting: Canvas must be app-level or full-screen, fixed or absolute inset-0, -z-10, with devicePixelRatio optimized for performance. Use <color attach="background" args={['#09090B']} />.

4. The 3D/Interactive Visuals (Crucial Interactivity)

Inside the <LadhataHeroScene/>, implement the following:

A. The Base Visual (3D Particle Field/Network):

    Do not use a heavy geometry. Use a Points instance or a lightweight shader-based Points material.

    Create a large, scattered field of small, glowing vertices (particles) connecting via a light network (schematic/wireframe lines).

    Colors: Particles should be Teal (#0D9488), with rare particles glowing Amber (#F59E0B). The connection lines should be faint Teal.

B. The 3D Mouse Tracker Animation (Perceptual Depth):

    The entire particle field must react dynamically to the user's mouse position. This is the main performance-optimized interaction.

    Use useFrame() to track state.mouse.x and state.mouse.y.

    Effect: As the mouse moves right, the particle field should subtly rotate/drift left (inverse relationship). As the mouse moves up, the field drifts down. This creates a compelling sense of depth and scale, as if the user is looking into a vast digital constellation.

    Damping: Implement smooth damping/interpolation (using MathUtils.damp or similar) so the visualization glides to the new position rather than snapping.

C. Post-Processing (Premium Feel):

    Include basic post-processing to make the Teal/Amber elements glow subtly against the dark background. Use @react-three/postprocessing (if available, otherwise describe how to implement it) to add a slight Bloom effect, specifically targeting the emissive properties of the particles.

5. Output Expectation

Please provide the complete, structured code for the necessary Next.js components (page.tsx and the internal R3F components like LadhataHeroScene.tsx), including all required imports, TypeScript types, and Tailwind classes. Focus on modularity and performance, ensuring the 3D scene doesn't block the main thread.