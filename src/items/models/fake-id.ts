import { GearDataModel } from '@/items/models/gear.ts';

const { NumberField } = foundry.data.fields;

export class FakeIDDataModel extends GearDataModel {
	/**
	 * Rating value for the Fake ID serves as difficulty to discover its nature.
	 */
	rating!: number;

	static defineSchema() {
		return {
			...super.defineSchema(),

			rating: new NumberField({
				initial: 1,
				integer: true,
				nullable: false,
			}),
		};
	}
}
