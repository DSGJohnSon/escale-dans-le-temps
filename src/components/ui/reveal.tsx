'use client';

import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const tagMap = {
	div: motion.div,
	section: motion.section,
	li: motion.li,
} as const;

const variants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

type RevealProps = React.AriaAttributes & {
	as?: keyof typeof tagMap;
	id?: string;
	className?: string;
	delay?: number;
	children: React.ReactNode;
};

export function Reveal({ as = 'div', delay = 0, children, ...props }: RevealProps) {
	const Component = tagMap[as];
	const shouldReduceMotion = useReducedMotion();

	return (
		<Component
			initial={shouldReduceMotion ? false : 'hidden'}
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={variants}
			transition={{ duration: 0.6, ease: 'easeOut', delay }}
			{...props}
		>
			{children}
		</Component>
	);
}
