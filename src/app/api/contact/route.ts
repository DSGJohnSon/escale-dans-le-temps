import { Resend } from 'resend';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_PHOTOS } from '@/lib/contact-form';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

const recipients = (process.env.CONTACT_EMAIL_TO ?? '')
	.split(',')
	.map((email) => email.trim())
	.filter(Boolean);

const fromAddress = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev';

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
	if (!process.env.RESEND_API_KEY || recipients.length === 0) {
		console.error('Contact form: RESEND_API_KEY or CONTACT_EMAIL_TO is not configured.');
		return Response.json({ error: 'server_misconfigured' }, { status: 500 });
	}

	const formData = await request.formData();

	// Honeypot: a hidden field real visitors never fill in. If it's set, pretend success.
	if (String(formData.get('company') ?? '').trim().length > 0) {
		return Response.json({ success: true });
	}

	const firstName = String(formData.get('firstName') ?? '').trim();
	const lastName = String(formData.get('lastName') ?? '').trim();
	const email = String(formData.get('email') ?? '').trim();
	const phone = String(formData.get('phone') ?? '').trim();
	const project = String(formData.get('project') ?? '').trim();
	const photos = formData.getAll('photos').filter((entry): entry is File => entry instanceof File && entry.size > 0);

	if (!firstName || !lastName || !project || (!email && !phone)) {
		return Response.json({ error: 'invalid_request' }, { status: 400 });
	}

	if (photos.length > MAX_PHOTOS) {
		return Response.json({ error: 'too_many_photos' }, { status: 400 });
	}

	for (const photo of photos) {
		if (!ACCEPTED_IMAGE_TYPES.includes(photo.type) || photo.size > MAX_FILE_SIZE) {
			return Response.json({ error: 'invalid_photo' }, { status: 400 });
		}
	}

	const attachments = await Promise.all(
		photos.map(async (photo) => ({
			filename: photo.name,
			content: Buffer.from(await photo.arrayBuffer()),
		})),
	);

	const html = `
		<h2>Nouvelle demande de devis</h2>
		<p><strong>Nom :</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
		${email ? `<p><strong>E-mail :</strong> ${escapeHtml(email)}</p>` : ''}
		${phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ''}
		<p><strong>Projet :</strong></p>
		<p>${escapeHtml(project).replace(/\n/g, '<br />')}</p>
		${photos.length > 0 ? `<p>${photos.length} photo(s) jointe(s) à cet e-mail.</p>` : ''}
	`;

	const { error } = await resend.emails.send({
		from: fromAddress,
		to: recipients,
		replyTo: email || undefined,
		subject: `Nouvelle demande de devis — ${firstName} ${lastName}`,
		html,
		attachments,
	});

	if (error) {
		console.error('Resend error:', error);
		return Response.json({ error: 'send_failed' }, { status: 502 });
	}

	return Response.json({ success: true });
}
