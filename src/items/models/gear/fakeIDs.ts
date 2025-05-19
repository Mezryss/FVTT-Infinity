import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField, NumberField } = foundry.data.fields;

/**
 * Fake IDs. CRB, p.368
 */
export class FakeIDData extends DataModel {
	/**
	 * Tool Qualities
	 */
	qualities!: GearQuality[];

	/**
	 * Fake ID Rating.
	 */
	rating!: number;

	static defineSchema() {
		return {
			qualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),

			rating: new NumberField({
				initial: 1,
				integer: true,
				nullable: false,
			}),
		};
	}
}
