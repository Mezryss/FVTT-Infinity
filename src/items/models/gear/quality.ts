const { DataModel } = foundry.abstract;
const { DocumentUUIDField, NumberField } = foundry.data.fields;

/**
 * Quality information added to a piece of Gear.
 */
export class GearQuality extends DataModel {
	/**
	 * UUID of the Quality item.
	 */
	uuid!: string;

	/**
	 * If the underlying Quality is Ranked, what rank is it applied at?
	 */
	rank!: number;

	static defineSchema() {
		return {
			uuid: new DocumentUUIDField({
				nullable: false,
			}),

			rank: new NumberField({
				initial: 1,
				integer: true,
				min: 0,
				nullable: false,
			}),
		};
	}
}
