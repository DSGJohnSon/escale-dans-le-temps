import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { HeroHeader } from '@/components/sections/hero-header';
import { TickerBand } from '@/components/sections/ticker-band';
import { ArtisanSection } from '@/components/sections/artisan-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ShowcaseSection } from '@/components/sections/showcase-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ContactSection } from '@/components/sections/contact-section';
import { homeData } from '@/data/home-data';

export const metadata: Metadata = {
	openGraph: {
		images: [{ url: homeData.hero.image.src }],
	},
};

export default function Home() {
	return (
		<div className="w-full">
			<Header />

			<main>
				<HeroHeader hero={homeData.hero} />
				<TickerBand ticker={homeData.ticker} />
				<ArtisanSection artisan={homeData.artisan} />
				<ServicesSection services={homeData.services} />
				<ShowcaseSection showcase={homeData.showcase} />
				<GallerySection gallery={homeData.gallery} />
				<ContactSection contact={homeData.contact} />
			</main>
		</div>
	);
}
