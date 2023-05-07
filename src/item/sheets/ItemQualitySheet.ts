import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ItemQualitySheetView from '../views/ItemQualitySheetView.vue';

/**
 * Vue context for Item Quality sheets.
 */
export type ItemQualitySheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<ItemQualityDataModel>;

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
	 * System data for the item.
	 */
	system: ItemQualityDataModel;
};

export default abstract class ItemQualitySheet extends VueSheet(InfinityItemSheet<ItemQualityDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ItemQualitySheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ItemQualitySheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
