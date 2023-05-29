import { TemplateConstructor } from '@/dataModel/DataTemplates';
import { ItemQualityReference } from '../ItemQualityDataModel';

/**
 * Item Size Categories.
 *
 * See Core Rulebook, pp.332-333 for mechanical impacts which need to be implemented.
 */
export enum ItemSize {
	/**
	 * Insignificant is for items without a Size rating, so there's no special case needed for a null field.
	 */
	Insignificant = 'Insignificant',

	OneHanded = 'OneHanded',
	TwoHanded = 'TwoHanded',
	Unbalanced = 'Unbalanced',
	Unwieldy = 'Unwieldy',
	Mounted = 'Mounted',
	Massive = 'Massive',
	Facility = 'Facility',
}

export namespace ItemSize {
	/**
	 * Convenience accessor for all Item sizes.
	 */
	export const all: ItemSize[] = [ItemSize.Insignificant, ItemSize.OneHanded, ItemSize.TwoHanded, ItemSize.Unbalanced, ItemSize.Unwieldy, ItemSize.Mounted, ItemSize.Massive, ItemSize.Facility];
}

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
 * Adds fields generally relevant to equipment players might purchase and carry around.
 */
export default function HasGearData<BaseClass extends TemplateConstructor>(baseClass: BaseClass) {
	abstract class TemplateClass extends baseClass {
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
		 * Current selection of Item Qualities.
		 */
		abstract qualities: ItemQualityReference[];

		/**
		 * Restriction value for the item.
		 */
		abstract restriction: string;

		/**
		 * Cost roll for the item.
		 */
		abstract cost: string;

		/**
		 * Maintenance cost for the item.
		 */
		abstract maintenance: string;

		/**
		 * Tariff value for the item.
		 */
		abstract tariff: string;

		/**
		 * @inheritdoc
		 */
		static override defineSchema(): foundry.data.fields.DataSchema {
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
					}),
					{
						initial: [],
						nullable: false,
					},
				),

				qualities: new fields.ArrayField(
					new fields.SchemaField({
						uuid: new fields.StringField({
							initial: '',
							nullable: false,
						}),

						name: new fields.StringField({
							initial: '',
							nullable: false,
						}),

						rank: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),

						specialization: new fields.StringField({
							initial: '',
							nullable: false,
						}),
					}),
					{
						initial: [],
						nullable: false,
					},
				),

				restriction: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				cost: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				maintenance: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				tariff: new fields.StringField({
					initial: '-',
					nullable: false,
				}),
			};
		}
	}

	return TemplateClass;
}
