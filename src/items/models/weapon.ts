import { ALL_ITEM_SIZES, ALL_WEAPON_TYPES, ItemSize, WeaponType } from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';

const { StringField } = foundry.data.fields;

export class WeaponDataModel extends GearDataModel {
	/**
	 * Melee vs. Ranged weapon
	 */
	type!: WeaponType;

	/**
	 * Range of the weapon.
	 *
	 * Handled as a general-purpose string rather than an enum since range is not mechanized and aren't always conducive to a restricted list of options.
	 *
	 * Ranged Weapons only.
	 */
	range!: string;

	/**
	 * Damage dealt by the weapon, as a damage string.
	 */
	damage!: string;

	/**
	 * Burst value of the weapon.
	 *
	 * Not mechanized and value can vary, so kept as a general-purpose string.
	 *
	 * Ranged Weapons only.
	 */
	burst!: string;

	/**
	 * Size of the weapon.
	 */
	size!: ItemSize;

	/**
	 * What ammunition types are allowed to be used with the weapon.
	 *
	 * Ranged Weapons only.
	 */
	ammo!: string;

	static defineSchema() {
		return {
			...super.defineSchema(),

			type: new StringField({
				choices: ALL_WEAPON_TYPES,
				initial: WeaponType.Melee,
				nullable: false,
				trim: true,
			}),

			range: new StringField({
				initial: 'C',
				nullable: false,
				trim: true,
			}),

			damage: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			burst: new StringField({
				initial: '1',
				nullable: false,
				trim: true,
			}),

			size: new StringField({
				choices: ALL_ITEM_SIZES,
				initial: ItemSize.OneHanded,
				nullable: false,
				trim: true,
			}),

			ammo: new StringField({
				initial: 'Standard',
				nullable: false,
				trim: true,
			}),
		};
	}
}
