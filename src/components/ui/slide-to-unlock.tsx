"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface SlideToUnlockProps {
  onComplete?: () => void;
  label?: string;
  successLabel?: string;
  className?: string;
  completeDelayMs?: number; // delay before firing onComplete (ms)
  threshold?: number; // 0..1 percent required to complete (default .85)
}

// Accessible, keyboard-enabled "slide to unlock" style CTA.
// Drag (pointer) or press ArrowRight to advance; Space/Enter completes instantly.
const SlideToUnlock: React.FC<SlideToUnlockProps> = ({
  onComplete,
  label = 'Slide to unlock',
  successLabel = 'Unlocked',
  className = '',
  completeDelayMs = 120,
  threshold = 0.85,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [lockedWidth, setLockedWidth] = useState<number | null>(null); // lock width after completion
  const startX = useRef(0);
  const startProgress = useRef(0);

  // Derived pixel metrics
  const computeProgressFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current || !handleRef.current) return 0;
    const trackRect = trackRef.current.getBoundingClientRect();
    const handleRect = handleRef.current.getBoundingClientRect();
    const usable = trackRect.width - handleRect.width - 8; // padding (4px each side)
    const delta = clientX - startX.current;
    const px = Math.min(Math.max(startProgress.current * usable + delta, 0), usable);
    return usable === 0 ? 0 : px / usable;
  }, []);

  const finishComplete = useCallback(() => {
    if (completed) return;
    if (trackRef.current && lockedWidth == null) {
      setLockedWidth(trackRef.current.offsetWidth);
    }
    setCompleted(true);
    setProgress(1);
    // small delay for UX before navigation/action
    setTimeout(() => {
      onComplete?.();
    }, completeDelayMs);
  }, [completed, onComplete, completeDelayMs, lockedWidth]);

  const startDrag = (clientX: number) => {
    setDragging(true);
    startX.current = clientX;
    startProgress.current = progress;
  };

  const updateDrag = React.useCallback((clientX: number) => {
    setProgress(computeProgressFromClientX(clientX));
  }, [computeProgressFromClientX]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (completed) return;
    startDrag(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || completed) return;
    updateDrag(e.clientX);
  };

  const cancelDrag = React.useCallback((clientX?: number) => {
    if (!dragging) return;
    setDragging(false);
    if (completed) return;
    let p = progress;
    if (typeof clientX === 'number') {
      p = computeProgressFromClientX(clientX);
    }
    if (p >= threshold) {
      finishComplete();
    } else {
      // animate back
      setProgress(0);
    }
  }, [dragging, completed, progress, computeProgressFromClientX, threshold, finishComplete]);

  const handlePointerUp = (e: React.PointerEvent) => {
    cancelDrag(e.clientX);
  };

  useEffect(() => {
    const handleWindowUp = (e: PointerEvent) => dragging && cancelDrag(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging || completed) return;
      // prevent vertical scroll while dragging horizontally
      if (e.cancelable) e.preventDefault();
      updateDrag(e.touches[0].clientX);
    };
    const handleTouchEnd = (e: TouchEvent) => dragging && cancelDrag(e.changedTouches[0]?.clientX);
    window.addEventListener('pointerup', handleWindowUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    return () => {
      window.removeEventListener('pointerup', handleWindowUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [dragging, completed, updateDrag, cancelDrag]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (completed) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setProgress(p => Math.min(1, p + 0.1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setProgress(p => Math.max(0, p - 0.1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      finishComplete();
    }
  };

  // auto-complete if progress achieved via keys
  useEffect(() => {
    if (!completed && progress >= threshold) {
      finishComplete();
    }
  }, [progress, completed, threshold, finishComplete]);

  const pct = Math.round(progress * 100);

  return (
    <div
      className={`select-none ${className}`}
      aria-label={completed ? successLabel : label}
    >
      <div
        ref={trackRef}
        className={`relative inline-block h-14 rounded-full overflow-hidden bg-white shadow-inner pl-16 pr-8 touch-action-none`}
        style={lockedWidth != null ? { width: lockedWidth } : undefined}
        onPointerDown={(e) => {
          // Allow starting drag from empty track area (not just handle)
          if (completed) return;
          const handle = handleRef.current;
          if (handle && e.target !== handle) {
            startDrag(e.clientX);
          }
        }}
        onTouchStart={(e) => {
          if (completed) return;
          const t = e.touches[0];
          startDrag(t.clientX);
        }}
      >
        {/* Center label in normal flow so container hugs content */}
        <div className={`flex items-center justify-center h-full font-medium text-sm md:text-base text-black select-none transition-opacity duration-300 ${completed ? 'opacity-100' : 'opacity-90'}`}>
          {completed ? successLabel : label}
        </div>
        {/* Handle */}
        <button
          ref={handleRef}
            type="button"
            aria-label={completed ? successLabel : label}
            disabled={completed}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchStart={(e) => {
              if (completed) return;
              const t = e.touches[0];
              startDrag(t.clientX);
            }}
            onTouchMove={(e) => {
              if (!dragging || completed) return;
              const t = e.touches[0];
              if (e.cancelable) e.preventDefault();
              updateDrag(t.clientX);
            }}
            onTouchEnd={(e) => {
              const t = e.changedTouches[0];
              cancelDrag(t?.clientX);
            }}
            onKeyDown={handleKeyDown}
            className={`group absolute top-1 left-1 h-12 w-12 rounded-full flex items-center justify-center font-semibold text-white shadow-lg shadow-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer select-none transition-colors touch-action-none ${completed ? 'bg-[#0B1019]' : dragging ? 'bg-[#0f1724]' : 'bg-[#0B1019] hover:bg-[#0f1724]'}`}
            style={{
              // Move handle across usable width (trackPadding + (trackWidth - handleWidth - 2*padding) * progress)
              left: `calc(4px + (100% - 56px - 8px) * ${progress})`, // 56px ~ handle outer width, 8px total side padding
            }}
        >
          <span className="transition-transform duration-300 group-active:scale-90">→</span>
        </button>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {completed ? successLabel : `${pct}%`}
      </div>
    </div>
  );
};

export default SlideToUnlock;
