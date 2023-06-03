import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import ContagionDataModel from '../data/ContagionDataModel';
import ContagionSheetView from '../views/ContagionSheetView.vue';

/**
 * Contagion sheet controller.
 */
export default class ContagionSheet extends VueSheet(InfinityItemSheet<ContagionDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ContagionSheetView;
	}
}
