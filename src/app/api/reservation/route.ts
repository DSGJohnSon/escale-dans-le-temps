import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Resend } from 'resend';
import { getProductBySlug } from '@/lib/products';

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

async function loadProductAttachments(photoSrcs: string[]) {
	const attachments = [];

	for (const [index, src] of photoSrcs.entries()) {
		try {
			const filePath = path.join(process.cwd(), 'public', src);
			const content = await readFile(filePath);
			attachments.push({ filename: `photo-${index + 1}${path.extname(src) || '.jpg'}`, content });
		} catch (error) {
			console.error(`Reservation: impossible de lire la photo "${src}" pour la joindre au mail.`, error);
		}
	}

	return attachments;
}

export async function POST(request: Request) {
	if (!process.env.RESEND_API_KEY || recipients.length === 0) {
		console.error('Reservation form: RESEND_API_KEY or CONTACT_EMAIL_TO is not configured.');
		return Response.json({ error: 'server_misconfigured' }, { status: 500 });
	}

	const body = await request.json().catch(() => null);
	if (!body || typeof body !== 'object') {
		return Response.json({ error: 'invalid_request' }, { status: 400 });
	}

	// Honeypot: a hidden field real visitors never fill in. If it's set, pretend success.
	if (String(body.company ?? '').trim().length > 0) {
		return Response.json({ success: true });
	}

	const firstName = String(body.firstName ?? '').trim();
	const lastName = String(body.lastName ?? '').trim();
	const email = String(body.email ?? '').trim();
	const phone = String(body.phone ?? '').trim();
	const message = String(body.message ?? '').trim();
	const slug = String(body.slug ?? '').trim();

	if (!firstName || !lastName || !email || !phone || !slug) {
		return Response.json({ error: 'invalid_request' }, { status: 400 });
	}

	const product = getProductBySlug(slug);
	if (!product) {
		return Response.json({ error: 'invalid_request' }, { status: 400 });
	}

	const photoSrcs = new Set<string>();
	for (const photo of product.photos) {
		if (photo.kind === 'single') {
			photoSrcs.add(photo.image.src);
		} else {
			photoSrcs.add(photo.before.src);
			photoSrcs.add(photo.after.src);
		}
	}

	const attachments = await loadProductAttachments([...photoSrcs]);

	const html = `
		<h2>Demande de réservation</h2>
		<p><strong>Produit :</strong> ${escapeHtml(product.name)} (réf. ${escapeHtml(product.slug)})</p>
		<p><strong>Nom :</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
		<p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
		<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
		${message ? `<p><strong>Message :</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>` : ''}
	`;

	const { error } = await resend.emails.send({
		from: fromAddress,
		to: recipients,
		replyTo: email,
		subject: `Demande de réservation — ${product.name}`,
		html,
		attachments,
	});

	if (error) {
		console.error('Resend error:', error);
		return Response.json({ error: 'send_failed' }, { status: 502 });
	}

	return Response.json({ success: true });
}
