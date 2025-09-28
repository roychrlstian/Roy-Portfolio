// Centralized image path exports for the Design page sections
// Keeping arrays flat & simple so they are easy to extend / reorder.

export const triadImages = {
	announcements: [
		// NOTE: Static assets must live under /public. So these paths
		// assume files are located at public/triad/announcement/*.jpg
		// If you currently have them inside src/app/design/images/** move them to /public/triad/announcement
		'/triad/announcement/1.jpg',
		'/triad/announcement/2.jpg',
		'/triad/announcement/3.jpg',
		'/triad/announcement/4.jpg',
		'/triad/announcement/5.jpg',
		'/triad/announcement/6.jpg',
		'/triad/announcement/7.jpg',
	],
	events: [
		'/triad/event/1.jpg',
		'/triad/event/2.jpg',
		'/triad/event/3.jpg',
		'/triad/event/4.jpg',
		'/triad/event/5.png',
		'/triad/event/6.jpg',
	],
};

export const lcupImages = {
	publicMaterials: [
		'/lcup/1.jpg',
		'/lcup/2.jpg',
		'/lcup/3.jpg',
		'/lcup/4.jpg',
		'/lcup/5.jpg',
		'/lcup/6.jpg',
		'/lcup/7.jpg',
		'/lcup/8.jpg',
		'/lcup/9.jpg',
		'/lcup/10.jpg',
		'/lcup/11.jpg',
		'/lcup/12.jpg',
		'/lcup/13.jpg',
		'/lcup/14.jpg',
		'/lcup/15.jpg',
	],
};

export const freelanceImages = {
	logos: [
		'/freelance/logo/1.png',
		'/freelance/logo/2.jpg',
		'/freelance/logo/3.jpg',
		'/freelance/logo/4.jpg',
		'/freelance/logo/5.jpg',
	],
	banners: [
		'/freelance/banner/1.jpg',
		'/freelance/banner/2.jpg',
		'/freelance/banner/3.jpg',
		'/freelance/banner/4.jpg',
		'/freelance/banner/5.jpg',
		'/freelance/banner/6.jpg',
		'/freelance/banner/7.jpg',
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

