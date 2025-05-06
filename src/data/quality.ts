/**
 * Item Qualities. CRB, pp.333–338
 */
export enum QualityType {
	/**
	 * General Qualities are applicable to all item types.
	 */
	General = 'general',

	/**
	 * Armour Qualities are applicable specifically to items providing Armour.
	 */
	Armour = 'armour',

	/**
	 * Attack Qualities are applicable to attacks and weapons.
	 */
	Attack = 'attack',
}

/**
 * List of all Quality Types.
 */
export const ALL_QUALITY_TYPES: QualityType[] = [
	QualityType.General,
	QualityType.Armour,
	QualityType.Attack,
];

/**
 * Utility to construct a quality type label.
 */
function labeled(type: QualityType) {
	return {
		key: type,
		label: `Infinity.QualityTypes.${type}`,
	};
}

/**
 * Labeled quality types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_QUALITY_TYPES = ALL_QUALITY_TYPES.map(labeled);
