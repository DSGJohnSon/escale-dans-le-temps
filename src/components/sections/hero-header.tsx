import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RichHeading } from '@/components/ui/rich-heading';
import { Reveal } from '@/components/ui/reveal';
import type { HeroContent } from '@/types/home';

type HeroHeaderProps = {
	hero: HeroContent;
};

export function HeroHeader({ hero }: HeroHeaderProps) {
	return (
		<div className="relative">
			<div
				aria-hidden="true"
				className="absolute -top-20 -left-6 hidden h-[50svh] w-[15svw] rounded-br-[150em] border border-primary lg:block"
			/>
			<div
				aria-hidden="true"
				className="absolute -top-20 -right-0 hidden h-[80svh] w-[15svw] rounded-bl-[150em] border border-primary lg:block"
			/>

			<Reveal
				as="section"
				className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-12 pb-20 md:grid-cols-2 md:pt-20 md:pb-28"
			>
				<div>
					<RichHeading as="h1" segments={hero.heading} className="text-4xl md:text-6xl" />
					<p className="mt-6 max-w-md text-muted-foreground">{hero.description}</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Button asChild size="lg">
							<a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
						</Button>
						<Button asChild size="lg" variant="outline">
							<a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
						</Button>
					</div>
				</div>

				<Image
					src={hero.image.src}
					alt={hero.image.alt}
					width={2228}
					height={2675}
					priority
					className="mx-auto h-auto w-full max-w-md md:max-w-none"
				/>
			</Reveal>
		</div>
	);
}
