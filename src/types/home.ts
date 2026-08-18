import type { CallToAction, HeadingSegment, ImageAsset } from '@/types/content';

export interface HeroContent {
	heading: HeadingSegment[];
	description: string;
	primaryCta: CallToAction;
	secondaryCta: CallToAction;
	image: ImageAsset;
}

export interface TickerContent {
	items: string[];
}

export interface ArtisanContent {
	eyebrow: string;
	heading: HeadingSegment[];
	paragraphs: string[];
	badge: string;
	image: ImageAsset;
}

export interface ServiceItem {
	number: string;
	eyebrow: string;
	title: string;
	description: string;
	cta: CallToAction;
	image: ImageAsset;
}

export interface ServicesContent {
	eyebrow: string;
	heading: HeadingSegment[];
	description: string;
	items: ServiceItem[];
}

export interface ShowcaseContent {
	eyebrow: string;
	heading: HeadingSegment[];
	cta: CallToAction;
}

export interface GalleryContent {
	eyebrow: string;
	heading: HeadingSegment[];
	description: string;
}

export interface ContactFormLabels {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	contactMethodHint: string;
	project: string;
	photos: string;
	photosHint: string;
	submit: string;
	submitting: string;
	successHeading: string;
	successMessage: string;
	resetCta: string;
	errorMessage: string;
}

export interface ContactContent {
	eyebrow: string;
	heading: HeadingSegment[];
	description: string;
	form: ContactFormLabels;
}

export interface HomeData {
	hero: HeroContent;
	ticker: TickerContent;
	artisan: ArtisanContent;
	services: ServicesContent;
	showcase: ShowcaseContent;
	gallery: GalleryContent;
	contact: ContactContent;
}
