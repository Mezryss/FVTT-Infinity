import { VueSheet } from '@/VueSheet';
import InfinityActorSheet from '../InfinityActorSheet';
import CharacterSheetView from '../views/CharacterSheetView.vue';

export class CharacterSheet extends VueSheet(InfinityActorSheet) {
	static override get defaultOptions() {
		return {
			...super.defaultOptions,
		};
	}

	override get vueComponent() {
		return CharacterSheetView;
	}
}
