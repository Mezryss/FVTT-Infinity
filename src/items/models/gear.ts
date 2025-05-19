import { ALL_GEAR_TYPES, type GearType } from '@/data/gear';

import { AmmunitionData } from './gear/ammunition';
import { ArmourData } from './gear/armour';
import { AugmentationData } from './gear/augmentation';

import { InfinityItemDataModel } from './infinity-item';
import { DrugData } from './gear/drug';
import { FakeIDData } from './gear/fakeIDs.ts';
import { ToolData } from './gear/tool';
import { OtherData } from './gear/other';
import { ExplosiveDeviceData } from './gear/explosiveDevice';
import { WeaponData } from './gear/weapon';
import { HackingDeviceData } from './gear/hackingDevice';
import { ProgramData } from './gear/program';
import { LifestyleData } from '@/items/models/gear/lifestyle.ts';

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
	 * Armour-specific gear data.
	 */
	armour!: ArmourData;

	/**
	 * Augmentation-specific gear data.
	 */
	augmentation!: AugmentationData;

	/**
	 * Drug-specific gear data.
	 */
	drug!: DrugData;

	/**
	 * Explosive Device-specific gear data.
	 */
	explosiveDevice!: ExplosiveDeviceData;

	/**
	 * Fake ID-specific gear data.
	 */
	fakeID!: FakeIDData;

	/**
	 * Hacking Device-specific gear data.
	 */
	hackingDevice!: HackingDeviceData;

	/**
	 * Lifestyle-specific gear data.
	 */
	lifestyle!: LifestyleData;

	/**
	 * Program-specific gear data.
	 */
	program!: ProgramData;

	/**
	 * Tool-specific gear data.
	 */
	tool!: ToolData;

	/**
	 * Weapon-specific gear data.
	 */
	weapon!: WeaponData;

	/**
	 * Other Items-specific gear data.
	 */
	other!: OtherData;

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

			armour: new EmbeddedDataField(ArmourData as any, {
				nullable: false,
			}),

			augmentation: new EmbeddedDataField(AugmentationData as any, {
				nullable: false,
			}),

			drug: new EmbeddedDataField(DrugData as any, {
				nullable: false,
			}),

			explosiveDevice: new EmbeddedDataField(ExplosiveDeviceData as any, {
				nullable: false,
			}),

			hackingDevice: new EmbeddedDataField(HackingDeviceData as any, {
				nullable: false,
			}),

			fakeID: new EmbeddedDataField(FakeIDData as any, {
				nullable: true,
			}),

			lifestyle: new EmbeddedDataField(LifestyleData as any, {
				nullable: true,
			}),

			program: new EmbeddedDataField(ProgramData as any, {
				nullable: false,
			}),

			tool: new EmbeddedDataField(ToolData as any, {
				nullable: false,
			}),

			weapon: new EmbeddedDataField(WeaponData as any, {
				nullable: false,
			}),

			other: new EmbeddedDataField(OtherData as any, {
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
