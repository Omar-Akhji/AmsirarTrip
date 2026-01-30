"use client";

import { LazyMotion, domAnimation } from "motion/react";
import React from "react";

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
