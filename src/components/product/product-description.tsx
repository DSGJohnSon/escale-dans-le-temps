import { normalizeDescription } from '@/lib/products';
import type { ProductDescription as ProductDescriptionValue } from '@/types/product';

/** Rend une description produit : paragraphes et/ou listes à puces (voir `ProductDescription`). */
export function ProductDescription({ description }: { description: ProductDescriptionValue }) {
	const blocks = normalizeDescription(description);
	if (blocks.length === 0) return null;

	return (
		<div className="mt-6 space-y-4 text-muted-foreground">
			{blocks.map((block, index) =>
				block.kind === 'paragraph' ? (
					<p key={index}>{block.text}</p>
				) : (
					<ul key={index} className="list-disc space-y-2 pl-5 marker:text-primary">
						{block.items.map((item, itemIndex) => (
							<li key={itemIndex}>
								{item.label && <strong className="font-medium text-foreground">{item.label} : </strong>}
								{item.text}
							</li>
						))}
					</ul>
				),
			)}
		</div>
	);
}
