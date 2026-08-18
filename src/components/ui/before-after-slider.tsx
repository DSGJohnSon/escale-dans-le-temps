'use client';

import * as React from 'react';
import Image from 'next/image';
import type { ImageAsset } from '@/types/content';

type BeforeAfterSliderProps = {
	before: ImageAsset;
	after: ImageAsset;
	label: string;
};

export function BeforeAfterSlider({ before, after, label }: BeforeAfterSliderProps) {
	const [position, setPosition] = React.useState(50);

	return (
		<div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted select-none">
			<Image
				src={after.src}
				alt={after.alt}
				fill
				sizes="(min-width: 768px) 60vw, 90vw"
				className="object-cover"
			/>
			<div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
				<Image
					src={before.src}
					alt={before.alt}
					fill
					sizes="(min-width: 768px) 60vw, 90vw"
					className="object-cover"
				/>
			</div>

			<span className="absolute top-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium tracking-wide text-foreground uppercase backdrop-blur-xs">
				Avant
			</span>
			<span className="absolute top-3 right-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium tracking-wide text-foreground uppercase backdrop-blur-xs">
				Après
			</span>

			<div
				className="pointer-events-none absolute inset-y-0 w-0.5 bg-background"
				style={{ left: `${position}%` }}
			>
				<div className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-md">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
						<path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
					</svg>
				</div>
			</div>

			<input
				type="range"
				min={0}
				max={100}
				value={position}
				onChange={(event) => setPosition(Number(event.target.value))}
				aria-label={`Curseur avant/après : ${label}`}
				className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-transparent [&::-moz-range-track]:appearance-none [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
			/>
		</div>
	);
}
