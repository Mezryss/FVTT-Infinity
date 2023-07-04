/**
 * Enum representing all Character attributes.
 *
 * @readonly
 * @enum {string}
 */
export const Attribute = {
	Agility: 'Agility',
	Awareness: 'Awareness',
	Brawn: 'Brawn',
	Coordination: 'Coordination',
	Intelligence: 'Intelligence',
	Personality: 'Personality',
	Willpower: 'Willpower',

	/**
	 * Convenience accessor for all attributes
	 *
	 * @returns {Attribute[]}
	 */
	get all() {
		return [Attribute.Agility, Attribute.Awareness, Attribute.Brawn, Attribute.Coordination, Attribute.Intelligence, Attribute.Personality, Attribute.Willpower];
	},
};

/**
 * Utility method to localize an Attribute's name.
 *
 * @param {Attribute} attribute
 * @param {boolean=false} abbreviated
 * @returns {string}
 */
export function localizeAttribute(attribute, { abbreviated } = { abbreviated: false }) {
	if (abbreviated) {
		return game.i18n.localize(`Attributes.Abbreviations.${attribute}`);
	}

	return game.i18n.localize(`Attributes.${attribute}`);
}
