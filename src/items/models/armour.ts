import { ALL_ARMOUR_TYPES, ArmourType } from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';

const { NumberField, SchemaField, StringField } = foundry.data.fields;

function makeIntegerField() {
	return new NumberField({
		initial: 0,
		integer: true,
		min: 0,
		nullable: false,
	});
}

/**
 * Armour that can be worn by a character, applying soak and defensive benefits.
 */
export class ArmourDataModel extends GearDataModel {
	/**
	 * Armour Type, mostly just used for classification purposes.
	 */
	type!: ArmourType;

	/**
	 * Armour Soak value by hit locations.
	 */
	soak!: {
		head: number;
		torso: number;
		arms: number;
		legs: number;
	};

	/**
	 * Bio-Technological Shield
	 */
	bts!: number;

	static defineSchema() {
		return {
			...super.defineSchema(),

			type: new StringField({
				choices: ALL_ARMOUR_TYPES,
				initial: ArmourType.Civilian,
				nullable: false,
				trim: true,
			}),

			soak: new SchemaField({
				head: makeIntegerField(),
				torso: makeIntegerField(),
				arms: makeIntegerField(),
				legs: makeIntegerField(),
			}),

			bts: makeIntegerField(),
		};
	}
}
