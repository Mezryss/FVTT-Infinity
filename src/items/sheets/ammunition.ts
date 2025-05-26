import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { LABELED_AMMUNITION_CATEGORIES } from '@/data/gear.ts';
import { AmmunitionDataModel } from '@/items/models/ammunition.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class AmmunitionItemSheet extends GearItemSheet<AmmunitionDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['ammunition'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/ammunition.hbs' },
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			LABELED_AMMUNITION_CATEGORIES,
		};
	}
}
