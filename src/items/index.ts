import { InfinityItem } from '@/items/infinity-item';
import { register as registerModels } from '@/items/models';
import { register as registerSheets } from '@/items/sheets';

/**
 * Registers all Item classes (sheets, data models, item class, etc.)
 */
export function register() {
	CONFIG.Item.documentClass = InfinityItem;

	registerModels();
	registerSheets();
}

/**
 * Item Types. Keep in sync with public/system.json
 */
export enum ItemType {
	Ability = 'ability',
	Ammunition = 'ammunition',
	Armour = 'armour',
	Augmentation = 'augmentation',
	Contagion = 'contagion',
	Drug = 'drug',
	ExplosiveDevice = 'explosiveDevice',
	FakeID = 'fakeID',
	Gear = 'gear',
	HackingDevice = 'hackingDevice',
	Host = 'host',
	Lifestyle = 'lifestyle',
	Other = 'other',
	Program = 'program',
	Quality = 'quality',
	Resource = 'resource',
	Talent = 'talent',
	Tool = 'tool',
	Weapon = 'weapon',
}
