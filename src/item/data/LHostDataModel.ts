import Attribute from '@/data/Attributes';

import GearItemDataModel from './templates/GearItemDataModel';

export default abstract class LHostDataModel extends GearItemDataModel {
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
		};
	}
}
