import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField } = foundry.data.fields;

/**
 * Drug/Poison. CRB, p.348
 */
export class DrugData extends DataModel {
	/**
	 * Qualities relevant to the drug, such as "Addiction" and "Compulsion".
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
