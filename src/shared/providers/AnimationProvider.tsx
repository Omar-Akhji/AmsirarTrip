"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import React from "react";

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
