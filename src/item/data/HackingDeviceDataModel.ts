import HasBasicItemData from './templates/HasBasicItemData';
import HasGearData from './templates/HasGearData';

/**
 * A reference to a Program item.
 */
export type ProgramItemReference = {
	img: string;
	name: string;
	uuid: string;
};

export default abstract class HackingDeviceDataModel extends HasGearData(HasBasicItemData(foundry.abstract.TypeDataModel)) {
	/**
	 * Rating for Control Programs (CLAW)
	 */
	abstract claw: number;

	/**
	 * Rating for Attack Programs (SWORD)
	 */
	abstract sword: number;

	/**
	 * Rating for Defensive Programs (SHIELD)
	 */
	abstract shield: number;

	/**
	 * Rating for Utility Programs (GADGET)
	 */
	abstract gadget: number;

	/**
	 * Rating for Intrusion Countermeasure Programs (IC)
	 */
	abstract ic: number;

	/**
	 * Item Names & UUIDs
	 */
	abstract programs: ProgramItemReference[];

	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			claw: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			sword: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			shield: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			gadget: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			ic: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			programs: new fields.ArrayField(
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
