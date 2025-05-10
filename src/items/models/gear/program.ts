import { ALL_PROGRAM_TYPES, ProgramType } from '@/data/gear';
import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField, StringField } = foundry.data.fields;

/**
 * Programs. CRB, p.353
 */
export class ProgramData extends DataModel {
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

	/**
	 * Program Qualities
	 */
	qualities!: GearQuality[];

	static defineSchema() {
		return {
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

			qualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),
		};
	}
}
