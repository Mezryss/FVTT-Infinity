import { VueSheet } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';
import AbilityDataModel from '@/item/data/AbilityDataModel';
import WeaponDataModel from '@/item/data/WeaponDataModel';
import InfinityActor from '../InfinityActor';
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
export type AdversarySheetContext = {
	/**
	 * Vue sheet actions
	 */
	actions: AdversarySheetActions;

	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityActor<AdversaryDataModel>;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Actor icon.
	 */
	img: string;

	/**
	 * Actor name.
	 */
	name: string;

	/**
	 * System data for the actor.
	 */
	system: AdversaryDataModel;

	/**
	 * Weapons the Actor has on its sheet.
	 */
	attacks: InfinityItem<WeaponDataModel>[];

	/**
	 * Special Abilities the Actor has access to.
	 */
	abilities: InfinityItem<AbilityDataModel>[];
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
			actions: this.actions,
			document: this.actor,
			editable: this.isEditable,
			img: this.actor.img,
			name: this.actor.name,
			system: this.actor.system,
			attacks: this.actor.items.filter((i) => i.type === 'weapon') as InfinityItem<WeaponDataModel>[],
			abilities: this.actor.items.filter((i) => i.type === 'ability') as InfinityItem<AbilityDataModel>[],
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
