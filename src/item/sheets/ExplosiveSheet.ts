import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import ExplosiveDataModel from '../data/ExplosiveDataModel';
import ExplosiveSheetView from '../views/ExplosiveSheetView.vue';

/**
 * Vue context for Explosive sheets.
 */
export type ExplosiveSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<ExplosiveDataModel>;

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
	system: ExplosiveDataModel;
};

/**
 * Explosive sheet controller.
 */
export default class ExplosiveSheet extends VueSheet(InfinityItemSheet<ExplosiveDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ExplosiveSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ExplosiveSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
