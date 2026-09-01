import type { HeadingSegment } from '@/types/content';

export interface GalerieContent {
	eyebrow: string;
	heading: HeadingSegment[];
	description: string;
	emptyMessage: string;
	backToGalerie: string;
}
