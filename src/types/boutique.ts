import type { HeadingSegment } from '@/types/content';

export interface BoutiqueCategorySection {
	title: string;
	description: string;
}

export interface ReservationFormLabels {
	title: string;
	description: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
	messageHint: string;
	/** Texte d'exemple du champ message. Défaut : « Une question sur « <produit> » ? ». */
	messagePlaceholder?: string;
	submit: string;
	submitting: string;
	successHeading: string;
	successMessage: string;
	resetCta: string;
	errorMessage: string;
}

export interface BoutiqueContent {
	eyebrow: string;
	heading: HeadingSegment[];
	description: string;
	renovatedSection: BoutiqueCategorySection;
	rawSection: BoutiqueCategorySection;
	emptyMessage: string;
	backToBoutique: string;
	reservationForm: ReservationFormLabels;
	/** Variante du formulaire pour les pièces « Sur devis » (demande de rénovation personnalisée). */
	quoteForm: ReservationFormLabels;
}
