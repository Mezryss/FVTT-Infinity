import HasBasicItemData from './templates/HasBasicItemData';
import HasGearData from './templates/HasGearData';

/**
 * Ammunition categories.
 */
export enum AmmunitionCategory {
	Standard = 'Standard',
	Special = 'Special',
	Heavy = 'Heavy',
	Arrows = 'Arrows',
	Shells = 'Shells',
}

export namespace AmmunitionCategory {
	/**
	 * Convenience accessor for all Ammunition categories.
	 */
	export const all: AmmunitionCategory[] = [AmmunitionCategory.Standard, AmmunitionCategory.Special, AmmunitionCategory.Heavy, AmmunitionCategory.Arrows, AmmunitionCategory.Shells];
}

export default abstract class AmmunitionDataModel extends HasGearData(HasBasicItemData(foundry.abstract.TypeDataModel)) {
	/**
	 * Ammunition Category.
	 */
	abstract category: AmmunitionCategory;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			category: new fields.StringField({
				initial: AmmunitionCategory.Standard,
				choices: AmmunitionCategory.all,
				nullable: true,
			}),
		};
	}
}
