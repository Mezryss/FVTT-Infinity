import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { LABELED_LIFESTYLE_RATINGS } from '@/data/gear.ts';
import { LifestyleDataModel } from '@/items/models/lifestyle.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class LifestyleItemSheet extends GearItemSheet<LifestyleDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['lifestyle'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/lifestyle.hbs' },
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			LABELED_LIFESTYLE_RATINGS,
		};
	}
}
