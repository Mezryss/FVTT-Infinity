import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import ExplosiveDataModel from '../data/ExplosiveDataModel';
import ExplosiveSheetView from '../views/ExplosiveSheetView.vue';

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
}
