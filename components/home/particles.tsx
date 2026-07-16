"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Color palette (strict brief adherence)
 */
const COLOR_TEAL = new THREE.Color("#0D9488");
const COLOR_AMBER = new THREE.Color("#F59E0B");
const COLOR_LINE = new THREE.Color("#0D9488");

const PARTICLE_COUNT = 1400;
const FIELD_RADIUS = 9;
const AMBER_RATIO = 0.06; // "rare" amber particles
const LINE_DISTANCE_THRESHOLD = 1.15; // max distance to draw a connecting edge
const MAX_LINES = 900; // hard cap so the line buffer stays cheap on the CPU/GPU

/**
 * Seeded PRNG (mulberry32) — deterministic so the component stays pure.
 * Same seed → same sequence every render.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds the particle positions + per-vertex colors + sizes once.
 * Also derives a lightweight "network" of line segments between
 * nearby particles, capped so it never becomes an O(n^2) cost at runtime.
 */
function useFieldGeometry() {
  return useMemo(() => {
    const rand = mulberry32(42); // fixed seed → deterministic, pure

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const points: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute inside a soft sphere so the field reads as a "constellation"
      // rather than a flat cube of dots.
      const r = FIELD_RADIUS * Math.cbrt(rand());
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.55; // flatten vertically
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      points.push(new THREE.Vector3(x, y, z));

      const isAmber = rand() < AMBER_RATIO;
      const c = isAmber ? COLOR_AMBER : COLOR_TEAL;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = isAmber ? 0.055 : rand() * 0.03 + 0.02;
    }

    // Build a sparse network: sample a subset of points and connect them to
    // their nearest neighbours within a threshold distance. Capped at
    // MAX_LINES so the cost stays flat regardless of PARTICLE_COUNT.
    const linePositions: number[] = [];
    const sampleStep = Math.max(1, Math.floor(PARTICLE_COUNT / 500));

    outer: for (let i = 0; i < points.length; i += sampleStep) {
      for (let j = i + 1; j < Math.min(points.length, i + 40); j++) {
        if (linePositions.length / 6 >= MAX_LINES) break outer;
        const d = points[i].distanceTo(points[j]);
        if (d < LINE_DISTANCE_THRESHOLD) {
          linePositions.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
        }
      }
    }

    return {
      positions,
      colors,
      linePositions: new Float32Array(linePositions),
    };
  }, []);
}

export default function ParticleField() {
  const groupRef = useRef<THREE.Group>(null);
  const { positions, colors, linePositions } = useFieldGeometry();

  // Current damped rotation values, tracked outside React state to avoid
  // re-render cost — this is purely an animation-loop concern.
  const current = useRef({ x: 0, y: 0 });

  // Accumulated time (avoids THREE.Clock which is deprecated in r185+)
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    // Inverse relationship: mouse right -> field drifts/rotates left,
    // mouse up -> field drifts down. state.mouse is already normalized [-1, 1].
    const targetY = -state.mouse.x * 0.6; // rotation around Y (left/right)
    const targetX = state.mouse.y * 0.35; // rotation around X (up/down)

    // Smooth exponential damping so the scene glides rather than snaps.
    current.current.x = THREE.MathUtils.damp(current.current.x, targetX, 3, delta);
    current.current.y = THREE.MathUtils.damp(current.current.y, targetY, 3, delta);

    groupRef.current.rotation.x = current.current.x;
    groupRef.current.rotation.y = current.current.y;

    // A very slow ambient auto-rotation on top, so the scene never feels
    // static when the cursor is idle in the center.
    groupRef.current.rotation.y += Math.sin(elapsed.current * 0.02) * 0.0005;
  });

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.35}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Teal network connecting nearby particles */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={COLOR_LINE}
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}