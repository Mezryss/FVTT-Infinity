import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import ProgramDataModel from '../data/ProgramDataModel';
import ProgramSheetView from '../views/ProgramSheetView.vue';

/**
 * Program sheet controller.
 */
export default class ProgramSheet extends VueSheet(InfinityItemSheet<ProgramDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ProgramSheetView;
	}
}
