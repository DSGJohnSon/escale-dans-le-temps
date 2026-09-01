import type { HeaderContent } from '@/types/layout';

export const headerContent: HeaderContent = {
	branding: {
		name: "Escale dans le temps",
		tagline: 'Rénovation de meubles',
	},
	navLinks: [
		{ label: 'Accueil', href: '/' },
		{ label: 'Services', href: '/#services' },
		{ label: 'Boutique', href: '/boutique' },
		{ label: 'Galerie', href: '/galerie' },
	],
	cta: {
		label: 'Demande de devis',
		href: '/#contact',
	},
};
