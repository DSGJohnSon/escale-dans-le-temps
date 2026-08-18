type HoneypotFieldProps = {
	value: string;
	onChange: (value: string) => void;
};

/** Champ invisible destiné aux bots ; les vrais visiteurs ne le voient ni ne le remplissent jamais. */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
	return (
		<div className="absolute left-[-9999px]" aria-hidden="true">
			<label htmlFor="company">Ne pas remplir ce champ</label>
			<input
				id="company"
				name="company"
				type="text"
				tabIndex={-1}
				autoComplete="off"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}
