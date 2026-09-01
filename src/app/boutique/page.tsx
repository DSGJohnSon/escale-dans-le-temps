import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { ProductCard } from '@/components/boutique/product-card';
import { RichHeading } from '@/components/ui/rich-heading';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { buttonVariants } from '@/components/ui/button';
import { boutiqueContent } from '@/data/boutique';
import { getBoutiqueProducts } from '@/lib/products';
import type { Product } from '@/types/product';

export const metadata: Metadata = {
	title: 'Boutique',
	description: boutiqueContent.description,
};

function CategorySection({
	id,
	title,
	description,
	products,
}: {
	id: string;
	title: string;
	description: string;
	products: Product[];
}) {
	return (
		<section id={id} className="mx-auto max-w-6xl px-4 py-12 md:py-16">
			<h2 className="font-heading text-2xl md:text-3xl">{title}</h2>
			<p className="mt-2 text-muted-foreground">{description}</p>

			{products.length > 0 ? (
				<ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard key={product.slug} product={product} />
					))}
				</ul>
			) : (
				<p className="mt-8 text-muted-foreground">{boutiqueContent.emptyMessage}</p>
			)}
		</section>
	);
}

export default function BoutiquePage() {
	const renovatedProducts = getBoutiqueProducts('Rénovés');
	const rawProducts = getBoutiqueProducts('Bruts');

	return (
		<div className="w-full">
			<Header />

			<main>
				<section className="mx-auto max-w-6xl px-4 pt-12 pb-4 md:pt-20">
					<SectionEyebrow>{boutiqueContent.eyebrow}</SectionEyebrow>
					<RichHeading as="h1" segments={boutiqueContent.heading} className="mt-3 text-4xl md:text-5xl" />
					<p className="mt-4 max-w-2xl text-muted-foreground">{boutiqueContent.description}</p>

					<nav aria-label="Catégories de la boutique" className="mt-8 flex flex-wrap gap-3">
						<a href="#renoves" className={buttonVariants({ variant: 'outline' })}>
							{boutiqueContent.renovatedSection.title}
						</a>
						<a href="#bruts" className={buttonVariants({ variant: 'outline' })}>
							{boutiqueContent.rawSection.title}
						</a>
					</nav>
				</section>

				<CategorySection
					id="renoves"
					title={boutiqueContent.renovatedSection.title}
					description={boutiqueContent.renovatedSection.description}
					products={renovatedProducts}
				/>

				<div className="bg-secondary/60">
					<CategorySection
						id="bruts"
						title={boutiqueContent.rawSection.title}
						description={boutiqueContent.rawSection.description}
						products={rawProducts}
					/>
				</div>
			</main>
		</div>
	);
}
