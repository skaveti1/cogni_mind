"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={`stagger ${inView ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
