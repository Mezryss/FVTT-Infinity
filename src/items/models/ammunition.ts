import { ALL_AMMUNITION_CATEGORIES, AmmunitionCategory } from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';

const { StringField } = foundry.data.fields;

/**
 * Ammunition can be loaded into Ranged weapons, and used until consumed.
 *
 * `quantity` represents the number of reloads available for the ammunition.
 * `qualities` is a list of qualities that are added to the weapon when the ammunition is loaded, rather than qualities
 * of the ammunition itself.
 */
export class AmmunitionDataModel extends GearDataModel {
	/**
	 * Categorization that determines some information about the ammunition (such as the size of batches ammunition is
	 * sold in), but is not actually automated in any way.
	 */
	category!: AmmunitionCategory;

	static defineSchema() {
		return {
			...super.defineSchema(),

			category: new StringField({
				choices: ALL_AMMUNITION_CATEGORIES,
				initial: AmmunitionCategory.Standard,
				nullable: false,
				trim: true,
			}),
		};
	}
}
