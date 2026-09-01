import type { BoutiqueContent } from '@/types/boutique';

export const boutiqueContent: BoutiqueContent = {
	eyebrow: 'Boutique',
	heading: [{ text: 'Nos meubles ' }, { text: 'à adopter.', emphasis: true }],
	description:
		'Meubles déjà rénovés, prêts à rejoindre votre intérieur, ou pièces brutes à personnaliser selon vos envies.',
	renovatedSection: {
		title: 'Meubles déjà rénovés',
		description: 'Restaurés avec soin, prêts à être livrés.',
	},
	rawSection: {
		title: 'Meubles bruts',
		description: 'À personnaliser selon vos goûts : couleurs, finitions, ornements.',
	},
	emptyMessage: 'Aucune pièce disponible pour le moment dans cette catégorie.',
	backToBoutique: 'Retour à la boutique',
	reservationForm: {
		title: 'Cette pièce vous intéresse ?',
		description: 'Laissez-nous vos coordonnées, nous revenons vers vous rapidement pour organiser la réservation.',
		firstName: 'Prénom',
		lastName: 'Nom',
		email: 'E-mail',
		phone: 'Téléphone',
		message: 'Message',
		messageHint: 'Facultatif',
		submit: 'Je suis intéressé(e)',
		submitting: 'Envoi en cours...',
		successHeading: 'Demande envoyée !',
		successMessage: 'Merci, nous revenons vers vous rapidement pour organiser la réservation.',
		resetCta: 'Envoyer une nouvelle demande',
		errorMessage: 'Une erreur est survenue, merci de réessayer ou de nous contacter directement.',
	},
	quoteForm: {
		title: 'Envie de faire rénover cette pièce ?',
		description:
			'Dites-nous comment vous l’imaginez (couleurs, finitions, ornements). Nous revenons vers vous avec une proposition et un devis personnalisé.',
		firstName: 'Prénom',
		lastName: 'Nom',
		email: 'E-mail',
		phone: 'Téléphone',
		message: 'Votre projet',
		messageHint: 'Facultatif',
		messagePlaceholder: 'Couleurs, finitions, style souhaité, délais…',
		submit: 'Demander un devis',
		submitting: 'Envoi en cours...',
		successHeading: 'Demande envoyée !',
		successMessage: 'Merci, nous revenons vers vous très vite avec une proposition personnalisée.',
		resetCta: 'Envoyer une nouvelle demande',
		errorMessage: 'Une erreur est survenue, merci de réessayer ou de nous contacter directement.',
	},
};
