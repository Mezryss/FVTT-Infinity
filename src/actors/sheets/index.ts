import { PlayerCharacterActorSheet } from './player';

import { ActorType } from '..';

/**
 * Register Actor Sheets
 */
export function register() {
	const { Actors } = foundry.documents.collections;
	const { ActorSheet } = foundry.appv1.sheets;

	Actors.unregisterSheet('core', ActorSheet);

	Actors.registerSheet('infinity', PlayerCharacterActorSheet, {
		types: [ActorType.Player],
		makeDefault: true,
	});
}
