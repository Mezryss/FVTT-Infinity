import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField } = foundry.data.fields;

/**
 * Other Items. CRB, p.360
 */
export class OtherData extends DataModel {
	/**
	 * Tool Qualities
	 */
	qualities!: GearQuality[];

	static defineSchema() {
		return {
			qualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),
		};
	}
}
