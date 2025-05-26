import { AmmunitionItemSheet } from '@/items/sheets/ammunition.ts';
import { ArmourItemSheet } from '@/items/sheets/armour.ts';
import { AugmentationItemSheet } from '@/items/sheets/augmentation.ts';
import { ExplosiveDeviceItemSheet } from '@/items/sheets/explosive-device.ts';
import { FakeIDItemSheet } from '@/items/sheets/fake-id.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';
import { HackingDeviceItemSheet } from '@/items/sheets/hacking-device.ts';
import { InfinityItemSheet } from '@/items/sheets/infinity-item.ts';
import { LifestyleItemSheet } from '@/items/sheets/lifestyle.ts';
import { ProgramItemSheet } from '@/items/sheets/program.ts';
import { WeaponItemSheet } from '@/items/sheets/weapon.ts';
import { AbilityItemSheet } from './ability';
import { ContagionItemSheet } from './contagion';
import { HostItemSheet } from './host';
import { QualityItemSheet } from './quality';
import { TalentItemSheet } from './talent';

const { Items } = foundry.documents.collections;
const { ItemSheet } = foundry.appv1.sheets;

/**
 * Register Item Sheets
 */
export function register() {
	Items.unregisterSheet('core', ItemSheet);

	registerSheet(AbilityItemSheet, ['ability']);
	registerSheet(AmmunitionItemSheet, ['ammunition']);
	registerSheet(ArmourItemSheet, ['armour']);
	registerSheet(AugmentationItemSheet, ['augmentation']);
	registerSheet(ContagionItemSheet, ['contagion']);
	registerSheet(ExplosiveDeviceItemSheet, ['explosiveDevice']);
	registerSheet(FakeIDItemSheet, ['fakeID']);
	registerSheet(GearItemSheet, ['drug', 'other', 'resource', 'tool']);
	registerSheet(HackingDeviceItemSheet, ['hackingDevice']);
	registerSheet(HostItemSheet, ['host']);
	registerSheet(LifestyleItemSheet, ['lifestyle']);
	registerSheet(ProgramItemSheet, ['program']);
	registerSheet(QualityItemSheet, ['quality']);
	registerSheet(TalentItemSheet, ['talent']);
	registerSheet(WeaponItemSheet, ['weapon']);
}

function registerSheet<SheetClass extends InfinityItemSheet = InfinityItemSheet>(
	sheetClass: new () => SheetClass,
	itemTypes: string[],
) {
	Items.registerSheet('infinity', sheetClass, {
		types: itemTypes,
		makeDefault: true,
	});
}
