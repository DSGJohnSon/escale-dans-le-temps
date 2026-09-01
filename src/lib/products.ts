import type { Metadata } from 'next';
import { products } from '@/data/products';
import type { ImageAsset } from '@/types/content';
import type {
	Product,
	ProductCategory,
	ProductDescription,
	ProductDescriptionBlock,
	ProductDimensions,
	ProductPhoto,
	ProductStatus,
} from '@/types/product';

type SinglePhoto = Extract<ProductPhoto, { kind: 'single' }>;
type BeforeAfterPhoto = Extract<ProductPhoto, { kind: 'before-after' }>;

/** Statuts des pièces qui ne sont plus proposées en boutique mais restent visibles dans la Galerie. */
const galerieStatuses: ProductStatus[] = ['Vendu', 'Indisponible'];

/**
 * Une pièce vendue ou indisponible : sa fiche canonique est `/galerie/[slug]`
 * plutôt que `/boutique/[slug]` (voir `getProductHref`).
 */
export function isGalerieOnly(product: Product): boolean {
	return galerieStatuses.includes(product.status);
}

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((product) => product.slug === slug);
}

/** Pièce à prix fixe, réservable en ligne : prix affiché + formulaire de réservation. */
export function isReservable(product: Product): boolean {
	return product.status === 'En vente';
}

/** Pièce sans tarif (souvent brute) : le client fait une demande de rénovation sur mesure. */
export function isOnQuote(product: Product): boolean {
	return product.status === 'Sur devis';
}

/** Prix réel renseigné (un `price` absent ou nul signifie « Sur devis »). */
export function hasPrice(product: Product): boolean {
	return typeof product.price === 'number' && product.price > 0;
}

/**
 * Statut à afficher en pastille sur les cartes et la fiche, ou `null` quand il n'y a
 * rien à signaler (pièce simplement disponible : « En vente » ou « Sur devis »).
 */
export function getStatusBadge(product: Product): ProductStatus | null {
	return product.status === 'En vente' || product.status === 'Sur devis' ? null : product.status;
}

/** URL canonique de la fiche produit, selon que la pièce est encore en boutique ou déjà en galerie. */
export function getProductHref(product: Product): string {
	return isGalerieOnly(product) ? `/galerie/${product.slug}` : `/boutique/${product.slug}`;
}

/** Meubles d'une catégorie visibles dans la boutique (les pièces « Indisponible » sont réservées à la Galerie). */
export function getBoutiqueProducts(category: ProductCategory): Product[] {
	return products.filter((product) => product.category === category && product.status !== 'Indisponible');
}

/** Meubles vendus ou indisponibles, du plus récent au plus ancien, pour la page Galerie. */
export function getGalerieProducts(): Product[] {
	return [...products]
		.filter(isGalerieOnly)
		.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
}

/** Ramène une description (texte simple ou blocs) à une liste de blocs homogène pour l'affichage. */
export function normalizeDescription(description: ProductDescription | undefined): ProductDescriptionBlock[] {
	if (!description) return [];

	if (typeof description === 'string') {
		return description
			.split(/\n\s*\n/)
			.map((paragraph) => paragraph.trim())
			.filter(Boolean)
			.map((text) => ({ kind: 'paragraph' as const, text }));
	}

	return description.filter((block) =>
		block.kind === 'paragraph' ? block.text.trim().length > 0 : block.items.length > 0,
	);
}

/** Version texte brut d'une description (paragraphes + puces), pour les métadonnées SEO. */
export function descriptionToPlainText(description: ProductDescription | undefined): string | undefined {
	const parts = normalizeDescription(description).flatMap((block) =>
		block.kind === 'paragraph'
			? [block.text]
			: block.items.map((item) => (item.label ? `${item.label} : ${item.text}` : item.text)),
	);

	const text = parts.join(' ').trim();
	return text.length > 0 ? text : undefined;
}

/** Métadonnées SEO partagées par les fiches produit, quelle que soit la route qui les sert. */
export function buildProductMetadata(product: Product): Metadata {
	const description = descriptionToPlainText(product.description) ?? `${product.name} — ${formatProductPrice(product)}.`;
	const firstImage = product.photos[0];
	const image = firstImage?.kind === 'single' ? firstImage.image : firstImage?.after;

	return {
		title: product.name,
		description,
		openGraph: {
			title: product.name,
			description,
			images: image ? [{ url: image.src }] : undefined,
		},
	};
}

export function getSinglePhotos(product: Product): SinglePhoto[] {
	return product.photos.filter((photo): photo is SinglePhoto => photo.kind === 'single');
}

export function getBeforeAfterPhotos(product: Product): BeforeAfterPhoto[] {
	return product.photos.filter((photo): photo is BeforeAfterPhoto => photo.kind === 'before-after');
}

export function formatProductPrice(product: Product): string {
	if (!hasPrice(product)) return 'Sur devis';

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
 * Les 3 pièces les plus récemment ajoutées, en excluant celles vendues ou indisponibles,
 * pour la section "Vitrine" de la page d'accueil.
 */
export function getFeaturedProducts(limit = 3): Product[] {
	return [...products]
		.filter((product) => !isGalerieOnly(product))
		.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
		.slice(0, limit);
}

/** Produits ayant au moins un avant/après, pour la section "Galerie" de la page d'accueil. */
export function getProductsWithBeforeAfter(): Product[] {
	return products.filter((product) => getBeforeAfterPhotos(product).length > 0);
}

/**
 * Miniature avec effet de survol pour les cartes produit.
 * Les avant/après sont prioritaires sur les photos simples.
 * - un avant/après : le "après" puis le "avant".
 * - aucun avant/après, 2 photos simples ou plus : la 1re puis la 2e.
 * - aucun avant/après, 1 photo simple : la même photo des deux côtés.
 */
export function getShowcaseThumbnail(product: Product): { default: ImageAsset; hover: ImageAsset } {
	const beforeAfters = getBeforeAfterPhotos(product);

	if (beforeAfters.length > 0) {
		return { default: beforeAfters[0].after, hover: beforeAfters[0].before };
	}

	const singles = getSinglePhotos(product);

	if (singles.length >= 2) {
		return { default: singles[0].image, hover: singles[1].image };
	}

	if (singles.length === 1) {
		return { default: singles[0].image, hover: singles[0].image };
	}

	const fallback: ImageAsset = { src: '/images/placeholder.jpg', alt: product.name };
	return { default: fallback, hover: fallback };
}
