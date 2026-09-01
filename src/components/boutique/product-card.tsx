import Image from "next/image";
import Link from "next/link";
import {
  formatDimensions,
  formatProductPrice,
  getProductHref,
  getShowcaseThumbnail,
  getStatusBadge,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Button } from "../ui/button";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const thumbnail = getShowcaseThumbnail(product);
  const dimensions = formatDimensions(product.dimensions);
  const statusBadge = getStatusBadge(product);

  return (
    <li className="group overflow-hidden rounded-2xl border border-border bg-card">
      <Link href={getProductHref(product)} className="block">
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src={thumbnail.default.src}
            alt={thumbnail.default.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-opacity duration-500 md:group-hover:opacity-0"
          />
          <div className="hidden md:block opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-full h-full relative">
			<div className="absolute inset-0 z-10 bg-linear-to-t from-slate-950/70 to-slate-950/0"></div>
			<Button variant="default" className="absolute z-10 inline w-auto px-4 py-2 text-sm font-medium text-background bg-primary hover:bg-primary bottom-0 left-1/2 -translate-x-1/2 cursor-pointer">
				<span>Voir le produit</span>
			</Button>
            <Image
              src={thumbnail.hover.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          {statusBadge && (
            <span
              className={cn(
                "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
                statusBadge === "Vendu" || statusBadge === "Indisponible"
                  ? "bg-foreground text-background"
                  : "bg-primary text-primary-foreground",
              )}
            >
              {statusBadge}
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="font-heading font-semibold text-2xl text-left text-balance">
            {product.name}
          </p>
          {product.subtitle && (
            <p className="font-heading text-lg">{product.subtitle}</p>
          )}
          <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium whitespace-nowrap text-primary">
              {formatProductPrice(product)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
