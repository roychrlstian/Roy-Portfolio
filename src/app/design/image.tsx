// Centralized image path exports for the Design page sections
// Keeping arrays flat & simple so they are easy to extend / reorder.

export const triadImages = {
	announcements: [
		'optimized/triad/announcement/8-1600.webp',
        'optimized/triad/announcement/1-1600.webp',
		'optimized/triad/announcement/2-1600.webp',
		'optimized/triad/announcement/3-1600.webp',
		'optimized/triad/announcement/4-1600.webp',
		'optimized/triad/announcement/5-1600.webp',
		'optimized/triad/announcement/6-1600.webp',
		'optimized/triad/announcement/7-1600.webp',
        'optimized/triad/announcement/8-1600.webp',
        'optimized/triad/announcement/1-1600.webp',
		'optimized/triad/announcement/2-1600.webp',
		'optimized/triad/announcement/3-1600.webp',
		'optimized/triad/announcement/4-1600.webp',
		'optimized/triad/announcement/5-1600.webp',
		'optimized/triad/announcement/6-1600.webp',
	],
	events: [
		'optimized/triad/event/1-1600.webp',
		'optimized/triad/event/2-1600.webp',
		'optimized/triad/event/3-1600.webp',
		'optimized/triad/event/4-1600.webp',
		'optimized/triad/event/5-1080.webp',
		'optimized/triad/event/6-1600.webp',
        'optimized/triad/event/1-1600.webp',
		'optimized/triad/event/2-1600.webp',
		'optimized/triad/event/3-1600.webp',
		'optimized/triad/event/4-1600.webp',
		'optimized/triad/event/5-1080.webp',
		'optimized/triad/event/6-1600.webp',
	],
};

export const lcupImages = {
	publicMaterials: [
		'optimized/lcup/1-1600.webp',
		'optimized/lcup/2-1600.webp',
		'optimized/lcup/3-1600.webp',
		'optimized/lcup/4-1600.webp',
		'optimized/lcup/5-1600.webp',
		'optimized/lcup/6-1600.webp',
		'optimized/lcup/7-1600.webp',
		'optimized/lcup/8-1600.webp',
		'optimized/lcup/9-1600.webp',
		'optimized/lcup/10-1600.webp',
		'optimized/lcup/11-1600.webp',
		'optimized/lcup/12-1600.webp',
		'optimized/lcup/13-1600.webp',
		'optimized/lcup/14-1600.webp',
		'optimized/lcup/15-1600.webp',
	],
};

export const freelanceImages = {
	logos: [
		'optimized/freelance/logo/1-1600.webp',
		'optimized/freelance/logo/2-1600.webp',
		'optimized/freelance/logo/3-1600.webp',
		'optimized/freelance/logo/4-1600.webp',
		'optimized/freelance/logo/5-1600.webp',
        'optimized/freelance/logo/1-1600.webp',
		'optimized/freelance/logo/2-1600.webp',
		'optimized/freelance/logo/3-1600.webp',
		'optimized/freelance/logo/4-1600.webp',
		'optimized/freelance/logo/5-1600.webp',
        'optimized/freelance/logo/1-1600.webp',
		'optimized/freelance/logo/2-1600.webp',
		'optimized/freelance/logo/3-1600.webp',
		'optimized/freelance/logo/4-1600.webp',
		'optimized/freelance/logo/5-1600.webp',
	],
	banners: [
		'optimized/freelance/banner/1-1600.webp',
		'optimized/freelance/banner/2-1600.webp',
		'optimized/freelance/banner/3-1600.webp',
		'optimized/freelance/banner/4-1600.webp',
		'optimized/freelance/banner/5-1600.webp',
		'optimized/freelance/banner/6-1600.webp',
		'optimized/freelance/banner/7-1600.webp',
        'optimized/freelance/banner/1-1600.webp',
		'optimized/freelance/banner/2-1600.webp',
		'optimized/freelance/banner/3-1600.webp',
		'optimized/freelance/banner/4-1600.webp',
		'optimized/freelance/banner/5-1600.webp',
		'optimized/freelance/banner/6-1600.webp',
		'optimized/freelance/banner/7-1600.webp',
	],
};

// Shared defaults for ThreeDImageRing across sections
export const ringDefaults = {
	containerClassName: 'h-[420px] overflow-hidden',
	width: 420,
	height: 440,
	imageDistance: 1000,
	inertiaPower: 0.01,
	initialRotation: 0,
	imageFit: 'contain' as const,
};

// Section configs describing how to build CarouselContainer items
export const sectionConfigs: {
	triad: SectionItemConfig[];
	lcup: SectionItemConfig[];
	freelance: SectionItemConfig[];
} = {
	triad: [
		{
			title: 'Announcements',
			wrapperClassName: 'py-10',
			images: triadImages.announcements,
		},
		{
			title: 'Events',
			wrapperClassName: 'py-15',
			images: triadImages.events,
			ringOverrides: { width: 450, height: 550 },
		},
	],
	lcup: [
		{
			title: 'Public Materials',
			wrapperClassName: 'py-10',
			images: lcupImages.publicMaterials,
		},
	],
	freelance: [
		{
			title: 'Logo',
			images: freelanceImages.logos,
		},
		{
			title: 'Banners',
			wrapperClassName: 'py-10',
			images: freelanceImages.banners,
		},
	],
};

export interface SectionItemConfig {
	title: string;
	images: string[];
	wrapperClassName?: string;
	ringOverrides?: Partial<typeof ringDefaults>;
}

