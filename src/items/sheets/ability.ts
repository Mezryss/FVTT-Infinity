import type { AbilityDataModel } from '@/items/models/ability';
import { InfinityItemSheet, type SheetTabs } from './infinity-item';
import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin';

/**
 * Item Sheet for Special Abilities.
 */
export class AbilityItemSheet extends InfinityItemSheet<AbilityDataModel> {
	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/item/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		description: { template: 'systems/infinity/templates/sheets/item/description.hbs' },
		effects: { template: 'systems/infinity/templates/sheets/item/effects.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [{ id: 'description' }, { id: 'effects' }],
			initial: 'description',
			labelPrefix: 'Infinity.Tabs',
		},
	};
}
