"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import React from "react";

/**
 * Dynamics loading for animation features reduces initial bundle size by ~30KB
 * by deferring the loading of the Motion animation engine.
 */
const loadFeatures = () =>
  import("motion/react").then((res) => res.domAnimation);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
