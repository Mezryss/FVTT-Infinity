import { AbilityDataModel } from './ability';
import { GearDataModel } from './gear';
import { TalentDataModel } from './talent';

/**
 * Register Item Data Models
 */
export function register() {
	Object.assign(CONFIG.Item.dataModels, {
		ability: AbilityDataModel,
		gear: GearDataModel,
		talent: TalentDataModel,
	});
}
