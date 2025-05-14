import { InfinityActorDataModel } from './infinity-actor';

const { DataModel } = foundry.abstract;
const { EmbeddedDataField, NumberField, StringField } = foundry.data.fields;

/**
 * Infinity Points tracking for Player Characters.
 */
class InfinityPointsDataModel extends DataModel {
	/**
	 * Current Infinity Points value.
	 */
	value!: number;

	/**
	 * Maximum number of Infinity Points the character can have.
	 */
	max!: number;

	static defineSchema() {
		return {
			value: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
			}),

			max: new NumberField({
				initial: 5,
				integer: true,
				min: 0,
			}),
		};
	}
}

/**
 * Data Model for Player Characters.
 */
export class PlayerCharacterDataModel extends InfinityActorDataModel {
	/**
	 * Character Faction.
	 */
	faction!: string;

	/**
	 * Character Heritage.
	 */
	heritage!: string;

	/**
	 * Player's Current Infinity Points.
	 */
	infinityPoints!: InfinityPointsDataModel;

	/**
	 * Character's Refresh Value.
	 */
	refresh!: string;

	static defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			faction: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),
			heritage: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			infinityPoints: new EmbeddedDataField(InfinityPointsDataModel as any, {
				nullable: false,
			}),

			refresh: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),
		};
	}
}
