import { ContagionDataModel } from '@/items/models/contagion';
import { InfinityItemSheet } from './infinity-item';
import { type SheetTabs } from '@/apps/sheets/handlebars-mixin';
import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin';
import { LABELED_CONTAGION_TYPES } from '@/data/contagion';

/**
 * Item Sheet for Contagions.
 */
export class ContagionItemSheet extends InfinityItemSheet<ContagionDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['contagion'],
		},
	};

	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/item/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		description: { template: 'systems/infinity/templates/sheets/item/description.hbs' },
		detail: { template: 'systems/infinity/templates/sheets/item/contagion/detail.hbs' },
		effects: { template: 'systems/infinity/templates/sheets/item/effects.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [{ id: 'description' }, { id: 'detail' }, { id: 'effects' }],
			initial: 'description',
			labelPrefix: 'Infinity.Tabs',
		},
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			LABELED_CONTAGION_TYPES,
		};
	}
}
