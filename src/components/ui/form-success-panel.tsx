'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FormSuccessPanelProps = {
	heading: string;
	message: string;
	resetLabel: string;
	onReset: () => void;
};

export const FormSuccessPanel = React.forwardRef<HTMLDivElement, FormSuccessPanelProps>(
	({ heading, message, resetLabel, onReset }, ref) => {
		return (
			<motion.div
				ref={ref}
				tabIndex={-1}
				role="status"
				aria-live="polite"
				initial={{ opacity: 0, y: 16, scale: 0.98 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.45, ease: 'easeOut' }}
				className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-14 text-center outline-none"
			>
				<motion.span
					initial={{ scale: 0.6, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
					className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					<CheckCircle2 className="size-8" aria-hidden="true" />
				</motion.span>
				<div>
					<p className="font-heading text-2xl md:text-3xl">{heading}</p>
					<p className="mt-2 max-w-md text-muted-foreground">{message}</p>
				</div>
				<Button type="button" variant="outline" onClick={onReset}>
					{resetLabel}
				</Button>
			</motion.div>
		);
	},
);

FormSuccessPanel.displayName = 'FormSuccessPanel';
