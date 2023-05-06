import InfinityItem from './InfinityItem';
import AmmunitionDataModel from './data/AmmunitionDataModel';
import ArmourDataModel from './data/ArmourDataModel';
import AugmentationDataModel from './data/AugmentationDataModel';
import ContagionDataModel from './data/ContagionDataModel';
import ExplosiveDataModel from './data/ExplosiveDataModel';
import TalentDataModel from './data/TalentDataModel';
import AmmunitionSheet from './sheets/AmmunitionSheet';
import ArmourSheet from './sheets/ArmourSheet';
import AugmentationSheet from './sheets/AugmentationSheet';
import ContagionSheet from './sheets/ContagionSheet';
import ExplosiveSheet from './sheets/ExplosiveSheet';
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
	CONFIG.Item.systemDataModels.ammunition = AmmunitionDataModel;
	CONFIG.Item.systemDataModels.armour = ArmourDataModel;
	CONFIG.Item.systemDataModels.augmentation = AugmentationDataModel;
	CONFIG.Item.systemDataModels.contagion = ContagionDataModel;
	CONFIG.Item.systemDataModels.explosive = ExplosiveDataModel;

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

	Items.registerSheet('infinity', ArmourSheet, {
		types: ['armour'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', AugmentationSheet, {
		types: ['augmentation'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', ContagionSheet, {
		types: ['contagion'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', ExplosiveSheet, {
		types: ['explosive'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', TalentSheet, {
		types: ['talent'],
		makeDefault: true,
	});
}
