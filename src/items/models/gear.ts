import { ALL_EQUIP_STATES, EquipState } from '@/data/gear.ts';
import { InfinityItemDataModel } from '@/items/models/infinity-item.ts';

const { DataModel } = foundry.abstract;
const { ArrayField, DocumentUUIDField, EmbeddedDataField, NumberField, StringField } =
	foundry.data.fields;

/**
 * Data model for Gear that characters can possess.
 */
export class GearDataModel extends InfinityItemDataModel {
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
	 * How many of this item the player has in their inventory.
	 */
	quantity!: number;

	/**
	 * Whether the equipment is Held, Carried, or Dropped by the owning Actor (mainly a Player Character).
	 */
	state!: EquipState;

	/**
	 * A list of Quality data applicable to the item, stored as an Item UUID + a current rank. Not all item types will have Qualities.
	 */
	qualities!: GearQuality[];

	static override defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

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

			quantity: new NumberField({
				initial: 1,
				integer: true,
				nullable: false,
			}),

			state: new StringField({
				initial: EquipState.Carried,
				choices: ALL_EQUIP_STATES,
				nullable: false,
				trim: true,
			}),

			qualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),
		};
	}
}

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
