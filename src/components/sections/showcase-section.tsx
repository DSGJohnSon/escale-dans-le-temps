import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { RichHeading } from '@/components/ui/rich-heading';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { formatDimensions, formatProductPrice, getFeaturedProducts, getShowcaseThumbnail } from '@/lib/products';
import { cn } from '@/lib/utils';
import type { ShowcaseContent } from '@/types/home';

type ShowcaseSectionProps = {
	showcase: ShowcaseContent;
};

export function ShowcaseSection({ showcase }: ShowcaseSectionProps) {
	const featuredProducts = getFeaturedProducts();

	return (
		<section id="vitrine" aria-labelledby="showcase-heading" className="dark bg-background py-16 text-foreground md:py-24">
			<div className="mx-auto max-w-6xl px-4">
				<Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<SectionEyebrow>{showcase.eyebrow}</SectionEyebrow>
						<RichHeading
							as="h2"
							id="showcase-heading"
							segments={showcase.heading}
							className="mt-3 max-w-xl text-3xl md:text-4xl"
						/>
					</div>
					<Button asChild className="bg-primary hover:bg-primary/90">
						<Link href={showcase.cta.href}>{showcase.cta.label}</Link>
					</Button>
				</Reveal>

				<ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featuredProducts.map((product) => {
						const thumbnail = getShowcaseThumbnail(product);
						const dimensions = formatDimensions(product.dimensions);

						return (
							<Reveal key={product.slug} as="li" className="group relative aspect-4/5 overflow-hidden rounded-2xl">
								<Link href={`/boutique/${product.slug}`} className="absolute inset-0">
									<Image
										src={thumbnail.default.src}
										alt={thumbnail.default.alt}
										fill
										sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
										className="object-cover transition-opacity duration-300 group-hover:opacity-0"
									/>
									<Image
										src={thumbnail.hover.src}
										alt=""
										aria-hidden="true"
										fill
										sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
										className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									/>

									{product.status !== 'En vente' && (
										<span
											className={cn(
												'absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
												product.status === 'Vendu' ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground',
											)}
										>
											{product.status}
										</span>
									)}

									<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 pt-12">
										<p className="font-heading text-lg text-white">{product.name}</p>
										<div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-sm text-white/80">
											{dimensions && <span className="whitespace-nowrap">{dimensions}</span>}
											<span className="font-medium whitespace-nowrap text-primary">{formatProductPrice(product)}</span>
										</div>
									</div>
								</Link>
							</Reveal>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
