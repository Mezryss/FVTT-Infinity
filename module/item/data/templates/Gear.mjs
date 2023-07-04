import { ItemSize } from '../../../data/Gear.mjs';

const fields = foundry.data.fields;

/**
 * A reference to an itemQuality Item document.
 *
 * @typedef {object} ItemQualityReference
 * @property {string} uuid UUID to refer to the item with.
 * @property {number} rating Rating of this instance of the quality.
 * @property {number} specialization Specialization of this instance of the quality (e.g. Desert, Zero-G).
 */

/**
 * Data model template mixin providing fields common to physical gear carried by characters.
 *
 * @mixin
 * @property {ItemSize} size Size of the item.
 * @property {object} structure Item structure (durability) value
 * @property {number} structure.value Current value
 * @property {number} structure.max Max value
 * @property {ItemFault[]} faults Faults the Item has taken
 * @property {ItemQualityReference[]} qualities References to itemQuality documents applicable to the Item
 * @property {string} restriction Restriction value for the Item
 * @property {string} cost Cost value for the Item
 * @property {string} maintenance Maintenance cost for the Item
 * @property {string} tariff Tariff value for the Item
 */
const Gear = () => ({
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
			description: new fields.HTMLField({
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

			rating: new fields.NumberField({
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
		initial: '',
		nullable: false,
	}),
});

export default Gear;
