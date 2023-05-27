import IBaseSheetContext from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItemSheet from '../InfinityItemSheet';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ItemQualitySheetView from '../views/ItemQualitySheetView.vue';

/**
 * Vue context for Item Quality sheets.
 */
export type ItemQualitySheetContext = IBaseSheetContext<ItemQualityDataModel>;

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
			owned: this.item.isOwned,
			limited: this.item.limited,
		};
	}
}
