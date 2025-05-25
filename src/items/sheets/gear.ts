import type {HandlebarsParts, SheetTabs} from '@/apps/sheets/handlebars-mixin.ts';
import {GearDataModel} from '@/items/models/gear.ts';
import {InfinityItemSheet} from '@/items/sheets/infinity-item.ts';

/**
 * Item Sheet for Gear.
 */
export class GearItemSheet<DataModel extends GearDataModel = GearDataModel> extends InfinityItemSheet<DataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['talent'],
		},
	};

	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/item/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		description: { template: 'systems/infinity/templates/sheets/item/description.hbs' },
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/other.hbs' },
		effects: { template: 'systems/infinity/templates/sheets/item/effects.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [{ id: 'description' }, { id: 'detail' }, { id: 'effects' }],
			initial: 'detail',
			labelPrefix: 'Infinity.Tabs',
		},
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,
		}
	}
}
