import { PlayerCharacterDataModel } from './player';

/**
 * Register Actor Data Models
 */
export function register() {
	Object.assign(CONFIG.Actor.dataModels, {
		player: PlayerCharacterDataModel,
	});
}
