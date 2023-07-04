import BasicItem from './templates/BasicItem.mjs';
import Gear from './templates/Gear.mjs';

/**
 * Data model for gear Item documents.
 *
 * @mixes BasicItem
 * @mixes Gear
 */
export default class GearDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			...BasicItem(),
			...Gear(),
		};
	}
}
