import InfinityItem from './InfinityItem';
import TalentDataModel from './data/TalentDataModel';
import AmmunitionSheet from './sheets/AmmunitionSheet';
import TalentSheet from './sheets/TalentSheet';

/**
 * Handle registration for all Item-related documents and document sheets.
 */
export function register() {
	// With the 'as any' cast here, we can assign InfinityItem even though it is technically abstract.
	CONFIG.Item.documentClass = InfinityItem as any;

	registerDataModels();
	registerSheets();
}

/**
 * Register Item data model classes.
 */
function registerDataModels() {
	CONFIG.Item.systemDataModels.talent = TalentDataModel;
}

/**
 * Register Item sheet classes.
 */
function registerSheets() {
	Items.unregisterSheet('core', ItemSheet);

	Items.registerSheet('infinity', AmmunitionSheet, {
		types: ['ammunition'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', TalentSheet, {
		types: ['talent'],
		makeDefault: true,
	});
}
