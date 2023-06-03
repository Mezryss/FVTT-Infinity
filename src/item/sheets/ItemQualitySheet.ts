import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ItemQualitySheetView from '../views/ItemQualitySheetView.vue';

export default abstract class ItemQualitySheet extends VueSheet(InfinityItemSheet<ItemQualityDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ItemQualitySheetView;
	}
}
