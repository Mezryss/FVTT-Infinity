import { GearDataModel } from '@/items/models/gear.ts';

const { ArrayField, DocumentUUIDField, NumberField } = foundry.data.fields;

export class HackingDeviceDataModel extends GearDataModel {
	/**
	 * Attack Programs rating.
	 */
	sword!: number;

	/**
	 * Control Programs rating.
	 */
	claw!: number;

	/**
	 * Defensive Programs rating.
	 */
	shield!: number;

	/**
	 * Utility Programs rating.
	 */
	gadget!: number;

	/**
	 * Intrusion Countermeasure Programs rating.
	 */
	ic!: number;

	/**
	 * Pre-Installed Software (usually UPGRADE Programs) that come with the device.
	 *
	 * This is an array of Document UUIDs for other Gear items with GearType.Program
	 */
	preinstalledPrograms!: string[];

	static defineSchema() {
		return {
			...super.defineSchema(),

			sword: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			claw: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			shield: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			gadget: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			ic: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),

			preinstalledPrograms: new ArrayField(
				new DocumentUUIDField({
					nullable: false,
				}),
				{
					initial: [],
					nullable: false,
				},
			),
		};
	}
}
