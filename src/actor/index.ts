import InfinityActor from './InfinityActor';
import { CharacterSheet } from './sheets/CharacterSheet';

/**
 * Handle registration for all Actor-related documents and document sheets.
 */
export function register() {
	// With the 'as any' cast here, we can assign InfinityActor even though it is technically abstract.
	CONFIG.Actor.documentClass = InfinityActor as any;

	registerDataModels();
	registerSheets();
}

/**
 * Register Actor data model classes.
 */
function registerDataModels() {}

/**
 * Register Actor sheet classes.
 */
function registerSheets() {
	Actors.unregisterSheet('core', ActorSheet);

	Actors.registerSheet('infinity', CharacterSheet, {
		types: ['character'],
		makeDefault: true,
	});
}
