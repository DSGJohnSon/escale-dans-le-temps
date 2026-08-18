import Image from 'next/image';
import { RichHeading } from '@/components/ui/rich-heading';
import { Reveal } from '@/components/ui/reveal';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import type { ArtisanContent } from '@/types/home';

type ArtisanSectionProps = {
	artisan: ArtisanContent;
};

export function ArtisanSection({ artisan }: ArtisanSectionProps) {
	return (
		<Reveal as="section" aria-labelledby="artisan-heading" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
			<div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
				<div className="relative">
					<div className="relative aspect-4/5 overflow-hidden rounded-t-[7em] md:rounded-t-[10em] bg-muted border-2 border-primary">
						<Image
							src={artisan.image.src}
							alt={artisan.image.alt}
							fill
							sizes="(min-width: 768px) 40vw, 90vw"
							className="object-cover"
						/>
					</div>
					<p className="absolute bottom-0 left-0 w-full md:w-auto text-center md:text-left rounded-none bg-primary px-4 py-2 text-xl font-medium tracking-wide text-primary-foreground uppercase font-heading">
						{artisan.badge}
					</p>
				</div>

				<div>
					<SectionEyebrow>{artisan.eyebrow}</SectionEyebrow>
					<RichHeading as="h2" id="artisan-heading" segments={artisan.heading} className="mt-3 text-3xl md:text-4xl" />
					<div className="mt-6 space-y-4 text-muted-foreground">
						{artisan.paragraphs.map((paragraph, i) => (
							<p key={i}>{paragraph}</p>
						))}
					</div>
				</div>
			</div>
		</Reveal>
	);
}
