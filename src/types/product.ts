import type { ImageAsset } from '@/types/content';

export type ProductCategory = 'Rénovés' | 'Bruts';

/**
 * - `En vente` : pièce à prix fixe, réservable en ligne.
 * - `Sur devis` : pièce (souvent brute) sans tarif, affichée pour une demande de rénovation personnalisée.
 * - `Réservé` / `Vendu` : plus disponible à l'achat.
 * - `Indisponible` : visible uniquement dans la Galerie (portfolio), jamais dans la boutique.
 */
export type ProductStatus = 'En vente' | 'Sur devis' | 'Réservé' | 'Vendu' | 'Indisponible';

export interface ProductDimensions {
	height?: number;
	width?: number;
	length?: number;
}

export type ProductPhoto =
	| { kind: 'single'; image: ImageAsset }
	| { kind: 'before-after'; before: ImageAsset; after: ImageAsset };

export interface ProductDescriptionListItem {
	/** Intitulé mis en avant devant le texte, ex. « Design unique ». Optionnel. */
	label?: string;
	text: string;
}

export type ProductDescriptionBlock =
	| { kind: 'paragraph'; text: string }
	| { kind: 'list'; items: ProductDescriptionListItem[] };

/**
 * Description d'un produit :
 * - une chaîne simple (les paragraphes se séparent par une ligne vide), ou
 * - une suite de blocs `paragraph` / `list` pour mêler paragraphes et puces.
 */
export type ProductDescription = string | ProductDescriptionBlock[];

export interface ProductInput {
	name: string;
	subtitle?: string;
	category: ProductCategory;
	status: ProductStatus;
	addedAt: string;
	dimensions?: ProductDimensions;
	/** Absent (ou 0) pour une pièce « Sur devis » : le prix affiché devient alors « Sur devis ». */
	price?: number;
	description?: ProductDescription;
	photos: ProductPhoto[];
}

export interface Product extends ProductInput {
	slug: string;
}
