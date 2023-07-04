import InfinityItemSheet from './InfinityItemSheet.mjs';

import AbilityDataModel from './data/AbilityDataModel.mjs';
import AmmunitionDataModel from './data/AmmunitionDataModel.mjs';
import GearDataModel from './data/GearDataModel.mjs';
import ItemQualityDataModel from './data/ItemQualityDataModel.mjs';

/**
 * Base class for system Items.
 *
 * @template {foundry.abstract.TypeDataModel} SystemType
 * @property {SystemType} system
 */
export class InfinityItem extends Item {}

/**
 * Handle registration for all Infinity item data.
 */
export function registerItems() {
	console.debug('Registering Items...');

	CONFIG.Item.documentClass = InfinityItem;

	registerDataModels();
	registerSheets();

	// It's fine for partial registration to take longer; can't simply await this because the init hook isn't async.
	let _ = registerPartials();
}

/**
 * Register Infinity item data models.
 */
function registerDataModels() {
	CONFIG.Item.dataModels.ability = AbilityDataModel;
	CONFIG.Item.dataModels.ammunition = AmmunitionDataModel;
	CONFIG.Item.dataModels.gear = GearDataModel;
	CONFIG.Item.dataModels.itemQuality = ItemQualityDataModel;
}

/**
 * Register Infinity item sheets.
 */
function registerSheets() {
	Items.unregisterSheet('core', ItemSheet);

	registerSheet(InfinityItemSheet, 'ability', 'ammunition', 'augmentation', 'contagion', 'explosive', 'gear', 'itemQuality', 'program', 'weapon');
}

/**
 * Utility method to reduce repetition when registering sheets.
 *
 * The sheet class will be used as the default for all item types.
 *
 * @param {ItemSheet.constructor} sheetClass Sheet class to register for the types.
 * @param {string} types Item document types to register the sheet for.
 */
function registerSheet(sheetClass, ...types) {
	Items.registerSheet('infinity', sheetClass, {
		types,
		makeDefault: true,
	});
}

/**
 * Register Handlebars partials used by Item sheets.
 */
async function registerPartials() {
	await loadTemplates({
		...itemSidebar('ability'),
		...itemSidebar('ammunition'),
		...itemSidebar('itemQuality'),
		...itemSidebar('gear'),

		...itemPartial('sheet-base'),
		...itemPartial('item-qualities'),
	});
}

/**
 * Utility method for loading an item sidebar.
 *
 * @param {string} name Name of the file (without extension) in `templates/items/sidebars/`.
 */
function itemSidebar(name) {
	return {
		[`sidebars/${name}`]: `systems/infinity/templates/items/sidebars/${name}.hbs`,
	};
}

/**
 * Utility method for loading an item partial.
 *
 * @param {string} name Name of the file (without extension) in `templates/items/partials/`.
 */
function itemPartial(name) {
	return {
		[`items/${name}`]: `systems/infinity/templates/items/partials/${name}.hbs`,
	};
}
