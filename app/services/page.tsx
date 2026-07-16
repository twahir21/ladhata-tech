"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  tag: string;
}

export default function ServiceCard({ title, description, tag }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values to track absolute mouse coordinates inside the card container
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jerky rotations
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Map mouse coordinate values to degrees of rotation (-15deg to 15deg max)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the center of the card (-0.5 to 0.5 range)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // Return card to resting position
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-1000" // Enables 3D camera depth context
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-80 h-96 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between cursor-pointer overflow-hidden group shadow-2xl transition-colors duration-300 hover:border-teal-500/50"
      >
        {/* Glow backdrop moving behind text */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div style={{ transform: "translateZ(50px)" }}>
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
            {tag}
          </span>
          <h3 className="mt-4 text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>

        <div 
          style={{ transform: "translateZ(30px)" }}
          className="flex items-center justify-between mt-6 text-sm text-zinc-300 font-medium group-hover:text-teal-400 transition-colors"
        >
          <span>Explore Product</span>
          <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </motion.div>
    </div>
  );
}