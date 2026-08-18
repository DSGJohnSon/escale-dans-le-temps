import { slugify } from '@/lib/slugify';
import type { Product, ProductInput } from '@/types/product';

const placeholderImage = {
	src: '/images/placeholder.jpg',
	alt: 'Console ancienne repeinte en bleu nuit avec ferrures dorées, posée devant un mur en lambris blanc',
};

const rawProducts: ProductInput[] = [
	{
		name: 'Chevet Louis XV',
		category: 'Rénovés',
		status: 'En vente',
		addedAt: '2026-08-10',
		dimensions: { height: 68, width: 45, length: 38 },
		price: 320,
		description:
			"Chevet de style Louis XV entièrement repeint en bleu nuit, ferrures d'origine redorées à la feuille. Une pièce prête à rejoindre votre intérieur.",
		photos: [
			{ kind: 'before-after', before: placeholderImage, after: placeholderImage },
			{ kind: 'single', image: placeholderImage },
			{ kind: 'single', image: placeholderImage },
		],
	},
	{
		name: 'Cadre Ornemental',
		category: 'Rénovés',
		status: 'En vente',
		addedAt: '2026-08-05',
		dimensions: { height: 60, width: 45 },
		price: 130,
		description: 'Cadre ancien restauré, motif floral peint à la main et rehauts dorés.',
		photos: [
			{ kind: 'before-after', before: placeholderImage, after: placeholderImage },
			{ kind: 'single', image: placeholderImage },
		],
	},
	{
		name: 'Table de Chevet Provençale',
		category: 'Rénovés',
		status: 'Réservé',
		addedAt: '2026-07-28',
		dimensions: { height: 65, width: 42, length: 35 },
		price: 280,
		description: 'Petite table de chevet provençale, patine à l’ancienne et dessus bois brut cérusé.',
		photos: [
			{ kind: 'single', image: placeholderImage },
			{ kind: 'single', image: placeholderImage },
		],
	},
	{
		name: 'Commode Brute à Personnaliser',
		category: 'Bruts',
		status: 'En vente',
		addedAt: '2026-07-20',
		dimensions: { height: 80, width: 100, length: 45 },
		price: 150,
		description: 'Commode ancienne en bois massif, structure saine, idéale pour une rénovation sur-mesure.',
		photos: [
			{ kind: 'single', image: placeholderImage },
			{ kind: 'single', image: placeholderImage },
		],
	},
	{
		name: 'Table Basse Brute',
		category: 'Bruts',
		status: 'En vente',
		addedAt: '2026-07-15',
		price: 90,
		description: 'Table basse brute, plateau en bon état, pieds à reprendre.',
		photos: [{ kind: 'single', image: placeholderImage }],
	},
	{
		name: 'Console Directoire',
		category: 'Rénovés',
		status: 'Vendu',
		addedAt: '2026-05-01',
		dimensions: { height: 75, width: 90, length: 35 },
		price: 410,
		description: 'Console de style Directoire, entièrement restaurée. Pièce déjà vendue, conservée ici à titre d’exemple.',
		photos: [
			{ kind: 'before-after', before: placeholderImage, after: placeholderImage },
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
