const { TypeDataModel } = foundry.abstract;
const { HTMLField } = foundry.data.fields;

/**
 * Base class for all Infinity Item Data Models, storing data shared by all Item types.
 */
export abstract class InfinityItemDataModel extends TypeDataModel {
	/**
	 * Descriptive text for the item, including Effect descriptions for things like Talents or Abilities.
	 */
	description!: string;

	static override defineSchema(): foundry.abstract.types.DataSchema {
		return {
			description: new HTMLField({
				blank: true,
				initial: '',
				nullable: false,
				trim: true,
			}),
		};
	}
}
