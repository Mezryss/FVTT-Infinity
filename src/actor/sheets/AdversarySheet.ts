import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';
import AbilityDataModel from '@/item/data/AbilityDataModel';
import WeaponDataModel from '@/item/data/WeaponDataModel';
import InfinityActorSheet from '../InfinityActorSheet';
import AdversaryDataModel from '../data/AdversaryDataModel';
import AdversarySheetView from '../views/AdversarySheetView.vue';

type HarmCategory = 'breaches' | 'metanoia' | 'wounds';

/**
 * Vue Sheet Actions
 */
type AdversarySheetActions = {
	removeAttack: (uuid: string) => Promise<void>;
	removeAbility: (uuid: string) => Promise<void>;
	addHarm: (category: HarmCategory) => Promise<void>;
	removeHarm: (category: HarmCategory, index: number) => Promise<void>;
};

/**
 * Vue Context for Adversary Sheets
 */
export type AdversarySheetContext = IBaseSheetContext<AdversaryDataModel, AdversarySheetActions> & {
	/**
	 * Weapons the Actor has on its sheet.
	 */
	attacks: InfinityItem<WeaponDataModel>[];

	/**
	 * Special Abilities the Actor has access to.
	 */
	abilities: InfinityItem<AbilityDataModel>[];

	/**
	 * Type of the actor, needed since this covers both Adversaries & Remotes.
	 */
	actorType: string;
};

export default class AdversarySheet extends VueSheet(InfinityActorSheet<AdversaryDataModel>) {
	/**
	 * View Actions
	 */
	private actions: AdversarySheetActions = {
		removeAbility: this.removeItem.bind(this),
		removeAttack: this.removeItem.bind(this),
		addHarm: this.addHarm.bind(this),
		removeHarm: this.removeHarm.bind(this),
	};

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
			...IBaseSheetContext.baseContext(this),

			attacks: this.actor.items.filter((i) => i.type === 'weapon') as InfinityItem<WeaponDataModel>[],
			abilities: this.actor.items.filter((i) => i.type === 'ability') as InfinityItem<AbilityDataModel>[],
			actorType: this.actor.type,
		};
	}

	async removeItem(uuid: string) {
		const item = this.actor.items.find((i) => i.uuid === uuid);
		await item?.delete();
	}

	async addHarm(category: HarmCategory) {
		const harmEffects = this.actor.system.harms[category].effects;

		await this.actor.update({
			[`system.harms.${category}.effects`]: [...harmEffects, `New ${category.capitalize()}`],
		});
	}

	async removeHarm(category: HarmCategory, index: number) {
		const harmEffects = this.actor.system.harms[category].effects;

		if (index >= harmEffects.length) {
			return;
		}

		const effectsCopy = [...harmEffects];
		effectsCopy.splice(index, 1);

		await this.actor.update({
			[`system.harms.${category}.effects`]: effectsCopy,
		});
	}
}
