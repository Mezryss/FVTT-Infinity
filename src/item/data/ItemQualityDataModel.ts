import HasBasicItemData from './templates/HasBasicItemData';

/**
 * A reference to an Item Quality instance.
 */
export type ItemQualityReference = {
	/**
	 * UUID to refer to the Item, wherever it's stored.
	 */
	uuid: string;

	/**
	 * Name of the Quality when it was added to the item.
	 */
	name: string;

	/**
	 * Current rank that the quality has been taken at, if at all.
	 */
	rank: number;

	/**
	 * Current specialization for the quality, if any.
	 */
	specialization: string;
};

/**
 * Item Quality Types
 */
export enum ItemQualityType {
	/**
	 * General Qualities (pp.334-335)
	 */
	General = 'General',

	/**
	 * Armour Qualities (pp.335-336)
	 */
	Armour = 'Armour',

	/**
	 * Attack Qualities (pp.336-338)
	 */
	Attack = 'Attack',
}

export namespace ItemQualityType {
	/**
	 * Convenience accessor for all Item Quality types.
	 */
	export const all: ItemQualityType[] = [ItemQualityType.General, ItemQualityType.Armour, ItemQualityType.Attack];
}

export default abstract class ItemQualityDataModel extends HasBasicItemData(foundry.abstract.DataModel) {
	/**
	 * Quality Type/Category
	 */
	abstract type: ItemQualityType;

	/**
	 * Whether the Item Quality can be ranked (listed as Ability Name X in rulebooks).
	 *
	 * The actual Rank of the Quality will always be stored on the item itself.
	 */
	abstract isRanked: boolean;

	/**
	 * Whether the Item Quality can be specialized (listed in parentheses in rulebooks).
	 *
	 * The actual Specialization of the Quality will always be stored on the item itself.
	 */
	abstract isSpecialized: boolean;

	/**
	 * If an item is specialized, what is the placeholder for the specialization?
	 */
	abstract specializationPlaceholder: string;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			type: new fields.StringField({
				initial: ItemQualityType.General,
				choices: ItemQualityType.all,
				nullable: false,
			}),

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
