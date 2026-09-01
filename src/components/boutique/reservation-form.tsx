'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { FormErrorBanner } from '@/components/ui/form-error-banner';
import { FormField } from '@/components/ui/form-field';
import { FormSuccessPanel } from '@/components/ui/form-success-panel';
import { HoneypotField } from '@/components/ui/honeypot-field';
import { Input } from '@/components/ui/input';
import { Reveal } from '@/components/ui/reveal';
import { Textarea } from '@/components/ui/textarea';
import type { ReservationFormLabels } from '@/types/boutique';

type ReservationFormProps = {
	productSlug: string;
	productName: string;
	labels: ReservationFormLabels;
	/** `reservation` (défaut) pour une pièce à prix fixe, `quote` pour une demande de devis « Sur devis ». */
	intent?: 'reservation' | 'quote';
};

type Values = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
};

type FieldErrors = Partial<Record<'firstName' | 'lastName' | 'email' | 'phone', string>>;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyValues: Values = { firstName: '', lastName: '', email: '', phone: '', message: '' };

async function submitReservationRequest(payload: Record<string, string>): Promise<void> {
	const response = await fetch('/api/reservation', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error('submission_failed');
	}
}

export function ReservationForm({ productSlug, productName, labels, intent = 'reservation' }: ReservationFormProps) {
	const [values, setValues] = React.useState<Values>(emptyValues);
	const [errors, setErrors] = React.useState<FieldErrors>({});
	const [status, setStatus] = React.useState<Status>('idle');
	const [honeypot, setHoneypot] = React.useState('');
	const successRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (status === 'success') {
			successRef.current?.focus();
		}
	}, [status]);

	function updateValue(field: keyof Values, value: string) {
		setValues((prev) => ({ ...prev, [field]: value }));
	}

	function validate(): FieldErrors {
		const nextErrors: FieldErrors = {};

		if (!values.firstName.trim()) nextErrors.firstName = 'Merci de renseigner votre prénom.';
		if (!values.lastName.trim()) nextErrors.lastName = 'Merci de renseigner votre nom.';
		if (!values.email.trim()) {
			nextErrors.email = 'Merci de renseigner votre e-mail.';
		} else if (!EMAIL_PATTERN.test(values.email.trim())) {
			nextErrors.email = 'Merci de renseigner une adresse e-mail valide.';
		}
		if (!values.phone.trim()) nextErrors.phone = 'Merci de renseigner votre téléphone.';

		return nextErrors;
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const nextErrors = validate();
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		setStatus('submitting');

		try {
			await submitReservationRequest({
				firstName: values.firstName.trim(),
				lastName: values.lastName.trim(),
				email: values.email.trim(),
				phone: values.phone.trim(),
				message: values.message.trim(),
				company: honeypot,
				slug: productSlug,
				intent,
			});
			setStatus('success');
			setValues(emptyValues);
			setErrors({});
		} catch {
			setStatus('error');
		}
	}

	return (
		<Reveal as="section" aria-labelledby="reservation-heading" className="mt-8 border-t border-border pt-8">
			<h2 id="reservation-heading" className="font-heading text-2xl md:text-3xl">
				{labels.title}
			</h2>
			<p className="mt-2 max-w-xl text-muted-foreground">{labels.description}</p>

			{status === 'success' ? (
				<FormSuccessPanel
					ref={successRef}
					heading={labels.successHeading}
					message={labels.successMessage}
					resetLabel={labels.resetCta}
					onReset={() => setStatus('idle')}
				/>
			) : (
				<form noValidate onSubmit={handleSubmit} className="mt-6 space-y-6">
					<HoneypotField value={honeypot} onChange={setHoneypot} />

					<FormField id="res-firstName" label={labels.firstName} error={errors.firstName}>
						<Input
							id="res-firstName"
							name="firstName"
							autoComplete="given-name"
							value={values.firstName}
							onChange={(e) => updateValue('firstName', e.target.value)}
							aria-invalid={!!errors.firstName}
							aria-describedby={errors.firstName ? 'res-firstName-error' : undefined}
						/>
					</FormField>

					<FormField id="res-lastName" label={labels.lastName} error={errors.lastName}>
						<Input
							id="res-lastName"
							name="lastName"
							autoComplete="family-name"
							value={values.lastName}
							onChange={(e) => updateValue('lastName', e.target.value)}
							aria-invalid={!!errors.lastName}
							aria-describedby={errors.lastName ? 'res-lastName-error' : undefined}
						/>
					</FormField>

					<FormField id="res-email" label={labels.email} error={errors.email}>
						<Input
							id="res-email"
							name="email"
							type="email"
							autoComplete="email"
							value={values.email}
							onChange={(e) => updateValue('email', e.target.value)}
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? 'res-email-error' : undefined}
						/>
					</FormField>

					<FormField id="res-phone" label={labels.phone} error={errors.phone}>
						<Input
							id="res-phone"
							name="phone"
							type="tel"
							autoComplete="tel"
							value={values.phone}
							onChange={(e) => updateValue('phone', e.target.value)}
							aria-invalid={!!errors.phone}
							aria-describedby={errors.phone ? 'res-phone-error' : undefined}
						/>
					</FormField>

					<FormField id="res-message" label={`${labels.message} (${labels.messageHint})`}>
						<Textarea
							id="res-message"
							name="message"
							rows={4}
							value={values.message}
							onChange={(e) => updateValue('message', e.target.value)}
							placeholder={labels.messagePlaceholder ?? `Une question sur « ${productName} » ?`}
						/>
					</FormField>

					{status === 'error' && <FormErrorBanner message={labels.errorMessage} />}

					<Button type="submit" size="lg" disabled={status === 'submitting'}>
						{status === 'submitting' ? labels.submitting : labels.submit}
					</Button>
				</form>
			)}
		</Reveal>
	);
}
