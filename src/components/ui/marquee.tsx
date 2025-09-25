"use client";

import React from 'react';

type MarqueeProps = {
	children: React.ReactNode;
	/** animation duration in seconds (default: 12) */
	speed?: number;
	/** additional tailwind or class names for the outer container */
	className?: string;
	/** text size class, default to Tailwind text-4xl */
	textClass?: string;
};

/**
 * Reusable marquee component.
 * - Defaults to `text-4xl` for content
 * - Respects `prefers-reduced-motion`
 * - Accepts `speed` in seconds to control animation duration
 */
export default function Marquee({
	children,
	speed = 12,
	className = '',
	textClass = 'text-4xl',
}: MarqueeProps) {
	// We'll duplicate the content to create a seamless loop
	return (
			<div className={`marquee overflow-hidden whitespace-nowrap w-full ${className}`} role="marquee" aria-label="Scrolling content">
				<div className="marquee__track inline-flex items-center" style={{ animationDuration: `${speed}s` }}>
					<div className={`marquee__group inline-flex items-center gap-8 ${textClass}`}>{children}</div>
					<div className={`marquee__group inline-flex items-center gap-8 ${textClass}`}>{children}</div>
				</div>
			</div>
	);
}
