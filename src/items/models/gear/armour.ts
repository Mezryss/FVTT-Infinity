import { ALL_ARMOUR_TYPES, ArmourType } from '@/data/gear';
import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField, NumberField, SchemaField, StringField } =
	foundry.data.fields;

function makeIntegerField() {
	return new NumberField({
		initial: 0,
		integer: true,
		min: 0,
		nullable: false,
	});
}

/**
 * Armour. CRB, p.341
 */
export class ArmourData extends DataModel {
	/**
	 * Armour Type.
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

	/**
	 * Armour Qualities
	 */
	qualities!: GearQuality[];

	static defineSchema() {
		return {
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

			qualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),
		};
	}
}
