import InfinityItem from './InfinityItem';
import AbilityDataModel from './data/AbilityDataModel';
import AmmunitionDataModel from './data/AmmunitionDataModel';
import ArmourDataModel from './data/ArmourDataModel';
import AugmentationDataModel from './data/AugmentationDataModel';
import ContagionDataModel from './data/ContagionDataModel';
import ExplosiveDataModel from './data/ExplosiveDataModel';
import GearDataModel from './data/GearDataModel';
import HackingDeviceDataModel from './data/HackingDeviceDataModel';
import LHostDataModel from './data/LHostDataModel';
import ProgramDataModel from './data/ProgramDataModel';
import TalentDataModel from './data/TalentDataModel';
import WeaponDataModel from './data/WeaponDataModel';
import AbilitySheet from './sheets/AbilitySheet';
import AmmunitionSheet from './sheets/AmmunitionSheet';
import ArmourSheet from './sheets/ArmourSheet';
import AugmentationSheet from './sheets/AugmentationSheet';
import ContagionSheet from './sheets/ContagionSheet';
import ExplosiveSheet from './sheets/ExplosiveSheet';
import GearSheet from './sheets/GearSheet';
import HackingDeviceSheet from './sheets/HackingDeviceSheet';
import LHostSheet from './sheets/LHostSheet';
import ProgramSheet from './sheets/ProgramSheet';
import TalentSheet from './sheets/TalentSheet';
import WeaponSheet from './sheets/WeaponSheet';

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
	CONFIG.Item.systemDataModels.gear = GearDataModel;
	CONFIG.Item.systemDataModels.hackingDevice = HackingDeviceDataModel;
	CONFIG.Item.systemDataModels.lhost = LHostDataModel;
	CONFIG.Item.systemDataModels.program = ProgramDataModel;
	CONFIG.Item.systemDataModels.weapon = WeaponDataModel;

	CONFIG.Item.systemDataModels.abilities = AbilityDataModel;
	CONFIG.Item.systemDataModels.talent = TalentDataModel;
}

/**
 * Register Item sheet classes.
 */
function registerSheets() {
	Items.unregisterSheet('core', ItemSheet);

	registerSheet(AbilitySheet, 'ability');
	registerSheet(AmmunitionSheet, 'ammunition');
	registerSheet(ArmourSheet, 'armour');
	registerSheet(AugmentationSheet, 'augmentation');
	registerSheet(ContagionSheet, 'contagion');
	registerSheet(ExplosiveSheet, 'explosive');
	registerSheet(GearSheet, 'gear');
	registerSheet(HackingDeviceSheet, 'hackingDevice');
	registerSheet(LHostSheet, 'lhost');
	registerSheet(ProgramSheet, 'program');
	registerSheet(TalentSheet, 'talent');
	registerSheet(WeaponSheet, 'weapon');
}

/**
 * Register a single sheet class for the selected Item types.
 *
 * @param sheetClass Sheet class to use.
 * @param types A list of sheet types to use this sheet.
 */
function registerSheet(sheetClass: any, ...types: string[]) {
	Items.registerSheet('infinity', sheetClass, {
		types,
		makeDefault: true,
	});
}
