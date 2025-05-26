import { ALL_PROGRAM_TYPES, ProgramType } from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';

const { StringField } = foundry.data.fields;

export class ProgramDataModel extends GearDataModel {
	/**
	 * Program Type
	 */
	type!: ProgramType;

	/**
	 * Program Rating
	 */
	rating!: string;

	/**
	 * Damage dealt when using the program, if any.
	 */
	damage!: string;

	static defineSchema() {
		return {
			...super.defineSchema(),

			type: new StringField({
				choices: ALL_PROGRAM_TYPES,
				initial: ProgramType.SWORD,
				nullable: false,
				trim: true,
			}),

			rating: new StringField({
				initial: '—',
				nullable: false,
				trim: true,
			}),

			damage: new StringField({
				initial: '—',
				nullable: false,
				trim: true,
			}),
		};
	}
}
