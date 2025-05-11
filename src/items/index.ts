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
	Contagion = 'contagion',
	Gear = 'gear',
	Host = 'host',
	Quality = 'quality',
	Talent = 'talent',
}
