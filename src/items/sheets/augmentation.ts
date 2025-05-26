import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { LABELED_AUGMENTATION_CATEGORIES, LABELED_AUGMENTATION_TYPES } from '@/data/gear.ts';
import { AugmentationDataModel } from '@/items/models/augmentation.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class AugmentationItemSheet extends GearItemSheet<AugmentationDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['augmentation'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/augmentation.hbs' },
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			LABELED_AUGMENTATION_TYPES,
			LABELED_AUGMENTATION_CATEGORIES,
		};
	}
}
