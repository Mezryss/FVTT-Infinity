import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import AugmentationDataModel from '../data/AugmentationDataModel';
import AugmentationSheetView from '../views/AugmentationSheetView.vue';

/**
 * Vue context for Augmentation sheets.
 */
export type AugmentationSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<AugmentationDataModel>;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Item icon.
	 */
	img: string;

	/**
	 * Item name.
	 */
	name: string;

	/**
	 * System data for the item.
	 */
	system: AugmentationDataModel;
};

/**
 * Augmentation sheet controller.
 */
export default class AugmentationSheet extends VueSheet(InfinityItemSheet<AugmentationDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AugmentationSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<AugmentationSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
