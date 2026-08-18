import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { RichHeading } from '@/components/ui/rich-heading';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { cn } from '@/lib/utils';
import type { ServicesContent } from '@/types/home';

type ServicesSectionProps = {
	services: ServicesContent;
};

const alignByIndex = ['md:mr-auto', 'md:mx-auto', 'md:ml-auto'];

export function ServicesSection({ services }: ServicesSectionProps) {
	return (
		<section id="services" aria-labelledby="services-heading" className="bg-secondary/60 py-16 md:py-24">
			<div className="mx-auto max-w-6xl px-4">
				<Reveal>
					<SectionEyebrow>{services.eyebrow}</SectionEyebrow>
					<RichHeading
						as="h2"
						id="services-heading"
						segments={services.heading}
						className="mt-3 max-w-2xl text-3xl md:text-4xl"
					/>
					<p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
						<span aria-hidden="true" className="text-primary">
							+
						</span>
						{services.description}
					</p>
				</Reveal>

				<ol className="mt-12 list-none space-y-8">
					{services.items.map((item, i) => (
						<Reveal
							key={item.number}
							as="li"
							className={cn(
								'grid border border-border bg-card/50 md:w-4/5 md:grid-cols-[minmax(0,240px)_1fr] md:items-center',
								alignByIndex[i],
							)}
						>
							<div className="relative w-full h-full object-cover object-center overflow-hidden">
								<span
									aria-hidden="true"
									className="absolute top-0 left-0 z-10 flex size-9 items-center justify-center bg-background font-heading text-2xl italic text-foreground shadow-md"
								>
									{item.number}
								</span>
								<Image
									src={item.image.src}
									alt={item.image.alt}
									fill
									sizes="(min-width: 768px) 320px, 90vw"
									className="object-cover"
								/>
							</div>

							<div className='p-8'>
								<h3 className="mt-2 font-heading text-3xl">{item.title}</h3>
								<p className="text-[.6rem] font-medium tracking-widest text-muted-foreground uppercase pt-1">
									{item.eyebrow}
								</p>
								<p className="mt-3 text-muted-foreground">{item.description}</p>
								<Button asChild className="mt-5">
									<a href={item.cta.href}>{item.cta.label}</a>
								</Button>
							</div>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
