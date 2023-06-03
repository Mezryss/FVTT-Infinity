import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import AmmunitionDataModel from '../data/AmmunitionDataModel';
import AmmunitionSheetView from '../views/AmmunitionSheetView.vue';

/**
 * Ammunition sheet controller.
 */
export default class AmmunitionSheet extends VueSheet(InfinityItemSheet<AmmunitionDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AmmunitionSheetView;
	}
}
