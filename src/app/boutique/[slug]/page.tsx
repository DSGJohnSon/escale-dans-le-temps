import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ReservationForm } from '@/components/boutique/reservation-form';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
import { StickySidebar } from '@/components/ui/sticky-sidebar';
import { cn } from '@/lib/utils';
import { products } from '@/data/products';
import { boutiqueContent } from '@/data/boutique';
import { withImageSize } from '@/lib/image-size';
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

	// Les dimensions réelles sont lues au build : chaque photo garde son ratio d'origine.
	const [beforeAfters, singles] = await Promise.all([
		Promise.all(
			getBeforeAfterPhotos(product).map(async (photo) => ({
				before: await withImageSize(photo.before),
				after: await withImageSize(photo.after),
			})),
		),
		Promise.all(getSinglePhotos(product).map((photo) => withImageSize(photo.image))),
	]);
	const dimensions = formatDimensions(product.dimensions);

	return (
		<div className="w-full">
			<Header />

			<main className="mx-auto max-w-6xl px-4 py-12 md:py-20">
				<Link href="/boutique" className="text-sm text-muted-foreground hover:text-foreground">
					← {boutiqueContent.backToBoutique}
				</Link>

				<div className="mt-6 grid gap-10 md:grid-cols-2 md:items-start">
					<div className="space-y-4">
						{beforeAfters.map((photo, index) => (
							<BeforeAfterSlider key={`ba-${index}`} before={photo.before} after={photo.after} label={product.name} />
						))}
						{singles.map((photo, index) => (
							<Image
								key={`single-${index}`}
								src={photo.src}
								alt={photo.alt}
								width={photo.width}
								height={photo.height}
								sizes="(min-width: 768px) 45vw, 90vw"
								className="block h-auto w-full rounded-2xl bg-muted"
							/>
						))}
					</div>

					{/* Colonne collante : le formulaire reste visible pendant le défilement des photos. */}
					<StickySidebar>
						<h1 className="mt-2 font-heading font-semibold text-3xl md:text-4xl">{product.name}</h1>
						{product.subtitle && <p className="mt-2 font-heading text-xl md:text-2xl">{product.subtitle}</p>}

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

						{(product.status !== 'Vendu' && product.status !== 'Réservé') ? (
							<p className="mt-4 text-2xl font-medium text-primary">{formatProductPrice(product)}</p>
						) : (
							null
						)}
						{dimensions && <p className="mt-2 text-muted-foreground">{dimensions}</p>}
						{product.description && <p className="mt-6 text-muted-foreground">{product.description}</p>}

						{(product.status !== 'Vendu' && product.status !== 'Réservé') && (
							<ReservationForm
								productSlug={product.slug}
								productName={product.name}
								labels={boutiqueContent.reservationForm}
							/>
						)}
					</StickySidebar>
				</div>
			</main>
		</div>
	);
}
