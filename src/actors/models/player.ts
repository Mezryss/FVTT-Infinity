import { InfinityActorDataModel } from './infinity-actor';

const { DataModel } = foundry.abstract;
const { EmbeddedDataField, NumberField, StringField } = foundry.data.fields;

class InfinityPointsDataModel extends DataModel {
	value!: number;
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

	static defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			faction: new StringField({}),
			heritage: new StringField({}),

			infinityPoints: new EmbeddedDataField(InfinityPointsDataModel as any, {
				nullable: false,
			}),
		};
	}
}
