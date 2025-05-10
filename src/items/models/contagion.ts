import { ALL_CONTAGION_TYPES, ContagionType } from '@/data/contagion';
import { InfinityItemDataModel } from './infinity-item';

const { BooleanField, NumberField, StringField } = foundry.data.fields;

/**
 * Data model for Contagions, allowing tracking contagions a character has contracted and their progress in overcoming it.
 */
export class ContagionDataModel extends InfinityItemDataModel {
	/**
	 * Contagion Type.
	 */
	type!: ContagionType;

	/**
	 * Whether the Contagion is Chronic.
	 */
	chronic!: boolean;

	/**
	 * What is the Difficulty of the roll to overcome this Contagion?
	 */
	difficulty!: number;

	/**
	 * For Complex & Progressive Contagions, how much Momentum does the character need to achieve to overcome the contagion?
	 */
	requiredMomentum!: number;

	/**
	 * How much progress has been made toward the contagion's required momentum?
	 */
	progress!: number;

	/**
	 * How frequently the contagion must be rolled for.
	 */
	term!: string;

	/**
	 * How the Contagion is spread or contracted.
	 */
	vector!: string;

	/**
	 * How much damage is dealt by the contagion on a failure.
	 */
	damage!: string;

	static defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			type: new StringField({
				choices: ALL_CONTAGION_TYPES,
				initial: ContagionType.Instant,
				nullable: false,
				trim: true,
			}),

			chronic: new BooleanField({
				initial: false,
				nullable: false,
			}),

			difficulty: new NumberField({
				initial: 1,
				integer: true,
				nullable: false,
				min: 0,
			}),

			requiredMomentum: new NumberField({
				initial: 1,
				integer: true,
				nullable: false,
				min: 1,
			}),

			progress: new NumberField({
				initial: 0,
				integer: true,
				nullable: false,
				min: 0,
			}),

			term: new StringField({
				initial: 'Hour',
				nullable: false,
				trim: true,
			}),

			vector: new StringField({
				initial: 'Ingested',
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
