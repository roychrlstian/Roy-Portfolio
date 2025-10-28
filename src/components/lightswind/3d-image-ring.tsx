"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, easeOut } from "framer-motion";
import { cn } from "../lib/utils"; // Assuming you have this utility for class names
import { animate } from "framer-motion";

export interface ThreeDImageRingProps {
  /** Array of image URLs to display in the ring */
  images: string[];
  /** Container width in pixels (will be scaled) */
  width?: number;
  height?: number;
  /** 3D perspective value */
  perspective?: number;
  /** Distance of images from center (z-depth) */
  imageDistance?: number;
  /** Initial rotation of the ring */
  initialRotation?: number;
  /** Animation duration for entrance */
  animationDuration?: number;
  /** Stagger delay between images */
  staggerDelay?: number;
  /** Custom container className */
  containerClassName?: string;
  /** Custom ring className */
  ringClassName?: string;
  /** Custom image className */
  imageClassName?: string;
  /** Background color of the stage */
  backgroundColor?: string;
  /** Enable/disable drag functionality */
  draggable?: boolean;
  /** Animation ease for entrance */
  ease?: string;
  /** Breakpoint for mobile responsiveness (e.g., 768 for iPad mini) */
  mobileBreakpoint?: number;
  /** Scale factor for mobile (e.g., 0.7 for 70% size) */
  mobileScaleFactor?: number;
  /** Power for the drag end inertia animation (higher means faster stop) */
  inertiaPower?: number;
  /** Time constant for the drag end inertia animation (duration of deceleration in ms) */
  inertiaTimeConstant?: number;
  /** Multiplier for initial velocity when drag ends (influences initial "spin") */
  inertiaVelocityMultiplier?: number;
  /** How images should fit inside each panel */
  imageFit?: 'cover' | 'contain';
  /** Maximum texture size (px) to limit large image usage for performance */
  maxTextureSize?: number;
}

export function ThreeDImageRing({
  images,
  width = 300,
  height = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  ease = "easeOut",
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = -10, // Default power for inertia
  inertiaTimeConstant = 200, // Default time constant for inertia
  inertiaVelocityMultiplier = 0, // Default multiplier for initial spin
  imageFit = 'cover',
  maxTextureSize = 1024,
}: ThreeDImageRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const velocity = useRef<number>(0); // To track drag velocity

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  const cappedTextureSize = useMemo(() => Math.max(512, Math.min(2048, maxTextureSize)), [maxTextureSize]);

  const getBgPos = useCallback((imageIndex: number, currentRot: number, scale: number) => {
    const scaledImageDistance = imageDistance * scale;
    const effectiveRotation = currentRot - 180 - imageIndex * angle;
    const parallaxOffset = ((effectiveRotation % 360 + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
  }, [imageDistance, angle]);

  useEffect(() => {
    if (imageFit === 'contain') {
      // Skip parallax updates; keep images centered
      const unsubscribe = rotationY.on("change", (latestRotation) => {
        currentRotationY.current = latestRotation;
      });
      return () => unsubscribe();
    }
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          (imgElement as HTMLElement).style.backgroundPosition = getBgPos(
            i,
            latestRotation,
            currentScale
          );
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, images.length, imageDistance, currentScale, angle, imageFit, getBgPos]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    // Stop any ongoing animation instantly when drag starts
    rotationY.stop();
    velocity.current = 0; // Reset velocity
    if (ringRef.current) {
      (ringRef.current as HTMLElement).style.cursor = "grabbing";
    }
    // Attach global move and end listeners to document when dragging starts
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    // Only proceed if dragging is active
    if (!draggable || !isDragging.current) return;

    const clientX = "touches" in event ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    const deltaX = clientX - startX.current;

    // Update velocity based on deltaX
    velocity.current = -deltaX * 0.5; // Factor of 0.5 to control sensitivity

    rotationY.set(currentRotationY.current + velocity.current);

    startX.current = clientX;
  };

const handleDragEnd = () => {
  isDragging.current = false;
  if (ringRef.current) {
    ringRef.current.style.cursor = "grab";
    currentRotationY.current = rotationY.get();
  }

  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", handleDragEnd);
  document.removeEventListener("touchmove", handleDrag);
  document.removeEventListener("touchend", handleDragEnd);

  const initial = rotationY.get();
  const velocityBoost = velocity.current * inertiaVelocityMultiplier;
  const target = initial + velocityBoost;

  // Animate with inertia manually using `animate()`
  animate(initial, target, {
    type: "inertia",
    velocity: velocityBoost,
    power: inertiaPower,
    timeConstant: inertiaTimeConstant,
    restDelta: 0.5,
    modifyTarget: (target) => Math.round(target / angle) * angle,
    onUpdate: (latest) => {
      rotationY.set(latest);
    },
  });

  velocity.current = 0;
};


  // Corrected imageVariants: no function for 'visible' state
  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      // Transition properties will be defined directly on the motion.div using `custom` prop
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden select-none relative",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      // Attach initial drag start listeners only
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${height}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn(
            "w-full h-full absolute",
            ringClassName
          )}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <AnimatePresence>
            {showImages && images.map((imageUrl, index) => {
              const normalizedSrc = (() => {
                if (!imageUrl) return imageUrl;
                // If it's already an absolute URL or data URL, use as-is
                if (/^(https?:)?\/\//.test(imageUrl) || imageUrl.startsWith('data:')) return imageUrl;
                // Ensure public/ paths are rooted at '/'
                return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
              })();

              return (
              <motion.div
                key={index}
                className={cn(
                  "w-full h-full absolute",
                  imageClassName,
                )}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  rotateY: index * -angle,
                  z: -imageDistance * currentScale,
                  transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={imageVariants}
                custom={index}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: ease === 'easeOut' ? easeOut : undefined,
                }}
              >
                <div style={{ position: 'absolute', inset: 0 }}>
                  <Image
                    src={normalizedSrc}
                    alt={`carousel-${index}`}
                    fill
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ objectFit: imageFit as 'cover' | 'contain', objectPosition: imageFit === 'contain' ? 'center center' : getBgPos(index, currentRotationY.current, currentScale) }}
                    sizes={`${Math.min(width, cappedTextureSize)}px`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                  />
                </div>
              </motion.div>
            );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default ThreeDImageRing;
