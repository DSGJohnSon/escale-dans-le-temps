import { slugify } from '@/lib/slugify';
import type { Product, ProductInput } from '@/types/product';

const placeholderImage = {
	src: '/images/placeholder.jpg',
	alt: 'Console ancienne repeinte en bleu nuit avec ferrures dorées, posée devant un mur en lambris blanc',
};

const rawProducts: ProductInput[] = [
	{
		name: 'Chevet en chêne massif',
		subtitle: 'Style Louis Philippe',
		category: 'Rénovés',
		status: 'Réservé',
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
