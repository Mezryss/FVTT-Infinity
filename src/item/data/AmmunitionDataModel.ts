import AmmunitionCategory from '@/data/AmmunitionCategory';
import GearItemDataModel from './templates/GearItemDataModel';

export default abstract class AmmunitionDataModel extends GearItemDataModel {
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
