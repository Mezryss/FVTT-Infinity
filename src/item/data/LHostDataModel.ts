import Attribute from '@/data/Attributes';

import HasBasicItemData from './templates/HasBasicItemData';
import HasGearData from './templates/HasGearData';

/**
 * Reference to a Special Ability item.
 */
export type AbilityItemReference = {
	img: string;
	name: string;
	uuid: string;
};

export default abstract class LHostDataModel extends HasGearData(HasBasicItemData(foundry.abstract.TypeDataModel)) {
	/**
	 * Life Point cost if taken as a replacement body during Character Creation.
	 */
	abstract lpCost: number;

	/**
	 * Attribute modifiers provided by the LHost.
	 */
	abstract attributes: {
		[Attribute.Agility]: 0;
		[Attribute.Awareness]: 0;
		[Attribute.Brawn]: 0;
		[Attribute.Coordination]: 0;
		[Attribute.Intelligence]: 0;
		[Attribute.Personality]: 0;
		[Attribute.Willpower]: 0;
	};

	/**
	 * A list of UUID links to Special Abilities granted by the LHost.
	 */
	abstract specialAbilities: AbilityItemReference[];

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			lpCost: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			attributes: new fields.SchemaField({
				[Attribute.Agility]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
				[Attribute.Awareness]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Attribute.Brawn]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Attribute.Coordination]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Attribute.Intelligence]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Attribute.Personality]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Attribute.Willpower]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
			}),

			specialAbilities: new fields.ArrayField(
				new fields.SchemaField({
					img: new fields.StringField({
						initial: '',
						nullable: false,
					}),

					name: new fields.StringField({
						initial: '',
						nullable: false,
					}),

					uuid: new fields.StringField({
						initial: '',
						nullable: false,
					}),
				}),
				{
					initial: [],
					nullable: false,
				},
			),
		};
	}
}
