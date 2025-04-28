/**
 * Character Attributes. CRB, p.29
 */
export enum Attribute {
	Agility = 'agility',
	Awareness = 'awareness',
	Brawn = 'brawn',
	Coordination = 'coordination',
	Intelligence = 'intelligence',
	Personality = 'personality',
	Willpower = 'willpower',
}

/**
 * Utility method to localize an attribute.
 */
export function localizeAttribute(attribute: Attribute): string {
	return game.i18n.localize(`Infinity.Attributes.${attribute}`);
}

/**
 * List of all Character Attributes.
 */
export const ALL_ATTRIBUTES: Attribute[] = [
	Attribute.Agility,
	Attribute.Awareness,
	Attribute.Brawn,
	Attribute.Coordination,
	Attribute.Intelligence,
	Attribute.Personality,
	Attribute.Willpower,
];
