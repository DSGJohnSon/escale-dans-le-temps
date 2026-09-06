import Image from 'next/image';
import Link from 'next/link';
import { ReservationForm } from '@/components/boutique/reservation-form';
import { ProductDescription } from '@/components/product/product-description';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';
import { StickySidebar } from '@/components/ui/sticky-sidebar';
import { cn } from '@/lib/utils';
import { boutiqueContent } from '@/data/boutique';
import { withImageSize } from '@/lib/image-size';
import {
	formatDimensions,
	formatProductPrice,
	getBeforeAfterPhotos,
	getSinglePhotos,
	getStatusBadge,
	isOnQuote,
	isReservable,
} from '@/lib/products';
import type { Product } from '@/types/product';

type ProductDetailProps = {
	product: Product;
	/** Lien et libellé du "retour" : diffèrent selon que la fiche est servie par la Boutique ou la Galerie. */
	backHref: string;
	backLabel: string;
	/**
	 * - `sidebar` (boutique) : photos à gauche, colonne texte collante à droite.
	 * - `stacked` (galerie) : bloc texte en haut, photos empilées en dessous.
	 */
	variant?: 'sidebar' | 'stacked';
};

/** Fiche produit complète, partagée par `/boutique/[slug]` et `/galerie/[slug]`. */
export async function ProductDetail({ product, backHref, backLabel, variant = 'sidebar' }: ProductDetailProps) {
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
	const stacked = variant === 'stacked';
	const dimensions = formatDimensions(product.dimensions);
	// La Galerie (variante `stacked`) est un portfolio : ni pastille de statut, ni prix.
	const statusBadge = stacked ? null : getStatusBadge(product);
	const showPrice = !stacked && (isReservable(product) || isOnQuote(product));
	const imageSizes = stacked ? '(min-width: 768px) 768px, 100vw' : '(min-width: 768px) 45vw, 90vw';

	const textContent = (
		<>
			<h1 className="font-heading font-semibold text-3xl md:text-4xl">{product.name}</h1>
			{product.subtitle && <p className="mt-2 font-heading text-xl md:text-2xl">{product.subtitle}</p>}

			{statusBadge && (
				<span
					className={cn(
						'mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
						statusBadge === 'Vendu' || statusBadge === 'Indisponible'
							? 'bg-foreground text-background'
							: 'bg-primary text-primary-foreground',
					)}
				>
					{statusBadge}
				</span>
			)}

			{showPrice && <p className="mt-4 text-2xl font-medium text-primary">{formatProductPrice(product)}</p>}
			{dimensions && <p className="mt-2 text-muted-foreground">{dimensions}</p>}
			{product.description && <ProductDescription description={product.description} />}

			{isReservable(product) && (
				<ReservationForm
					productSlug={product.slug}
					productName={product.name}
					labels={boutiqueContent.reservationForm}
				/>
			)}

			{isOnQuote(product) && (
				<ReservationForm
					intent="quote"
					productSlug={product.slug}
					productName={product.name}
					labels={boutiqueContent.quoteForm}
				/>
			)}
		</>
	);

	const photos = (
		<>
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
					sizes={imageSizes}
					className="block h-auto w-full rounded-2xl bg-muted"
				/>
			))}
		</>
	);

	if (stacked) {
		return (
			<main className="mx-auto max-w-3xl px-4 py-12 md:py-20">
				<Link href={backHref} className="text-sm text-muted-foreground hover:text-foreground">
					← {backLabel}
				</Link>

				<div className="mt-6">{textContent}</div>
				<div className="mt-10 space-y-6">{photos}</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-6xl px-4 py-12 md:py-20">
			<Link href={backHref} className="text-sm text-muted-foreground hover:text-foreground">
				← {backLabel}
			</Link>

			<div className="mt-6 grid gap-10 md:grid-cols-2 md:items-start">
				<div className="space-y-4">{photos}</div>

				{/* Colonne collante : le formulaire reste visible pendant le défilement des photos. */}
				<StickySidebar>{textContent}</StickySidebar>
			</div>
		</main>
	);
}
