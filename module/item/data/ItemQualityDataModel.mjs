import BasicItem from './templates/BasicItem.mjs';

/**
 * Data model for itemQuality Item documents.
 *
 * @mixes BasicItem
 *
 * @property {boolean} isRanked Whether the Item Quality can be ranked (listed as Ability Name X in rulebooks).
 * @property {boolean} isSpecialized Whether the Item Quality can be specialized (listed in parentheses in rulebooks).
 * @property {string} specializationPlaceholder If an item is specialized, what is the placeholder for the specialization?
 */
export default class ItemQualityDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;

		return {
			...BasicItem(),

			isRanked: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),

			isSpecialized: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),

			specializationPlaceholder: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
