import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { LABELED_ARMOUR_TYPES } from '@/data/gear.ts';
import { ArmourDataModel } from '@/items/models/armour.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class ArmourItemSheet extends GearItemSheet<ArmourDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['armour'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/armour.hbs' },
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			LABELED_ARMOUR_TYPES,
		};
	}
}
