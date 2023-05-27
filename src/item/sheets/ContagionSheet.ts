import IBaseSheetContext from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItemSheet from '../InfinityItemSheet';
import ContagionDataModel from '../data/ContagionDataModel';
import ContagionSheetView from '../views/ContagionSheetView.vue';

/**
 * Vue context for Contagion sheets.
 */
export type ContagionSheetContext = IBaseSheetContext<ContagionDataModel>;

/**
 * Contagion sheet controller.
 */
export default class ContagionSheet extends VueSheet(InfinityItemSheet<ContagionDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ContagionSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ContagionSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
			owned: this.item.isOwned,
			limited: this.item.limited,
		};
	}
}
