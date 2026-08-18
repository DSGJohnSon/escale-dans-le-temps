import type { HomeData } from '@/types/home';

const placeholderImage = {
	src: '/images/placeholder.jpg',
	alt: 'Console ancienne repeinte en bleu nuit avec ferrures dorées, posée devant un mur en lambris blanc',
};

export const homeData: HomeData = {
	hero: {
		heading: [
			{ text: 'Redonnez à vos ' },
			{ text: 'meubles oubliés', emphasis: true },
			{ text: ' leur lumière passée.' },
		],
		description:
			"Chaque meuble a une histoire à raconter. Je redonne vie aux pièces anciennes grâce à la peinture, la patine et des finitions sur-mesure, pour qu'elles retrouvent toute leur splendeur.",
		primaryCta: { label: 'Voir la boutique', href: '/boutique' },
		secondaryCta: { label: 'Mes services', href: '#services' },
		image: {
			src: '/hero-header.webp',
			alt: 'Chevet ancien restauré en bleu nuit et dorures, avec un cadre orné, des pots de peinture et des pinceaux',
		},
	},

	ticker: {
		items: ['Peintures & vernis', 'Aérogommage', 'Sur-mesure', 'Rénovation de meubles', 'Patine à l’ancienne'],
	},

	artisan: {
		eyebrow: "L'artisane",
		heading: [{ text: 'Tatiana, ' }, { text: 'conteuse de meubles.', emphasis: true }],
		paragraphs: [
			"Après une longue carrière dans l'administration, j'ai choisi de me rapprocher d'une passion qui m'habitait depuis toujours : l'artisanat et la rénovation. Aujourd'hui, dans mon atelier, je redonne vie à des meubles anciens, parfois oubliés, parfois condamnés à finir à la déchèterie.",
			"Ma démarche est simple et sincère : offrir une seconde chance à ces objets du quotidien qui ont une mémoire, une patine, une histoire. À une époque où l'on jette trop vite, je restaure avec patience, avec soin, et avec un œil qui voit déjà ce qu'un meuble peut (re)devenir.",
		],
		badge: 'Une mission : redonner vie.',
		image: placeholderImage,
	},

	services: {
		eyebrow: 'Mon savoir-faire',
		heading: [{ text: 'Trois façons de faire ' }, { text: 'renaître', emphasis: true }, { text: ' un meuble.' }],
		description: 'Découvrez les trois services que je propose',
		items: [
			{
				number: 'I',
				eyebrow: 'Achat direct sur le site',
				title: 'Meubles déjà rénovés',
				description:
					'Craquez pour une pièce déjà restaurée et prête à rejoindre votre intérieur. Chaque meuble est unique et visible dès maintenant dans la boutique en ligne.',
				cta: { label: 'Voir la boutique', href: '/boutique' },
				image: {
					src: "/images/services-renovation-de-meubles-a-istres.webp",
					alt: "Services de rénovation de meubles à Istres, atelier artisanale de rénovation de meubles."
				},
			},
			{
				number: 'II',
				eyebrow: 'Nos meubles, vos envies',
				title: 'Rénovation à la carte',
				description:
					'Des meubles bruts (non rénovés) sont disponible à la réservation sur notre site web. Vous repérez chez nous un meuble brut qui vous plaît ? Commandez sa rénovation et nous le transformons selon vos goûts : couleurs, finitions, ornements.',
				cta: { label: 'Découvrir nos meubles bruts', href: '#' },
				image: {
					src: "/images/commode-brute_services-renovation-de-meubles-a-istres.webp",
					alt: "Services de rénovation de meubles à Istres, atelier artisanale de rénovation de meubles."
				},
			},
			{
				number: 'III',
				eyebrow: 'Votre meuble, notre savoir-faire',
				title: 'Sur-mesure',
				description:
					'Vous possédez déjà un meuble qui compte à vos yeux ? Offrez-lui une seconde vie grâce à un accompagnement sur-mesure, à l’image de votre intérieur.',
				cta: { label: 'Demander un devis', href: '#contact' },
				image: {
					src: "/images/services-renovation-de-meubles-sur-mesure--a-istres.webp",
					alt: "Services de rénovation de meubles sur mesure à Istres, atelier artisanale de rénovation de meubles."
				},
			},
		],
	},

	showcase: {
		eyebrow: 'Vitrine',
		heading: [
			{ text: 'Quelques pièces ' },
			{ text: 'en attente', emphasis: true },
			{ text: " d'un nouveau foyer..." },
		],
		cta: { label: 'Voir toutes les pièces', href: '/boutique' },
	},

	gallery: {
		eyebrow: 'Galerie',
		heading: [{ text: 'Le moment où ' }, { text: 'tout change.', emphasis: true }],
		description: "Découvrez l'avant/après de nos derniers meubles restaurés.",
	},

	contact: {
		eyebrow: 'Contact',
		heading: [{ text: 'Racontez-moi ' }, { text: 'votre projet.', emphasis: true }],
		description:
			"Décrivez le meuble à rénover et vos envies, ajoutez quelques photos si possible : je reviens vers vous avec un devis personnalisé.",
		form: {
			firstName: 'Prénom',
			lastName: 'Nom',
			email: 'E-mail',
			phone: 'Téléphone',
			contactMethodHint: 'Merci de renseigner au moins un moyen de vous recontacter.',
			project: 'Votre projet',
			photos: 'Photos du meuble',
			photosHint: 'JPG, PNG ou WEBP — 5 Mo max par photo, 6 photos max.',
			submit: 'Envoyer ma demande',
			submitting: 'Envoi en cours...',
			successHeading: 'Demande envoyée !',
			successMessage: 'Merci ! Votre demande a bien été envoyée, je vous réponds rapidement.',
			resetCta: 'Envoyer une nouvelle demande',
			errorMessage: 'Une erreur est survenue, merci de réessayer ou de me contacter directement.',
		},
	},
};
