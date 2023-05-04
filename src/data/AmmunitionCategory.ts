/**
 * Ammunition categories.
 */
enum AmmunitionCategory {
	Standard = 'Standard',
	Special = 'Special',
	Heavy = 'Heavy',
	Arrows = 'Arrows',
	Shells = 'Shells',
}

namespace AmmunitionCategory {
	/**
	 * Convenience accessor for all Ammunition categories.
	 */
	export const all: AmmunitionCategory[] = [AmmunitionCategory.Standard, AmmunitionCategory.Special, AmmunitionCategory.Heavy, AmmunitionCategory.Arrows, AmmunitionCategory.Shells];
}

export default AmmunitionCategory;
