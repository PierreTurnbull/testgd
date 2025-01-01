import spritesDatas from "@assets/sprites/spritesDatas.json";

/**
 * The variants of each entity. The variant gives a little bit of diversity between entities, without changing their behaviour.
 */
const variantEntries: [string, number][] = spritesDatas
	.map(spriteDatas => spriteDatas.name)
	.map(name => {
		const variantRegexpResult = name.match(RegExp(/\.[0-9]+\.?/, "g"));
		if (!variantRegexpResult) {
			throw new Error(`${name} does not have any variant match.`);
		}
		const variant = Number(variantRegexpResult[0].replace(".", ""));

		return [
			name,
			variant,
		];
	});
export const VARIANTS = Object.fromEntries<number>([...new Set(variantEntries)]);