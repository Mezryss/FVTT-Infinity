/**
 * Character attributes.
 */
enum Attribute {
	Agility = 'Agility',
	Awareness = 'Awareness',
	Brawn = 'Brawn',
	Coordination = 'Coordination',
	Intelligence = 'Intelligence',
	Personality = 'Personality',
	Willpower = 'Willpower',
}

namespace Attribute {
	/**
	 * Convenience accessor for all character attributes.
	 */
	export const all: Attribute[] = [Attribute.Agility, Attribute.Awareness, Attribute.Brawn, Attribute.Coordination, Attribute.Intelligence, Attribute.Personality, Attribute.Willpower];

	/**
	 * Retrieves the localized name of the specified Attribute.
	 */
	export function localize(attribute: Attribute) {
		return game.i18n.localize(`Infinity.Attributes.${attribute}`);
	}

	/**
	 * Retrieves the localized abbreviation for the specified Attribute.
	 */
	export function localizeAbbreviation(attribute: Attribute) {
		return game.i18n.localize(`Infinity.Attributes.Abbreviations.${attribute}`);
	}
}

export default Attribute;
