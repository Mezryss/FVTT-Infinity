import BasicItem from './templates/BasicItem.mjs';

/**
 * Data model for ability Item documents.
 *
 * @mixes BasicItem
 * @property {boolean} isRanked Whether the Special Ability is ranked.
 * @property {number} rank (Owned only) Current rank of the Special Ability.
 */
export default class AbilityDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...BasicItem(),

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
