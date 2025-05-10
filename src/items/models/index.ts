import { AbilityDataModel } from './ability';
import { ContagionDataModel } from './contagion';
import { GearDataModel } from './gear';
import { QualityDataModel } from './quality';
import { TalentDataModel } from './talent';

/**
 * Register Item Data Models
 */
export function register() {
	Object.assign(CONFIG.Item.dataModels, {
		ability: AbilityDataModel,
		contagion: ContagionDataModel,
		gear: GearDataModel,
		quality: QualityDataModel,
		talent: TalentDataModel,
	});
}
