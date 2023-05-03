/**
 * Basic data shared by all Item types.
 */
export default abstract class BasicItemDataModel extends foundry.abstract
	.DataModel {
	/**
	 * HTML description for the item.
	 */
	abstract description: string;

	/**
	 * Source the item originates from (for example, "Core Rulebook, p.75")
	 */
	abstract source: string;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			description: new fields.HTMLField({ initial: '' }),
			source: new fields.StringField({ initial: 'Core Rulebook' }),
		};
	}
}
