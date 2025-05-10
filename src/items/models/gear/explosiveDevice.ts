import { ALL_EXPLOSIVE_CATEGORIES, ALL_ITEM_SIZES, ExplosiveCategory, ItemSize } from '@/data/gear';
import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField, StringField } = foundry.data.fields;

/**
 * Explosive Devices. CRB, p.349
 */
export class ExplosiveDeviceData extends DataModel {
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

	/**
	 * Weapon qualities for the explosive.
	 */
	qualities!: GearQuality[];

	static defineSchema() {
		return {
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

			qualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),
		};
	}
}
