'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { FormErrorBanner } from '@/components/ui/form-error-banner';
import { FormField } from '@/components/ui/form-field';
import { FormSuccessPanel } from '@/components/ui/form-success-panel';
import { HoneypotField } from '@/components/ui/honeypot-field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/ui/reveal';
import { RichHeading } from '@/components/ui/rich-heading';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { Textarea } from '@/components/ui/textarea';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_PHOTOS } from '@/lib/contact-form';
import type { ContactContent } from '@/types/home';

type ContactSectionProps = {
	contact: ContactContent;
};

type Values = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	project: string;
};

type FieldErrors = Partial<Record<'firstName' | 'lastName' | 'contactMethod' | 'project' | 'photos', string>>;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyValues: Values = { firstName: '', lastName: '', email: '', phone: '', project: '' };

async function submitContactRequest(formData: FormData): Promise<void> {
	const response = await fetch('/api/contact', {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('submission_failed');
	}
}

export function ContactSection({ contact }: ContactSectionProps) {
	const { form } = contact;

	const [values, setValues] = React.useState<Values>(emptyValues);
	const [photos, setPhotos] = React.useState<File[]>([]);
	const [errors, setErrors] = React.useState<FieldErrors>({});
	const [status, setStatus] = React.useState<Status>('idle');
	const [honeypot, setHoneypot] = React.useState('');
	const successRef = React.useRef<HTMLDivElement>(null);

	const previewUrls = React.useMemo(() => photos.map((file) => URL.createObjectURL(file)), [photos]);

	React.useEffect(() => {
		if (status === 'success') {
			successRef.current?.focus();
		}
	}, [status]);

	React.useEffect(() => {
		return () => {
			previewUrls.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [previewUrls]);

	function updateValue(field: keyof Values, value: string) {
		setValues((prev) => ({ ...prev, [field]: value }));
	}

	function handleFilesSelected(fileList: FileList | null) {
		if (!fileList || fileList.length === 0) return;

		const incoming = Array.from(fileList);
		let error: string | undefined;

		setPhotos((prev) => {
			const accepted: File[] = [];

			for (const file of incoming) {
				if (prev.length + accepted.length >= MAX_PHOTOS) {
					error = `${form.photos} : 6 photos maximum.`;
					break;
				}
				if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
					error = `${file.name} : format non supporté (JPG, PNG ou WEBP uniquement).`;
					continue;
				}
				if (file.size > MAX_FILE_SIZE) {
					error = `${file.name} : dépasse 5 Mo.`;
					continue;
				}
				accepted.push(file);
			}

			return [...prev, ...accepted];
		});

		setErrors((prev) => ({ ...prev, photos: error }));
	}

	function removePhoto(index: number) {
		setPhotos((prev) => prev.filter((_, i) => i !== index));
	}

	function validate(): FieldErrors {
		const nextErrors: FieldErrors = {};

		if (!values.firstName.trim()) nextErrors.firstName = 'Merci de renseigner votre prénom.';
		if (!values.lastName.trim()) nextErrors.lastName = 'Merci de renseigner votre nom.';

		const hasEmail = values.email.trim().length > 0;
		const hasPhone = values.phone.trim().length > 0;
		if (!hasEmail && !hasPhone) {
			nextErrors.contactMethod = form.contactMethodHint;
		} else if (hasEmail && !EMAIL_PATTERN.test(values.email.trim())) {
			nextErrors.contactMethod = 'Merci de renseigner une adresse e-mail valide.';
		}

		if (!values.project.trim()) nextErrors.project = 'Merci de décrire votre projet.';

		return nextErrors;
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const nextErrors = validate();
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		setStatus('submitting');

		const formData = new FormData();
		formData.append('firstName', values.firstName.trim());
		formData.append('lastName', values.lastName.trim());
		formData.append('email', values.email.trim());
		formData.append('phone', values.phone.trim());
		formData.append('project', values.project.trim());
		formData.append('company', honeypot);
		photos.forEach((file) => formData.append('photos', file));

		try {
			await submitContactRequest(formData);
			setStatus('success');
			setValues(emptyValues);
			setPhotos([]);
			setErrors({});
		} catch {
			setStatus('error');
		}
	}

	return (
		<Reveal
			as="section"
			id="contact"
			aria-labelledby="contact-heading"
			className="mx-auto max-w-6xl px-4 py-16 md:py-24"
		>
			<SectionEyebrow>{contact.eyebrow}</SectionEyebrow>
			<RichHeading as="h2" id="contact-heading" segments={contact.heading} className="mt-3 text-3xl md:text-4xl" />
			<p className="mt-4 text-muted-foreground">{contact.description}</p>

			{status === 'success' ? (
				<FormSuccessPanel
					ref={successRef}
					heading={form.successHeading}
					message={form.successMessage}
					resetLabel={form.resetCta}
					onReset={() => setStatus('idle')}
				/>
			) : (
				<form noValidate onSubmit={handleSubmit} className="mt-10 space-y-6">
					<HoneypotField value={honeypot} onChange={setHoneypot} />

					<div className="grid gap-6 sm:grid-cols-2">
						<FormField id="firstName" label={form.firstName} error={errors.firstName}>
							<Input
								id="firstName"
								name="firstName"
								autoComplete="given-name"
								value={values.firstName}
								onChange={(e) => updateValue('firstName', e.target.value)}
								aria-invalid={!!errors.firstName}
								aria-describedby={errors.firstName ? 'firstName-error' : undefined}
							/>
						</FormField>

						<FormField id="lastName" label={form.lastName} error={errors.lastName}>
							<Input
								id="lastName"
								name="lastName"
								autoComplete="family-name"
								value={values.lastName}
								onChange={(e) => updateValue('lastName', e.target.value)}
								aria-invalid={!!errors.lastName}
								aria-describedby={errors.lastName ? 'lastName-error' : undefined}
							/>
						</FormField>
					</div>

					<fieldset className="m-0 border-0 p-0 pb-3">
						<legend className="mb-3 text-sm text-muted-foreground">{form.contactMethodHint}</legend>
						<div className="grid gap-6 sm:grid-cols-2">
							<div>
								<Label htmlFor="email">{form.email}</Label>
								<Input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									value={values.email}
									onChange={(e) => updateValue('email', e.target.value)}
									aria-invalid={!!errors.contactMethod}
									aria-describedby={errors.contactMethod ? 'contact-method-error' : undefined}
									className="mt-2"
								/>
							</div>
							<div>
								<Label htmlFor="phone">{form.phone}</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									autoComplete="tel"
									value={values.phone}
									onChange={(e) => updateValue('phone', e.target.value)}
									aria-invalid={!!errors.contactMethod}
									aria-describedby={errors.contactMethod ? 'contact-method-error' : undefined}
									className="mt-2"
								/>
							</div>
						</div>
						{errors.contactMethod && (
							<p id="contact-method-error" className="mt-2 text-sm text-destructive">
								{errors.contactMethod}
							</p>
						)}
					</fieldset>

					<FormField id="project" label={form.project} error={errors.project}>
						<Textarea
							id="project"
							name="project"
							rows={5}
							value={values.project}
							onChange={(e) => updateValue('project', e.target.value)}
							aria-invalid={!!errors.project}
							aria-describedby={errors.project ? 'project-error' : undefined}
						/>
					</FormField>

					<div>
						<Label htmlFor="photos">{form.photos}</Label>
						<p className="mt-1 text-sm text-muted-foreground">{form.photosHint}</p>
						<input
							id="photos"
							name="photos"
							type="file"
							multiple
							accept="image/jpeg,image/png,image/webp"
							onChange={(event) => {
								handleFilesSelected(event.target.files);
								event.target.value = '';
							}}
							disabled={photos.length >= MAX_PHOTOS}
							aria-describedby={errors.photos ? 'photos-error' : undefined}
							className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
						/>
						{errors.photos && (
							<p id="photos-error" className="mt-1 text-sm text-destructive">
								{errors.photos}
							</p>
						)}

						{photos.length > 0 && (
							<ul className="mt-4 flex flex-wrap gap-3">
								{photos.map((file, index) => (
									<li key={`${file.name}-${index}`} className="relative">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={previewUrls[index]}
											alt={`Aperçu de la photo ${index + 1} : ${file.name}`}
											className="size-20 rounded-lg border border-border object-cover"
										/>
										<button
											type="button"
											onClick={() => removePhoto(index)}
											aria-label={`Retirer la photo ${file.name}`}
											className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-foreground text-sm text-background"
										>
											×
										</button>
									</li>
								))}
							</ul>
						)}
					</div>

					{status === 'error' && <FormErrorBanner message={form.errorMessage} />}

					<Button type="submit" size="lg" disabled={status === 'submitting'}>
						{status === 'submitting' ? form.submitting : form.submit}
					</Button>
				</form>
			)}
		</Reveal>
	);
}
