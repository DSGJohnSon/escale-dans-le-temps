import path from 'node:path';
import { cache } from 'react';
import sharp from 'sharp';
import type { ImageAsset, SizedImage } from '@/types/content';

/** Ratio de repli (4/3) si l'image est introuvable ou illisible. */
const FALLBACK = { width: 1200, height: 900 };

/**
 * Dimensions réelles d'une image de `public/`, lues au build.
 * Elles permettent à <Image> de réserver le bon ratio sans qu'on le force en CSS.
 * Réservé au serveur : `sharp` ne peut pas être importé depuis un composant client.
 */
const readImageSize = cache(async (src: string): Promise<{ width: number; height: number }> => {
	try {
		const { width, height } = await sharp(path.join(process.cwd(), 'public', src)).metadata();
		if (!width || !height) throw new Error('dimensions manquantes');
		return { width, height };
	} catch (error) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(`[image-size] Impossible de lire les dimensions de "${src}" :`, error);
		}
		return FALLBACK;
	}
});

/** Complète une image du contenu avec ses dimensions intrinsèques. */
export async function withImageSize(asset: ImageAsset): Promise<SizedImage> {
	return { ...asset, ...(await readImageSize(asset.src)) };
}
