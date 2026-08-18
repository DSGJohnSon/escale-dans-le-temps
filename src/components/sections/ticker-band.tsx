import type { TickerContent } from '@/types/home';

type TickerBandProps = {
	ticker: TickerContent;
};

export function TickerBand({ ticker }: TickerBandProps) {
	return (
		<div className="overflow-hidden bg-primary/20 border-t border-b border-primary/50 py-6 lg:py-12 text-primary-foreground">
			<div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
				{[0, 1].map((repeat) => (
					<ul key={repeat} className="flex shrink-0 items-center gap-2 lg:gap-16" aria-hidden={repeat === 1}>
						{ticker.items.map((item, i) => (
							<li key={i} className="flex items-center gap-2 lg:gap-16 text-sm lg:text-xl font-heading font-semibold tracking-widest whitespace-nowrap uppercase">
								{item}
								<span aria-hidden="true" className='text-primary'>✦</span>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
}
