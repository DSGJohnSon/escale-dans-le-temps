import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { ProductCard } from '@/components/boutique/product-card';
import { RichHeading } from '@/components/ui/rich-heading';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { galerieContent } from '@/data/galerie';
import { getGalerieProducts } from '@/lib/products';

export const metadata: Metadata = {
	title: 'Galerie',
	description: galerieContent.description,
};

export default function GaleriePage() {
	const products = getGalerieProducts();

	return (
		<div className="w-full">
			<Header />

			<main>
				<section className="mx-auto max-w-6xl px-4 pt-12 pb-4 md:pt-20">
					<SectionEyebrow>{galerieContent.eyebrow}</SectionEyebrow>
					<RichHeading as="h1" segments={galerieContent.heading} className="mt-3 text-4xl md:text-5xl" />
					<p className="mt-4 max-w-2xl text-muted-foreground">{galerieContent.description}</p>
				</section>

				<section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
					{products.length > 0 ? (
						<ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{products.map((product) => (
								<ProductCard key={product.slug} product={product} variant="gallery" />
							))}
						</ul>
					) : (
						<p className="text-muted-foreground">{galerieContent.emptyMessage}</p>
					)}
				</section>
			</main>
		</div>
	);
}
