import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { LABELED_EXPLOSIVE_CATEGORIES, LABELED_ITEM_SIZES } from '@/data/gear.ts';
import { ExplosiveDeviceDataModel } from '@/items/models/explosive-device.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class ExplosiveDeviceItemSheet extends GearItemSheet<ExplosiveDeviceDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['explosive-device'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: {
			template: 'systems/infinity/templates/sheets/item/gear/detail/explosive-device.hbs',
		},
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			LABELED_EXPLOSIVE_CATEGORIES,
			LABELED_ITEM_SIZES,
		};
	}
}
