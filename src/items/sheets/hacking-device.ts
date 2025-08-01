import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { HackingDeviceDataModel } from '@/items/models/hacking-device.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class HackingDeviceItemSheet extends GearItemSheet<HackingDeviceDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['hacking-device'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: {
			template: 'systems/infinity/templates/sheets/item/gear/detail/hacking-device.hbs',
		},
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,
		};
	}
}
