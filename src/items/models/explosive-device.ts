import {
	ALL_EXPLOSIVE_CATEGORIES,
	ALL_ITEM_SIZES,
	ExplosiveCategory,
	ItemSize,
} from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';

const { StringField } = foundry.data.fields;

export class ExplosiveDeviceDataModel extends GearDataModel {
	/**
	 * Explosive Device Category
	 */
	category!: ExplosiveCategory;

	/**
	 * Damage dealt by the Explosive Device, as a damage string (e.g. 2+6dN).
	 */
	damage!: string;

	/**
	 * Size of the explosive device. Usually 1H or 2H.
	 */
	size!: ItemSize;

	static defineSchema() {
		return {
			...super.defineSchema(),

			category: new StringField({
				choices: ALL_EXPLOSIVE_CATEGORIES,
				initial: ExplosiveCategory.Charges,
				nullable: false,
				trim: true,
			}),

			damage: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			size: new StringField({
				choices: ALL_ITEM_SIZES,
				initial: ItemSize.OneHanded,
				nullable: false,
				trim: true,
			}),
		};
	}
}
