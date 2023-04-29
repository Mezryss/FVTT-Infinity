import { VueSheet } from '@/VueSheet';
import InfinityActorSheet from '../InfinityActorSheet';
import CharacterSheetView from '../views/CharacterSheetView.vue';

/**
 * Player Character sheet controller.
 */
export class CharacterSheet extends VueSheet(InfinityActorSheet) {
	override get vueComponent() {
		return CharacterSheetView;
	}
}
