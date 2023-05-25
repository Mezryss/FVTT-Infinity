import InfinityItem from './InfinityItem';
import AbilityDataModel from './data/AbilityDataModel';
import AmmunitionDataModel from './data/AmmunitionDataModel';
import ArmourDataModel from './data/ArmourDataModel';
import AugmentationDataModel from './data/AugmentationDataModel';
import ContagionDataModel from './data/ContagionDataModel';
import ExplosiveDataModel from './data/ExplosiveDataModel';
import GearDataModel from './data/GearDataModel';
import HackingDeviceDataModel from './data/HackingDeviceDataModel';
import ItemQualityDataModel from './data/ItemQualityDataModel';
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
import ItemQualitySheet from './sheets/ItemQualitySheet';
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
	CONFIG.Item.dataModels.ammunition = AmmunitionDataModel;
	CONFIG.Item.dataModels.armour = ArmourDataModel;
	CONFIG.Item.dataModels.augmentation = AugmentationDataModel;
	CONFIG.Item.dataModels.contagion = ContagionDataModel;
	CONFIG.Item.dataModels.explosive = ExplosiveDataModel;
	CONFIG.Item.dataModels.gear = GearDataModel;
	CONFIG.Item.dataModels.hackingDevice = HackingDeviceDataModel;
	CONFIG.Item.dataModels.lhost = LHostDataModel;
	CONFIG.Item.dataModels.program = ProgramDataModel;
	CONFIG.Item.dataModels.weapon = WeaponDataModel;

	CONFIG.Item.dataModels.abilities = AbilityDataModel;
	CONFIG.Item.dataModels.itemQuality = ItemQualityDataModel;
	CONFIG.Item.dataModels.talent = TalentDataModel;
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
	registerSheet(ItemQualitySheet, 'itemQuality');
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
