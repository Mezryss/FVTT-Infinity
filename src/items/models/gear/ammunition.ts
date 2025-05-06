import { ALL_AMMUNITION_CATEGORIES, AmmunitionCategory } from '@/data/gear';
import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField, StringField } = foundry.data.fields;

/**
 * Ammunition. CRB, p.339
 */
export class AmmunitionData extends DataModel {
	/**
	 * Categorization that determines some information about the ammunition (such as the size of batches ammunitions are sold in), but no automated functionality.
	 */
	category!: AmmunitionCategory;

	/**
	 * When loaded into a weapon, this ammunition type adds these qualities to the item's own list of item qualities.
	 */
	addsQualities!: GearQuality[];

	static defineSchema() {
		return {
			category: new StringField({
				choices: ALL_AMMUNITION_CATEGORIES,
				initial: AmmunitionCategory.Standard,
				nullable: false,
				trim: true,
			}),

			addsQualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),
		};
	}
}
