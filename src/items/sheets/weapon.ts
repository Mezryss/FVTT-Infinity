import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin.ts';
import { LABELED_ITEM_SIZES, LABELED_WEAPON_TYPES, WeaponType } from '@/data/gear.ts';
import { WeaponDataModel } from '@/items/models/weapon.ts';
import { GearItemSheet } from '@/items/sheets/gear.ts';

export class WeaponItemSheet extends GearItemSheet<WeaponDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		window: {
			contentClasses: ['weapon'],
		},
	};

	static PARTS: HandlebarsParts = {
		...GearItemSheet.PARTS,
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/weapon.hbs' },
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			showRangedFields: this.item.system.type === WeaponType.Ranged,

			LABELED_ITEM_SIZES,
			LABELED_WEAPON_TYPES,
		};
	}
}
