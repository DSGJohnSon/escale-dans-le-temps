'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
import { Reveal } from '@/components/ui/reveal';
import { RichHeading } from '@/components/ui/rich-heading';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { formatDimensions, getBeforeAfterPhotos, getProductsWithBeforeAfter } from '@/lib/products';
import { cn } from '@/lib/utils';
import type { GalleryContent } from '@/types/home';

type GallerySectionProps = {
	gallery: GalleryContent;
};

export function GallerySection({ gallery }: GallerySectionProps) {
	const pieces = getProductsWithBeforeAfter();
	const [selectedSlug, setSelectedSlug] = React.useState(pieces[0]?.slug);
	const selectedPiece = pieces.find((piece) => piece.slug === selectedSlug) ?? pieces[0];
	const selectedBeforeAfter = selectedPiece ? getBeforeAfterPhotos(selectedPiece)[0] : undefined;

	return (
		<Reveal
			as="section"
			id="galerie"
			aria-labelledby="gallery-heading"
			className="mx-auto max-w-6xl px-4 py-16 md:py-24"
		>
			<SectionEyebrow>{gallery.eyebrow}</SectionEyebrow>
			<RichHeading as="h2" id="gallery-heading" segments={gallery.heading} className="mt-3 max-w-xl text-3xl md:text-4xl" />
			<p className="mt-4 text-muted-foreground">{gallery.description}</p>

			<div className="mt-12 grid gap-6 md:grid-cols-[1fr_280px] md:items-start">
				{selectedPiece && selectedBeforeAfter && (
					<div>
						<BeforeAfterSlider
							before={selectedBeforeAfter.before}
							after={selectedBeforeAfter.after}
							label={selectedPiece.name}
						/>
						<Link
							href={`/boutique/${selectedPiece.slug}`}
							className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
						>
							Voir la fiche de « {selectedPiece.name} »
							<ArrowRight className="size-4" aria-hidden="true" />
						</Link>
					</div>
				)}

				<ul className="flex list-none gap-3 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0" aria-label="Pièces de la galerie">
					{pieces.map((piece) => {
						const isSelected = piece.slug === selectedPiece?.slug;
						const dimensions = formatDimensions(piece.dimensions);
						return (
							<li key={piece.slug} className="shrink-0 md:shrink">
								<button
									type="button"
									onClick={() => setSelectedSlug(piece.slug)}
									aria-current={isSelected}
									className={cn(
										'w-full min-w-40 rounded-xl border px-5 py-4 text-left transition-colors md:min-w-0',
										isSelected
											? 'dark border-transparent bg-background text-foreground'
											: 'border-border bg-card text-card-foreground hover:bg-accent',
									)}
								>
									<p className="font-heading text-lg">{piece.name}</p>
									{dimensions && <p className="mt-1 text-sm text-muted-foreground">{dimensions}</p>}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</Reveal>
	);
}
