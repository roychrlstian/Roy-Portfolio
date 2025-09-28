"use client";
import React, { useEffect, useRef, useState } from 'react';

type Variant = 'fade-up' | 'fade-in' | 'scale-in';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  rootMargin?: string; // e.g. '0px 0px -10% 0px'
  /** IntersectionObserver threshold(s). Ignored if showAt provided. */
  threshold?: number | number[];
  once?: boolean; // if true, animation won't reset when leaving viewport
  delayMs?: number; // delay before showing after intersecting
  /** Ratio (0-1) of element visibility required to trigger show (hysteresis). Default 0.15 */
  showAt?: number;
  /** If true, hide only when completely out of viewport (intersection ratio === 0). Default true */
  hideWhenFullyOut?: boolean;
}

const HIDDEN: Record<Variant, string> = {
  'fade-up': 'opacity-0 translate-y-8',
  'fade-in': 'opacity-0',
  'scale-in': 'opacity-0 scale-[0.95]'
};

const VISIBLE: Record<Variant, string> = {
  'fade-up': 'opacity-100 translate-y-0',
  'fade-in': 'opacity-100',
  'scale-in': 'opacity-100 scale-100'
};

export default function Reveal({
  children,
  className = '',
  variant = 'fade-up',
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.15,
  once = false,
  delayMs = 0,
  showAt,
  hideWhenFullyOut = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [everVisible, setEverVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const showRatio = showAt ?? (Array.isArray(threshold) ? Math.min(...threshold) : threshold);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const ratio = entry.intersectionRatio;
          if (ratio >= showRatio) {
            if (!visible) {
              setVisible(true);
              setEverVisible(true);
            }
          } else {
            // Hide conditions
            if (!once) {
              if (hideWhenFullyOut) {
                if (ratio === 0) setVisible(false);
              } else if (ratio < showRatio * 0.5) {
                // fallback: hide when far below show threshold
                setVisible(false);
              }
            }
          }
        });
      },
      { root: null, rootMargin, threshold: buildThresholdArray(showRatio) }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once, showAt, hideWhenFullyOut, visible]);

  // handle delay when becoming visible
  const [delayedVisible, setDelayedVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setDelayedVisible(true), delayMs);
      return () => clearTimeout(t);
    } else {
      setDelayedVisible(false);
    }
  }, [visible, delayMs]);

  const base = 'transition-all duration-700 ease-out will-change-transform';
  const stateClass = (once && everVisible) || delayedVisible ? VISIBLE[variant] : HIDDEN[variant];

  return (
    <div ref={ref} className={`${base} ${stateClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}

// Build a more granular threshold list so we can detect fine-grained ratio changes without performance issues
function buildThresholdArray(showRatio: number) {
  const steps = 20;
  const thresholds: number[] = [];
  for (let i = 0; i <= steps; i++) {
    thresholds.push(i / steps);
  }
  if (!thresholds.includes(showRatio)) thresholds.push(showRatio);
  return thresholds.sort((a, b) => a - b);
}
