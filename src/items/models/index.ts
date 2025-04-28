import { AbilityDataModel } from './ability';
import { TalentDataModel } from './talent';

/**
 * Register Item Data Models
 */
export function register() {
	Object.assign(CONFIG.Item.dataModels, {
		ability: AbilityDataModel,
		talent: TalentDataModel,
	});
}
