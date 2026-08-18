import * as React from 'react';
import { Label } from '@/components/ui/label';

type FormFieldProps = {
	id: string;
	label: string;
	error?: string;
	children: React.ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<div className="mt-2">{children}</div>
			{error && (
				<p id={`${id}-error`} className="mt-1 text-sm text-destructive">
					{error}
				</p>
			)}
		</div>
	);
}
