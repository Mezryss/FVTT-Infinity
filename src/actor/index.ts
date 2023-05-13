import InfinityActor from './InfinityActor';
import AdversaryDataModel from './data/AdversaryDataModel';
import GeistDataModel from './data/GeistDataModel';
import VehicleDataModel from './data/VehicleDataModel';
import AdversarySheet from './sheets/AdversarySheet';
import { CharacterSheet } from './sheets/CharacterSheet';
import GeistSheet from './sheets/GeistSheet';
import VehicleSheet from './sheets/VehicleSheet';

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
function registerDataModels() {
	CONFIG.Actor.systemDataModels.adversary = AdversaryDataModel;
	// Remotes are identical to Adversaries, except they use Structure & Faults instead of Vigour & Wounds.
	CONFIG.Actor.systemDataModels.remote = AdversaryDataModel;
	CONFIG.Actor.systemDataModels.geist = GeistDataModel;
	CONFIG.Actor.systemDataModels.vehicle = VehicleDataModel;
}

/**
 * Register Actor sheet classes.
 */
function registerSheets() {
	Actors.unregisterSheet('core', ActorSheet);

	registerSheet(AdversarySheet, 'adversary', 'remote');
	registerSheet(CharacterSheet, 'character');
	registerSheet(GeistSheet, 'geist');
	registerSheet(VehicleSheet, 'vehicle');
}

/**
 * Register a single sheet class for the selected Item types.
 *
 * @param sheetClass Sheet class to use.
 * @param types A list of sheet types to use this sheet.
 */
function registerSheet(sheetClass: any, ...types: string[]) {
	Actors.registerSheet('infinity', sheetClass, {
		types,
		makeDefault: true,
	});
}
