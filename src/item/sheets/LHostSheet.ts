import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import LHostDataModel from '../data/LHostDataModel';
import LHostSheetView from '../views/LHostSheetView.vue';

/**
 * Vue context for LHost sheets.
 */
export type LHostSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<LHostDataModel>;

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
	system: LHostDataModel;
};

/**
 * LHost sheet controller.
 */
export default class LHostSheet extends VueSheet(InfinityItemSheet<LHostDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return LHostSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<LHostSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
