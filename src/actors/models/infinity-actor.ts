const { TypeDataModel } = foundry.abstract;

/**
 * Base class for all Infinity Actor Data Models' shared data.
 */
export abstract class InfinityActorDataModel extends TypeDataModel {
	static defineSchema(): foundry.abstract.types.DataSchema {
		return {};
	}
}
