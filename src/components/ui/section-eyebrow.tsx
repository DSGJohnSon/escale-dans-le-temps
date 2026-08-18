import { cn } from '@/lib/utils';

type SectionEyebrowProps = {
	children: React.ReactNode;
	className?: string;
};

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
	return (
		<p className={cn('text-xs font-medium tracking-[0.2em] text-primary uppercase', className)}>
			<span aria-hidden="true">— </span>
			{children}
		</p>
	);
}
