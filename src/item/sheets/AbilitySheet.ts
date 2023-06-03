import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import AbilityDataModel from '../data/AbilityDataModel';
import AbilitySheetView from '../views/AbilitySheetView.vue';

/**
 * Special Ability sheet controller.
 */
export default class AbilitySheet extends VueSheet(InfinityItemSheet<AbilityDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AbilitySheetView;
	}
}
