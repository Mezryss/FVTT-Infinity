import { HandlebarsParts } from '@/apps/sheets/handlebars-mixin';
import { QualityDataModel } from '@/items/models/quality';
import { InfinityItemSheet, type SheetTabs } from './infinity-item';
import { LABELED_QUALITY_TYPES } from '@/data/quality';

/**
 * Item sheet for Qualities.
 */
export class QualityItemSheet extends InfinityItemSheet<QualityDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['quality'],
		},
	};

	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/item/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		description: { template: 'systems/infinity/templates/sheets/item/description.hbs' },
		detail: { template: 'systems/infinity/templates/sheets/item/quality/detail.hbs' },
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

			LABELED_QUALITY_TYPES,
		};
	}
}
