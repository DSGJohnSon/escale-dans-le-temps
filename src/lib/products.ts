import { products } from '@/data/products';
import type { ImageAsset } from '@/types/content';
import type { Product, ProductCategory, ProductDimensions, ProductPhoto } from '@/types/product';

type SinglePhoto = Extract<ProductPhoto, { kind: 'single' }>;
type BeforeAfterPhoto = Extract<ProductPhoto, { kind: 'before-after' }>;

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
	return products.filter((product) => product.category === category);
}

export function getSinglePhotos(product: Product): SinglePhoto[] {
	return product.photos.filter((photo): photo is SinglePhoto => photo.kind === 'single');
}

export function getBeforeAfterPhotos(product: Product): BeforeAfterPhoto[] {
	return product.photos.filter((photo): photo is BeforeAfterPhoto => photo.kind === 'before-after');
}

export function formatProductPrice(product: Product): string {
	const priceLabel = `${product.price} €`;
	return product.category === 'Bruts' ? `À partir de ${priceLabel}` : priceLabel;
}

export function formatDimensions(dimensions?: ProductDimensions): string | undefined {
	if (!dimensions) return undefined;

	const parts: string[] = [];
	if (dimensions.height) parts.push(`Haut. ${dimensions.height}`);
	if (dimensions.width) parts.push(`Larg. ${dimensions.width}`);
	if (dimensions.length) parts.push(`Long. ${dimensions.length}`);

	return parts.length > 0 ? `${parts.join(' × ')} cm` : undefined;
}

/**
 * Les 3 pièces les plus récemment ajoutées, en excluant celles déjà vendues,
 * pour la section "Vitrine" de la page d'accueil.
 */
export function getFeaturedProducts(limit = 3): Product[] {
	return [...products]
		.filter((product) => product.status !== 'Vendu')
		.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
		.slice(0, limit);
}

/** Produits ayant au moins un avant/après, pour la section "Galerie" de la page d'accueil. */
export function getProductsWithBeforeAfter(): Product[] {
	return products.filter((product) => getBeforeAfterPhotos(product).length > 0);
}

/**
 * Miniature avec effet de survol pour les cartes de la Vitrine.
 * - 2 photos simples ou plus : la 1re puis la 2e.
 * - 1 photo simple + un avant/après : la photo simple puis le "après".
 * - 1 photo simple, aucun avant/après : la même photo des deux côtés.
 * - aucune photo simple, un avant/après : le "avant" puis le "après".
 */
export function getShowcaseThumbnail(product: Product): { default: ImageAsset; hover: ImageAsset } {
	const singles = getSinglePhotos(product);
	const beforeAfters = getBeforeAfterPhotos(product);

	if (singles.length >= 2) {
		return { default: singles[0].image, hover: singles[1].image };
	}

	if (singles.length === 1 && beforeAfters.length > 0) {
		return { default: singles[0].image, hover: beforeAfters[0].after };
	}

	if (singles.length === 1) {
		return { default: singles[0].image, hover: singles[0].image };
	}

	if (beforeAfters.length > 0) {
		return { default: beforeAfters[0].before, hover: beforeAfters[0].after };
	}

	const fallback: ImageAsset = { src: '/images/placeholder.jpg', alt: product.name };
	return { default: fallback, hover: fallback };
}
