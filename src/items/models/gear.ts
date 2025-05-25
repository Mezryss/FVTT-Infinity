import {ALL_EQUIP_STATES, EquipState} from '@/data/gear.ts';
import {InfinityItemDataModel} from '@/items/models/infinity-item.ts';

const { NumberField, StringField } = foundry.data.fields;

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
	 * Whether the equipment is Held, Carried, or Dropped.
	 */
	state!: EquipState;

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
		};
	}
}
