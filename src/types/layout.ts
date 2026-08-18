import type { CallToAction } from '@/types/content';

export interface NavLink {
	label: string;
	href: string;
}

export interface SiteBranding {
	name: string;
	tagline: string;
}

export interface HeaderContent {
	branding: SiteBranding;
	navLinks: NavLink[];
	cta: CallToAction;
}
