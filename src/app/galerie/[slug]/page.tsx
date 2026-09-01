import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ProductDetail } from '@/components/product/product-detail';
import { galerieContent } from '@/data/galerie';
import { products } from '@/data/products';
import { buildProductMetadata, getProductBySlug, isGalerieOnly } from '@/lib/products';

export function generateStaticParams() {
	return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<'/galerie/[slug]'>): Promise<Metadata> {
	const { slug } = await params;
	const product = getProductBySlug(slug);
	return product ? buildProductMetadata(product) : {};
}

export default async function GalerieProductPage({ params }: PageProps<'/galerie/[slug]'>) {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	// Une pièce encore en vente ou réservée n'a pas sa place dans la Galerie : sa fiche canonique reste en boutique.
	if (!isGalerieOnly(product)) {
		permanentRedirect(`/boutique/${product.slug}`);
	}

	return (
		<div className="w-full">
			<Header />
			<ProductDetail product={product} backHref="/galerie" backLabel={galerieContent.backToGalerie} />
		</div>
	);
}
