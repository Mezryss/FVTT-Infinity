import { VueSheet } from '@/VueSheet';

import InfinityActorSheet from '../InfinityActorSheet';
import CharacterDataModel from '../data/CharacterDataModel';
import CharacterSheetView from '../views/CharacterSheetView.vue';

// const INVENTORY_ITEM_TYPES = ['ammunition', 'armour', 'augmentation', 'contagion', 'explosive', 'gear', 'hackingDevice', 'lhost', 'weapon'];

/**
 * Player Character sheet controller.
 */
export class CharacterSheet extends VueSheet(InfinityActorSheet<CharacterDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return CharacterSheetView;
	}
}
