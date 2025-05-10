import { InfinityItemDataModel } from './infinity-item';

const { DataModel } = foundry.abstract;
const { ArrayField, DocumentUUIDField, EmbeddedDataField, NumberField, StringField } =
	foundry.data.fields;

/**
 * Utility to create a consistent Number Field for use with attribute modifiers.
 */
function makeAttributeField() {
	return new NumberField({
		initial: 0,
		integer: true,
		nullable: false,
	});
}

/**
 * Attribute Modifiers provided by an LHost
 */
class AttributeModifiersDataModel extends DataModel {
	/**
	 * Aglity Modifier
	 */
	agility!: number;

	/**
	 * Awareness Modifier
	 */
	awareness!: number;

	/**
	 * Brawn Modifier
	 */
	brawn!: number;

	/**
	 * Coordination Modifier
	 */
	coordination!: number;

	/**
	 * Intelligence Modifier
	 */
	intelligence!: number;

	/**
	 * Personality Modifier
	 */
	personality!: number;

	/**
	 * Willpower Modifier
	 */
	willpower!: number;

	static defineSchema() {
		return {
			agility: makeAttributeField(),
			awareness: makeAttributeField(),
			brawn: makeAttributeField(),
			coordination: makeAttributeField(),
			intelligence: makeAttributeField(),
			personality: makeAttributeField(),
			willpower: makeAttributeField(),
		};
	}
}

/**
 * LHosts. CRB, p.354
 *
 * Note that Hosts are handled separate from other types of Gear because of how they interact with the player and their active stats.
 */
export class HostDataModel extends InfinityItemDataModel {
	/**
	 * How many Life Points the Host costs to acquire during character creation.
	 *
	 * For the character's Birth Host, this will be 0.
	 */
	lifePointCost!: number;

	/**
	 * Usually a number between 0–5 representing difficulty of acquiring an item.
	 *
	 * There may be some values (such as O-12 ratings or faction-specific notes) that make this more complex than just a number, however.
	 */
	restriction!: string;

	/**
	 * Cost of the item, often as a dice string.
	 */
	cost!: string;

	/**
	 * Possible Tariffs applied to the item's cost.
	 */
	tariff!: string;

	/**
	 * Maintenance cost of the item.
	 */
	maintenance!: string;

	/**
	 * UUIDs of Ability Items granted by the Host.
	 */
	specialAbilities!: string[];

	/**
	 * Attribute Modifiers provided by this Host.
	 */
	attributeModifiers!: AttributeModifiersDataModel;

	static defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			lifePointCost: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			restriction: new StringField({
				initial: '—',
				nullable: false,
				trim: true,
			}),

			cost: new StringField({
				initial: '—',
				nullable: false,
				trim: true,
			}),

			tariff: new StringField({
				initial: '—',
				nullable: false,
				trim: true,
			}),

			maintenance: new StringField({
				initial: '—',
				nullable: false,
				trim: true,
			}),

			specialAbilities: new ArrayField(
				new DocumentUUIDField({
					nullable: false,
				}),
				{
					initial: [],
					nullable: false,
				},
			),

			attributeModifiers: new EmbeddedDataField(AttributeModifiersDataModel as any, {
				nullable: false,
			}),
		};
	}
}
