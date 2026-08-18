import { AlertCircle } from 'lucide-react';

type FormErrorBannerProps = {
	message: string;
};

export function FormErrorBanner({ message }: FormErrorBannerProps) {
	return (
		<div role="alert" className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
			<AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
			<p className="text-sm text-destructive">{message}</p>
		</div>
	);
}
