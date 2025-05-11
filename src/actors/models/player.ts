import { InfinityActorDataModel } from './infinity-actor';

/**
 * Data Model for Player Characters.
 */
export class PlayerCharacterDataModel extends InfinityActorDataModel {
	static defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,
		};
	}
}
