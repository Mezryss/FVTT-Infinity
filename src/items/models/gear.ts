import { ALL_GEAR_TYPES, type GearType } from '@/data/gear';

import { InfinityItemDataModel } from './infinity-item';
import { AmmunitionData } from './gear/ammunition';

const { EmbeddedDataField, StringField } = foundry.data.fields;

/**
 * Data model for Gear that characters can possess.
 */
export class GearDataModel extends InfinityItemDataModel {
	/**
	 * Ammunition-specific gear data.
	 */
	ammunition!: AmmunitionData;

	/**
	 * Type of gear for this item.
	 */
	type!: GearType;

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

	static override defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			/** Specific Item type Data **/
			ammunition: new EmbeddedDataField(AmmunitionData as any, {
				nullable: false,
			}),

			/** General Gear Fields **/
			type: new StringField({
				choices: ALL_GEAR_TYPES,
				initial: ALL_GEAR_TYPES[0],
				nullable: false,
				trim: true,
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
		};
	}
}
