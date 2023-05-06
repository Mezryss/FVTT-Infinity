import GearItemDataModel from './templates/GearItemDataModel';

/**
 * Weapon Types
 */
export enum WeaponType {
	Melee = 'Melee',
	Ranged = 'Ranged',
}

export namespace WeaponType {
	/**
	 * Convenience accessor for all weapon types.
	 */
	export const all: WeaponType[] = [WeaponType.Melee, WeaponType.Ranged];
}

export default abstract class WeaponDataModel extends GearItemDataModel {
	/**
	 * Weapon Type
	 */
	abstract type: WeaponType;

	/**
	 * Weapon Damage Value
	 */
	abstract damage: string;

	/**
	 * Range or ranges that the weapon is effective at.
	 */
	abstract range: string;

	/**
	 * Weapon's burst value (p.358)
	 */
	abstract burst: string;

	/**
	 * Weapon's Ammunition Resource
	 */
	abstract ammo: {
		/**
		 * What ammunition types are allowed to be used by the weapon.
		 */
		allowed: string;

		/**
		 * (Owned Only) What ammunition type is currently selected for the weapon.
		 */
		selected: string;
	};

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			type: new fields.StringField({
				initial: WeaponType.Melee,
				choices: WeaponType.all,
				nullable: false,
			}),

			damage: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			range: new fields.StringField({
				initial: 'C',
				nullable: false,
			}),

			burst: new fields.StringField({
				initial: '1',
				nullable: false,
			}),

			ammo: new fields.SchemaField({
				allowed: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				selected: new fields.StringField({
					initial: '',
					nullable: false,
				}),
			}),
		};
	}
}
