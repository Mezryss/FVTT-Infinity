import { AbilityDataModel } from './ability';
import { ContagionDataModel } from './contagion';
import { HostDataModel } from './host';
import { QualityDataModel } from './quality';
import { TalentDataModel } from './talent';

/**
 * Register Item Data Models
 */
export function register() {
	Object.assign(CONFIG.Item.dataModels, {
		ability: AbilityDataModel,
		contagion: ContagionDataModel,
		host: HostDataModel,
		quality: QualityDataModel,
		talent: TalentDataModel,
	});
}
