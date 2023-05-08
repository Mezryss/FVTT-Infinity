import HasBasicItemData from './templates/HasBasicItemData';

export default abstract class AbilityDataModel extends HasBasicItemData(foundry.abstract.DataModel) {
	/**
	 * Whether the Special Ability is ranked.
	 */
	abstract isRanked: boolean;

	/**
	 * (Owned Only) If the Special Ability is a ranked ability, what is its current rank?
	 */
	abstract rank: number;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			isRanked: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),

			rank: new fields.NumberField({
				initial: 1,
				integer: true,
				min: 1,
				nullable: false,
			}),
		};
	}
}
