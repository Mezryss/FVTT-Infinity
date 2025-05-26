import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { LABELED_PROGRAM_TYPES } from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class ProgramItemSheet extends GearItemSheet<GearDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['program'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/program.hbs' },
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			LABELED_PROGRAM_TYPES,
		};
	}
}
