import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField } = foundry.data.fields;

/**
 * Tools. CRB, p.357
 */
export class ToolData extends DataModel {
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
