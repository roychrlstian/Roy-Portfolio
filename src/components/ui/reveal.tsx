"use client";
import React, { useEffect, useRef, useState } from 'react';

type Variant = 'fade-up' | 'fade-in' | 'scale-in';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  rootMargin?: string; // e.g. '0px 0px -10% 0px'
  threshold?: number | number[];
  once?: boolean; // if true, animation won't reset when leaving viewport
  delayMs?: number; // delay before showing after intersecting
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
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [everVisible, setEverVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            setEverVisible(true);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

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
