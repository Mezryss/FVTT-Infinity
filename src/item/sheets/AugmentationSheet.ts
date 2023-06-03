import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import AugmentationDataModel from '../data/AugmentationDataModel';
import AugmentationSheetView from '../views/AugmentationSheetView.vue';

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
}
