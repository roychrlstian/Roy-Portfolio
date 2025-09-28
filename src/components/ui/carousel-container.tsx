import React from 'react';
import { ThreeDImageRing, ThreeDImageRingProps } from '../lightswind/3d-image-ring';
import { cn } from '../lib/utils';

export interface CarouselItem {
  /** Heading displayed above the ring */
  title: string;
  /** Props passed to the ThreeDImageRing component */
  ringProps: ThreeDImageRingProps;
  /** Optional wrapper around the ring (e.g. spacing like py-10) */
  wrapperClassName?: string;
  /** Override default title class */
  titleClassName?: string;
  /** Force a top divider (border + spacing). By default added for all but first item. */
  divider?: boolean;
  /** Disable top divider even if not first */
  noDivider?: boolean;
  /** Optional element rendered above the title (badge, tag, etc.) */
  beforeTitle?: React.ReactNode;
  /** Optional element rendered after the title */
  afterTitle?: React.ReactNode;
}

export interface CarouselContainerProps {
  /** Array of carousel items */
  items: CarouselItem[];
  /** Outer wrapper classes (borders & padding). */
  outerClassName?: string;
  /** Wrapper class for the list of items (spacing). */
  itemsWrapperClassName?: string;
  /** Default title class applied to each item title */
  defaultTitleClassName?: string;
  /** If true, removes the outer border & padding shell */
  bare?: boolean;
}

/**
 * Reusable container for one or more 3D image ring carousels with consistent styling.
 * Handles:
 *  - Outer bordered section styling
 *  - Optional dividers between items
 *  - Per-item customization for spacing & classes
 */
export function CarouselContainer({
  items,
  outerClassName,
  itemsWrapperClassName = 'space-y-10',
  defaultTitleClassName = 'text-2xl font-bold mb-4',
  bare = false,
}: CarouselContainerProps) {
  return (
    <div className={cn(!bare && 'mt-6 border-y border-white/6 py-6', outerClassName)}>
      <div className={cn(itemsWrapperClassName)}>
        {items.map((item, i) => {
          const showDivider = i > 0 && !item.noDivider && (item.divider ?? true);
          return (
            <div
              key={i}
              className={cn(
                showDivider && 'mt-6 border-t border-white/6 pt-6'
              )}
            >
              {item.beforeTitle}
              <h2 className={cn(defaultTitleClassName, item.titleClassName)}>{item.title}</h2>
              {item.afterTitle}
              <div className={item.wrapperClassName}>
                <ThreeDImageRing {...item.ringProps} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarouselContainer;
