import { slugify } from '@/lib/slugify';
import type { Product, ProductInput } from '@/types/product';

const placeholderImage = {
	src: '/images/placeholder.jpg',
	alt: 'Console ancienne repeinte en bleu nuit avec ferrures dorées, posée devant un mur en lambris blanc',
};

const rawProducts: ProductInput[] = [
	{
		name: 'Bureau Louis XVI',
		category: 'Rénovés',
		status: 'Réservé',
		addedAt: '2026-08-10',
		dimensions: { height: 68, width: 45, length: 38 },
		price: 320,
		description:
			"Bureau de style Louis XV entièrement repeint en bleu nuit, ferrures d'origine redorées à la feuille. Une pièce prête à rejoindre votre intérieur.",
		photos: [
			{ kind: 'before-after', before: placeholderImage, after: placeholderImage },
			{ kind: 'single', image: placeholderImage },
			{ kind: 'single', image: placeholderImage },
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
