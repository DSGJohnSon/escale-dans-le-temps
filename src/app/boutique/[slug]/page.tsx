import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ReservationForm } from '@/components/boutique/reservation-form';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
import { cn } from '@/lib/utils';
import { products } from '@/data/products';
import { boutiqueContent } from '@/data/boutique';
import {
	formatDimensions,
	formatProductPrice,
	getBeforeAfterPhotos,
	getProductBySlug,
	getSinglePhotos,
} from '@/lib/products';

export function generateStaticParams() {
	return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<'/boutique/[slug]'>): Promise<Metadata> {
	const { slug } = await params;
	const product = getProductBySlug(slug);
	if (!product) return {};

	const description = product.description ?? `${product.name} — ${formatProductPrice(product)}.`;
	const firstImage = product.photos[0];
	const image = firstImage?.kind === 'single' ? firstImage.image : firstImage?.after;

	return {
		title: product.name,
		description,
		openGraph: {
			title: product.name,
			description,
			images: image ? [{ url: image.src }] : undefined,
		},
	};
}

export default async function ProductPage({ params }: PageProps<'/boutique/[slug]'>) {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	const beforeAfters = getBeforeAfterPhotos(product);
	const singles = getSinglePhotos(product);
	const dimensions = formatDimensions(product.dimensions);

	return (
		<div className="w-full">
			<Header />

			<main className="mx-auto max-w-5xl px-4 py-12 md:py-20">
				<Link href="/boutique" className="text-sm text-muted-foreground hover:text-foreground">
					← {boutiqueContent.backToBoutique}
				</Link>

				<div className="mt-6 grid gap-10 md:grid-cols-2">
					<div className="space-y-4">
						{beforeAfters.map((photo, index) => (
							<BeforeAfterSlider key={`ba-${index}`} before={photo.before} after={photo.after} label={product.name} />
						))}
						{singles.map((photo, index) => (
							<div key={`single-${index}`} className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted">
								<Image
									src={photo.image.src}
									alt={photo.image.alt}
									fill
									sizes="(min-width: 768px) 45vw, 90vw"
									className="object-cover"
								/>
							</div>
						))}
					</div>

					<div>
						<p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{product.category}</p>
						<h1 className="mt-2 font-heading text-3xl md:text-4xl">{product.name}</h1>

						{product.status !== 'En vente' && (
							<span
								className={cn(
									'mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
									product.status === 'Vendu' ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground',
								)}
							>
								{product.status}
							</span>
						)}

						<p className="mt-4 text-2xl font-medium text-primary">{formatProductPrice(product)}</p>
						{dimensions && <p className="mt-2 text-muted-foreground">{dimensions}</p>}
						{product.description && <p className="mt-6 text-muted-foreground">{product.description}</p>}

						{product.status !== 'Vendu' && (
							<ReservationForm
								productSlug={product.slug}
								productName={product.name}
								labels={boutiqueContent.reservationForm}
							/>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
