/**
 * Enum representing all gear Size Categories.
 *
 * @readonly
 * @enum {string}
 */
export const ItemSize = {
	/**
	 * Insignificant is for items without a size rating, so there's no special case needed for a null field.
	 */
	Insignificant: 'Insignificant',

	OneHanded: 'OneHanded',
	TwoHanded: 'TwoHanded',
	Unbalanced: 'Unbalanced',
	Unwieldy: 'Unwieldy',
	Mounted: 'Mounted',
	Massive: 'Massive',
	Facility: 'Facility',

	/**
	 * Convenience accessor for all item sizes.
	 *
	 * @returns {ItemSize[]}
	 */
	get all() {
		return [ItemSize.Insignificant, ItemSize.OneHanded, ItemSize.TwoHanded, ItemSize.Unbalanced, ItemSize.Unwieldy, ItemSize.Mounted, ItemSize.Massive, ItemSize.Facility];
	},
};

/**
 * A description of a Fault taken by a piece of gear, usually due to damage.
 *
 * @typedef {object} ItemFault
 * @property {string} name Name for the fault
 * @property {string} description User-entered descriptive text for the Fault.
 */

/**
 * Enum representing all Ammunition Categories.
 *
 * @readonly
 * @enum {string}
 */
export const AmmunitionCategory = {
	Standard: 'Standard',
	Special: 'Special',
	Heavy: 'Heavy',
	Arrows: 'Arrows',
	Shells: 'Shells',

	/**
	 * Convenience accessor for all Ammunition categories.
	 *
	 * @returns {AmmunitionCategory[]}
	 */
	get all() {
		return [AmmunitionCategory.Standard, AmmunitionCategory.Special, AmmunitionCategory.Heavy, AmmunitionCategory.Arrows, AmmunitionCategory.Shells];
	},
};
