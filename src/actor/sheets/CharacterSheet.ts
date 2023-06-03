import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';
import AbilityDataModel from '@/item/data/AbilityDataModel';
import TalentDataModel from '@/item/data/TalentDataModel';

import InfinityActorSheet from '../InfinityActorSheet';
import CharacterDataModel from '../data/CharacterDataModel';
import CharacterSheetView from '../views/CharacterSheetView.vue';

type HarmCategory = 'breaches' | 'metanoia' | 'wounds';

const INVENTORY_ITEM_TYPES = ['ammunition', 'armour', 'augmentation', 'contagion', 'explosive', 'gear', 'hackingDevice', 'lhost', 'weapon'];

/**
 * Function Callbacks
 */
type CharacterSheetActions = {
	addHarm: (category: HarmCategory) => Promise<void>;
	removeHarm: (category: HarmCategory, index: number) => Promise<void>;
	removeItem: (uuid: string) => Promise<void>;
	addTrait: () => Promise<void>;
	removeTrait: (index: number) => Promise<void>;
};

/**
 * Vue context for Character sheets.
 */
export type CharacterSheetContext = IBaseSheetContext<CharacterDataModel, CharacterSheetActions> & {
	/**
	 * Talents & Special Abilities.
	 */
	abilities: InfinityItem<AbilityDataModel | TalentDataModel>[];

	/**
	 * Inventory
	 */
	inventory: InfinityItem[];
};

/**
 * Player Character sheet controller.
 */
export class CharacterSheet extends VueSheet(InfinityActorSheet<CharacterDataModel>) {
	/**
	 * Sheet action bindings.
	 */
	private actions: CharacterSheetActions = {
		addHarm: this.addHarm.bind(this),
		removeHarm: this.removeHarm.bind(this),

		removeItem: this.removeItem.bind(this),

		addTrait: this.addTrait.bind(this),
		removeTrait: this.removeTrait.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return CharacterSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<CharacterSheetContext> {
		return {
			...IBaseSheetContext.baseContext(this),

			abilities: this.actor.items.filter((i) => ['ability', 'talent'].includes(i.type)) as InfinityItem<AbilityDataModel | TalentDataModel>[],
			inventory: this.actor.items.filter((i) => INVENTORY_ITEM_TYPES.includes(i.type)) as InfinityItem[],
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

	async addTrait() {
		await this.actor.update({
			'system.traits': [...this.actor.system.traits, ''],
		});
	}

	async removeTrait(index: number) {
		const traitsCopy = [...this.actor.system.traits];
		if (index >= traitsCopy.length) {
			return;
		}

		traitsCopy.splice(index, 1);

		await this.actor.update({
			'system.traits': traitsCopy,
		});
	}
}
