import HasDescription from './templates/HasDescription';
import HasStress from './templates/HasStress';

export default abstract class VehicleDataModel extends HasStress(HasDescription(foundry.abstract.DataModel)) {
	/**
	 * List of Types the vehicle has.
	 */
	abstract types: string[];

	/**
	 * Vehicle's Scale value.
	 */
	abstract scale: number;

	/**
	 * Vehicle's Speed value.
	 */
	abstract speed: number;

	/**
	 * Vehicle's Brawn Attribute.
	 */
	abstract brawn: {
		/**
		 * Actual Brawn attribute value.
		 */
		value: number;

		/**
		 * Superhuman Brawn X (CRB p.418)
		 */
		superhuman: number;
	};

	/**
	 * How many passengers the vehicle can have.
	 *
	 * This is kept as a string to account for odd listings.
	 */
	abstract passengers: string;

	/**
	 * Impact damage dealt by the vehicle.
	 */
	abstract impact: string;

	/**
	 * BTS provided to all Passengers in the vehicle.
	 */
	abstract bts: number;

	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			types: new fields.ArrayField(
				new fields.StringField({
					initial: '',
					nullable: false,
				}),
				{
					initial: [],
					nullable: false,
				},
			),

			scale: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			speed: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			brawn: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				superhuman: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			passengers: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			impact: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			bts: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),
		};
	}
}
