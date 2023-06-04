import { VueSheet } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';
import AbilityDataModel from '@/item/data/AbilityDataModel';
import GearDataModel from '@/item/data/GearDataModel';
import WeaponDataModel from '@/item/data/WeaponDataModel';

import InfinityActorSheet from '../InfinityActorSheet';
import AdversaryDataModel from '../data/AdversaryDataModel';
import AdversarySheetView from '../views/AdversarySheetView.vue';

/**
 * Vue Context for Adversary Sheets
 */
export type AdversarySheetContext = {
	/**
	 * Weapons the Actor has on its sheet.
	 */
	attacks: InfinityItem<WeaponDataModel>[];

	/**
	 * Non-Weapon Equipment the Actor has.
	 */
	gear: InfinityItem<GearDataModel>[];

	/**
	 * Special Abilities the Actor has access to.
	 */
	abilities: InfinityItem<AbilityDataModel>[];
};

export default class AdversarySheet extends VueSheet(InfinityActorSheet<AdversaryDataModel>) {
	static override get defaultOptions() {
		return {
			...super.defaultOptions,
			tabs: [
				{
					navSelector: '.sheet-tabs',
					contentSelector: '.sheet-body',
					initial: 'details',
				},
			],
		};
	}

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AdversarySheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<AdversarySheetContext> {
		return {
			attacks: this.actor.items.filter((i) => i.type === 'weapon') as InfinityItem<WeaponDataModel>[],
			abilities: this.actor.items.filter((i) => i.type === 'ability') as InfinityItem<AbilityDataModel>[],
			gear: this.actor.items.filter((i) => !['ability', 'itemQuality', 'talent', 'weapon'].includes(i.type)) as InfinityItem<GearDataModel>[],
		};
	}
}
