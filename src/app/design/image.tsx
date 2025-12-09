// Centralized image path exports for the Design page sections
// Keeping arrays flat & simple so they are easy to extend / reorder.
// Shared defaults for ThreeDImageRing across sections

import { supabaseServer } from '@/lib/supabaseServer'

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
// We export an async getter so the Design page can fetch images from the `design_images` table
// while still falling back to the static arrays when the DB is not reachable.
export async function getSectionConfigs(): Promise<{
	triad: SectionItemConfig[];
	lcup: SectionItemConfig[];
	freelance: SectionItemConfig[];
}> {
	// We'll list files directly from the `design-assets` storage bucket. This reads the known prefixes
	// and returns their public URLs. If the bucket access fails, we return empty arrays for each section.
	try {
		const bucket = 'design-assets'
		const prefixes = {
			triadAnnouncements: 'triad/announcement',
			triadEvents: 'triad/event',
			lcupPublic: 'lcup',
			freelanceLogos: 'freelance/logo',
			freelanceBanners: 'freelance/banner',
		}

		const listAndMap = async (prefix: string) => {
			const { data: files, error } = await supabaseServer.storage.from(bucket).list(prefix)
			if (error || !files) return [] as string[]
			// sort by name for deterministic order
			const sorted = files.slice().sort((a, b) => (a.name > b.name ? 1 : -1))
			return sorted.map(f => {
				const path = `${prefix}/${f.name}`
				const { data: publicData } = supabaseServer.storage.from(bucket).getPublicUrl(path)
				return publicData?.publicUrl ?? ''
			}).filter(Boolean)
		}

		const [triadAnnouncementsRaw, triadEventsRaw, lcupPublicRaw, freelanceLogosRaw, freelanceBannersRaw] = await Promise.all([
			listAndMap(prefixes.triadAnnouncements),
			listAndMap(prefixes.triadEvents),
			listAndMap(prefixes.lcupPublic),
			listAndMap(prefixes.freelanceLogos),
			listAndMap(prefixes.freelanceBanners),
		])

		const expandForVisual = (arr: string[] | undefined) => {
			if (!arr || arr.length === 0) return [] as string[]
			// If less than 10, duplicate at least once (render 2x) and keep duplicating until length >= 10
			if (arr.length < 10) {
				let res = arr.concat(arr)
				while (res.length < 10) res = res.concat(arr)
				return res
			}
			return arr
		}

		const triadAnnouncements = expandForVisual(triadAnnouncementsRaw)
		const triadEvents = expandForVisual(triadEventsRaw)
		const lcupPublic = expandForVisual(lcupPublicRaw)
		const freelanceLogos = expandForVisual(freelanceLogosRaw)
		const freelanceBanners = expandForVisual(freelanceBannersRaw)

		return {
			triad: [
				{ title: 'Announcements', wrapperClassName: 'py-10', images: triadAnnouncements },
				{ title: 'Events', wrapperClassName: 'py-15', images: triadEvents, ringOverrides: { width: 450, height: 550 } },
			],
			lcup: [
				{ title: 'Public Materials', wrapperClassName: 'py-10', images: lcupPublic },
			],
			freelance: [
				{ title: 'Logo', images: freelanceLogos },
				{ title: 'Banners', wrapperClassName: 'py-10', images: freelanceBanners },
			],
		}
	} catch (err) {
		console.error('Error listing storage bucket design-assets; returning empty image lists', err)
		return {
			triad: [
				{ title: 'Announcements', wrapperClassName: 'py-10', images: [] },
				{ title: 'Events', wrapperClassName: 'py-15', images: [], ringOverrides: { width: 450, height: 550 } },
			],
			lcup: [
				{ title: 'Public Materials', wrapperClassName: 'py-10', images: [] },
			],
			freelance: [
				{ title: 'Logo', images: [] },
				{ title: 'Banners', wrapperClassName: 'py-10', images: [] },
			],
		}
	}
}

export interface SectionItemConfig {
	title: string;
	images: string[];
	wrapperClassName?: string;
	ringOverrides?: Partial<typeof ringDefaults>;
}

