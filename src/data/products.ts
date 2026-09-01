import { slugify } from '@/lib/slugify';
import type { Product, ProductInput } from '@/types/product';

const placeholderImage = {
	src: '/images/placeholder.jpg',
	alt: 'Console ancienne repeinte en bleu nuit avec ferrures dorées, posée devant un mur en lambris blanc',
};

const rawProducts: ProductInput[] = [
	{
		name: 'Sylvianne',
		subtitle: 'Confiturier',
		category: 'Rénovés',
		status: 'Indisponible',
		addedAt: '2026-08-20',
		dimensions: { height: 60, width: 45, length: 38 },
		price: 320,
		description:
			"Chevet en chêne massif, style Louis Philippe. Entièrement repeint en bleu nuit, ferrures d'origine redorées à la feuille. Une pièce prête à rejoindre votre intérieur.",
		photos: [
			{ kind: 'before-after', before: {
				src: '/images/meubles/chevet-chene-massif-style-louis-philippe/chevet-chene-massif-style-louis-philippe_avant-2.jpeg',
				alt: 'Chevet en chêne massif - Style Louis Philippe - Vue Face Avant - Avant rénovation',
			}, after: {
				src: '/images/meubles/chevet-chene-massif-style-louis-philippe/chevet-chene-massif-style-louis-philippe_apres-2.jpeg',
				alt: 'Chevet en chêne massif - Style Louis Philippe - Vue Face Avant - Après rénovation',
			} },
			{
				kind: "single",
				image: {
					src: '/images/meubles/chevet-chene-massif-style-louis-philippe/chevet-chene-massif-style-louis-philippe_apres-1.jpeg',
					alt: 'Chevet en chêne massif - Style Louis Philippe - Vue Latérale - Après rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/chevet-chene-massif-style-louis-philippe/chevet-chene-massif-style-louis-philippe_avant-1.jpeg',
					alt: 'Chevet en chêne massif - Style Louis Philippe - Vue Latérale - Avant rénovation',
				}
			}
		],
	},
	{
		name: 'Cathy',
		subtitle: 'Chevet Chêne',
		category: 'Rénovés',
		status: 'En vente',
		addedAt: '2026-09-01',
		dimensions: { height: 65.5, width: 43, length: 33.5 },
		price: 130,
		description: [
			{
				kind: 'paragraph',
				text: "Magnifique table de chevet ancienne entièrement restaurée et personnalisée à la main. Ce meuble unique apportera une touche d'élégance classique et de modernité à votre chambre.",
			},
			{
				kind: 'list',
				items: [
					{
						label: 'Design unique',
						text: 'Peint dans un bleu nuit profond et mat, sublimé par des touches de dorure délicates qui mettent en valeur ses lignes galbées et ses moulures.',
					},
					{
						label: 'Le petit plus',
						text: "Le fond de la niche est tapissé d'un papier au motif floral et bucolique, offrant un joli contraste.",
					},
					{
						label: 'Pratique',
						text: "Dispose d'un tiroir fonctionnel avec son bouton fleur doré et d'une grande niche de rangement.",
					},
				],
			},
		],
		photos: [
			{ kind: 'before-after', before: {
				src: '/images/meubles/cathy-chevet/cathy_chevet_avant-face-avant-2.jpeg',
				alt: 'Chevet en chêne nommé "Cathy" - Disponible à la vente - Vue Face Avant - Avant rénovation',
			}, after: {
				src: '/images/meubles/cathy-chevet/cathy_chevet_apres-face-avant-2.jpeg',
				alt: 'Chevet en chêne nommé "Cathy" - Disponible à la vente - Vue Face Avant - Après rénovation',
			} },
			{
				kind: "single",
				image: {
					src: '/images/meubles/cathy-chevet/cathy_chevet_apres-face-avant.jpeg',
				alt: 'Chevet en chêne nommé "Cathy" - Disponible à la vente - Vue Face Avant - Après rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/cathy-chevet/cathy_chevet_avant-face-avant.jpeg',
				alt: 'Chevet en chêne nommé "Cathy" - Disponible à la vente - Vue Face Avant - Avant rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/cathy-chevet/cathy_chevet_avant-face-dessus.jpeg',
				alt: 'Chevet en chêne nommé "Cathy" - Disponible à la vente - Vue Face Avant - Avant rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/cathy-chevet/cathy_chevet_apres-face-dessus.jpeg',
				alt: 'Chevet en chêne nommé "Cathy" - Disponible à la vente - Vue Face Avant - Apres rénovation',
				}
			}
		],
	},
	{
		name: 'Agnès',
		subtitle: 'Bureau en Chêne',
		category: 'Rénovés',
		status: 'Indisponible',
		addedAt: '2026-09-01',
		dimensions: { height: 70.5, width: 80, length: 57.5 },
		price: 0,
		description:
			"",
		photos: [
			{ kind: 'before-after', before: {
				src: '/images/meubles/agnes-bureau/agnes_bureau_avant-face-avant.jpeg',
				alt: 'Bureau en chêne nommé "Agnès" - Indisponible / Vendu - Vue Face Avant - Avant rénovation',
			}, after: {
				src: '/images/meubles/agnes-bureau/agnes_bureau_apres-face-avant.jpeg',
				alt: 'Bureau en chêne nommé "Agnès" - Indisponible / Vendu - Vue Face Avant - Après rénovation',
			} },
			{
				kind: "single",
				image: {
					src: '/images/meubles/agnes-bureau/agnes_bureau_apres-face-dessus.jpeg',
				alt: 'Bureau en chêne nommé "Agnès" - Indisponible / Vendu - Vue Face Dessus - Après rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/agnes-bureau/agnes_bureau_avant-face-dessus.jpeg',
				alt: 'Bureau en chêne nommé "Agnès" - Indisponible / Vendu - Vue Face Dessus - Avant rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/agnes-bureau/agnes_bureau_avant-face-cote.jpeg',
				alt: 'Bureau en chêne nommé "Agnès" - Indisponible / Vendu - Vue Face Côté - Avant rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/agnes-bureau/agnes_bureau_apres-face-cote.jpeg',
				alt: 'Bureau en chêne nommé "Agnès" - Indisponible / Vendu - Vue Face Côté - Apres rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles/agnes-bureau/agnes_bureau_apres-tirroir.jpeg',
				alt: 'Bureau en chêne nommé "Agnès" - Indisponible / Vendu - Vue du tirroir - Apres rénovation',
				}
			}
		],
	},
	{
		name: 'Chevet 04-2026-1',
		subtitle: 'Meuble brut à rénover',
		category: 'Bruts',
		status: 'Sur devis',
		addedAt: '2026-09-01',
		description:
			"",
		photos: [
			{
				kind: "single",
				image: {
					src: '/images/meubles-bruts/chev-04-2026-1/chevet-04-2026-brut-1.jpeg',
				alt: 'Chevet brut n°04-2026-1 - Disponible pour rénovation',
				}
			},
			{
				kind: "single",
				image: {
					src: '/images/meubles-bruts/chev-04-2026-1/chevet-04-2026-brut-2.jpeg',
				alt: 'Chevet brut n°04-2026-1 - Disponible pour rénovation',
				}
			},
		],
	},
	{
		name: 'Commode 08-2025-1',
		subtitle: 'Meuble brut à rénover',
		category: 'Bruts',
		status: 'En vente',
		addedAt: '2026-09-01',
		price: 0,
		description:
			"",
		photos: [
			{
				kind: "single",
				image: {
					src: '/images/meubles-bruts/com-08-2025-1/commode-08-2025-brut.jpeg',
				alt: 'Commode brute n°08-2025-1 - Disponible pour rénovation',
				}
			},
		],
	},
];

export const products: Product[] = rawProducts.map((product) => ({
	...product,
	slug: slugify(product.name),
}));

if (process.env.NODE_ENV !== 'production') {
	const seen = new Set<string>();
	for (const product of products) {
		if (seen.has(product.slug)) {
			throw new Error(
				`Deux produits génèrent le même slug "${product.slug}" — renomme l'un des deux dans src/data/products.ts.`,
			);
		}
		seen.add(product.slug);
	}
}
