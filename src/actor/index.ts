import InfinityActor from './InfinityActor';
import { CharacterSheet } from './sheets/CharacterSheet';

export function register() {
	// With the 'as any' cast here, we can assign InfinityActor even though it is technically abstract.
	CONFIG.Actor.documentClass = InfinityActor as any;

	registerDataModels();
	registerSheets();
}

function registerDataModels() {}

function registerSheets() {
	Actors.unregisterSheet('core', ActorSheet);

	Actors.registerSheet('infinity', CharacterSheet, {
		types: ['character'],
		makeDefault: true,
	});
}
