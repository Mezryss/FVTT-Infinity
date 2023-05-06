import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import ContagionDataModel from '../data/ContagionDataModel';
import ContagionSheetView from '../views/ContagionSheetView.vue';

/**
 * Vue context for Contagion sheets.
 */
export type ContagionSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<ContagionDataModel>;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Talent Item icon.
	 */
	img: string;

	/**
	 * Talent Item name.
	 */
	name: string;

	/**
	 * System data for the talent.
	 */
	system: ContagionDataModel;
};

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
		};
	}
}
