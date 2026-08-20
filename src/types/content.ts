export interface HeadingSegment {
	text: string;
	emphasis?: boolean;
}

export interface CallToAction {
	label: string;
	href: string;
}

export interface ImageAsset {
	src: string;
	alt: string;
}

/** Image accompagnée de ses dimensions intrinsèques (voir `withImageSize`). */
export interface SizedImage extends ImageAsset {
	width: number;
	height: number;
}
