import ItemSize from '@/data/ItemSize';
import BasicItemDataModel from './BasicItemDataModel';

/**
 * A description of a Fault taken by the item, usually due to damage.
 */
type ItemFault = {
	/**
	 * Name for the Fault.
	 */
	name: string;

	/**
	 * User-entered descriptive text for the Fault.
	 */
	description: string;
};

/**
 * Item data shared by all Gear-type items.
 */
export default abstract class GearItemDataModel extends BasicItemDataModel {
	/**
	 * Item Size
	 */
	abstract size: ItemSize;

	/**
	 * Item structure (durability) value.
	 */
	abstract structure: {
		/**
		 * Current structure value.
		 */
		value: number;

		/**
		 * Max structure value.
		 */
		max: number;
	};

	/**
	 * Current selection of Faults.
	 */
	abstract faults: ItemFault[];

	/**
	 * Restriction value for the item.
	 */
	abstract restriction: {
		/**
		 * The actual Restriction value.
		 */
		value: number;

		/**
		 * Whether the item is forbidden under the Concilium Convention (p.339).
		 */
		concilium: boolean;
	};

	/**
	 * Cost of the item.
	 */
	abstract cost: {
		/**
		 * The static part of the item's cost.
		 */
		static: number;

		/**
		 * The number of dice rolled for the rolled part of the item's cost.
		 */
		rolled: number;
	};

	/**
	 * Maintenance cost for the item.
	 */
	abstract maintenance: number;

	/**
	 * Tariff value for the item.
	 */
	abstract tariff: {
		/**
		 * Tariff value for the item.
		 */
		value: number;

		/**
		 * Any notes related to the tariff, such as locations that have a lower tariff value.
		 */
		notes: string;
	};

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			size: new fields.StringField({
				initial: ItemSize.Insignificant,
				choices: ItemSize.all,
				nullable: false,
			}),

			structure: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
				}),

				max: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 1,
					nullable: false,
				}),
			}),

			faults: new fields.ArrayField(
				new fields.SchemaField({
					name: new fields.StringField({
						initial: '',
						nullable: false,
					}),

					description: new fields.StringField({
						initial: '',
						nullable: false,
					}),
				}), {
					initial: [],
					nullable: false,
				}
			),

			restriction: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				concilium: new fields.BooleanField({
					initial: false,
					nullable: false,
				}),
			}),

			cost: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				rolled: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
			}),

			maintenance: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			tariff: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				notes: new fields.StringField({
					initial: '',
					nullable: false,
				}),
			}),
		};
	}
}
