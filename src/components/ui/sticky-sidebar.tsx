'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/** Marge sous le header collant. */
const TOP_GAP = 96;
/** Marge conservée sous la colonne une fois qu'elle est figée. */
const BOTTOM_GAP = 24;

/**
 * Colonne collante sans barre de défilement interne.
 * Plus haute que la fenêtre, elle suit le défilement jusqu'à ce que son bas soit
 * atteint, puis se fige (`top` négatif). Plus courte, elle se cale simplement
 * sous le header. Le décalage est recalculé quand la colonne ou la fenêtre change
 * de taille (validation du formulaire, panneau de succès, rotation…).
 */
export function StickySidebar({ className, children }: { className?: string; children: React.ReactNode }) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [top, setTop] = React.useState(TOP_GAP);

	React.useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const update = () => {
			const overflow = element.offsetHeight + TOP_GAP + BOTTOM_GAP - window.innerHeight;
			setTop(overflow > 0 ? TOP_GAP - overflow : TOP_GAP);
		};

		update();

		const observer = new ResizeObserver(update);
		observer.observe(element);
		window.addEventListener('resize', update);

		return () => {
			observer.disconnect();
			window.removeEventListener('resize', update);
		};
	}, []);

	return (
		<div ref={ref} style={{ top }} className={cn('md:sticky md:self-start', className)}>
			{children}
		</div>
	);
}
