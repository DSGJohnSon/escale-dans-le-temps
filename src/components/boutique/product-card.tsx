import Image from 'next/image';
import Link from 'next/link';
import { formatDimensions, formatProductPrice, getShowcaseThumbnail } from '@/lib/products';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

type ProductCardProps = {
	product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
	const thumbnail = getShowcaseThumbnail(product);
	const dimensions = formatDimensions(product.dimensions);

	return (
		<li className="group overflow-hidden rounded-2xl border border-border bg-card">
			<Link href={`/boutique/${product.slug}`} className="block">
				<div className="relative aspect-4/5 overflow-hidden">
					<Image
						src={thumbnail.default.src}
						alt={thumbnail.default.alt}
						fill
						sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
						className="object-cover transition-opacity duration-300 group-hover:opacity-0"
					/>
					<Image
						src={thumbnail.hover.src}
						alt=""
						aria-hidden="true"
						fill
						sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
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
				</div>

				<div className="p-4">
					<p className="font-heading text-lg">{product.name}</p>
					<div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-sm text-muted-foreground">
						{dimensions && <span className="whitespace-nowrap">{dimensions}</span>}
						<span className="font-medium whitespace-nowrap text-primary">{formatProductPrice(product)}</span>
					</div>
				</div>
			</Link>
		</li>
	);
}
