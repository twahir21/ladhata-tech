"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ParticleField from "./particles";

/**
 * Fixed, full-bleed Three.js background layer sitting behind all HTML
 * content (-z-10). Kept intentionally cheap: no shadows, capped DPR,
 * and a single draw call each for points + lines.
 */
export default function LadhataHeroScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        // Cap devicePixelRatio at 1.5 — full retina density buys very
        // little visual fidelity here but costs real frame time.
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <color attach="background" args={["#09090B"]} />

        <Suspense fallback={null}>
          <ParticleField />

          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.4}
              mipmapBlur
              radius={0.6}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}