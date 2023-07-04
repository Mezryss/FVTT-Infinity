import { AmmunitionCategory } from '../../data/Gear.mjs';
import BasicItem from './templates/BasicItem.mjs';
import Gear from './templates/Gear.mjs';

/**
 * Data model for ammunition Item documents.
 *
 * @mixes BasicItem
 * @mixes Gear
 *
 * @property {AmmunitionCategory} category Ammunition category
 */
export default class AmmunitionDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...BasicItem(),
			...Gear(),

			category: new fields.StringField({
				initial: AmmunitionCategory.Standard,
				choices: AmmunitionCategory.all,
				nullable: false,
			}),
		};
	}
}
