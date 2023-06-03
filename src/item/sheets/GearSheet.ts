import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import GearDataModel from '../data/GearDataModel';
import GearSheetView from '../views/GearSheetView.vue';

/**
 * Gear sheet controller.
 */
export default class GearSheet extends VueSheet(InfinityItemSheet<GearDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return GearSheetView;
	}
}
