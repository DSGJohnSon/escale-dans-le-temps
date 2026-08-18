import * as React from 'react';
import { cn } from '@/lib/utils';
import type { HeadingSegment } from '@/types/content';

type RichHeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> & {
	as?: 'h1' | 'h2' | 'h3';
	segments: HeadingSegment[];
};

export function RichHeading({ as: Tag = 'h2', segments, className, ...props }: RichHeadingProps) {
	return (
		<Tag className={cn('text-balance font-heading leading-tight', className)} {...props}>
			{segments.map((segment, i) =>
				segment.emphasis ? (
					<em key={i} className="text-primary italic">
						{segment.text}
					</em>
				) : (
					<React.Fragment key={i}>{segment.text}</React.Fragment>
				),
			)}
		</Tag>
	);
}
