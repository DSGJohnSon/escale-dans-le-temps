import type { ImageAsset } from '@/types/content';

export type ProductCategory = 'Rénovés' | 'Bruts';

export type ProductStatus = 'En vente' | 'Réservé' | 'Vendu';

export interface ProductDimensions {
	height?: number;
	width?: number;
	length?: number;
}

export type ProductPhoto =
	| { kind: 'single'; image: ImageAsset }
	| { kind: 'before-after'; before: ImageAsset; after: ImageAsset };

export interface ProductInput {
	name: string;
	subtitle?: string;
	category: ProductCategory;
	status: ProductStatus;
	addedAt: string;
	dimensions?: ProductDimensions;
	price: number;
	description?: string;
	photos: ProductPhoto[];
}

export interface Product extends ProductInput {
	slug: string;
}
