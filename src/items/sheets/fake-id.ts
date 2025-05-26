import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { FakeIDDataModel } from '@/items/models/fake-id.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class FakeIDItemSheet extends GearItemSheet<FakeIDDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['fake-id'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/fake-id.hbs' },
	};
}
