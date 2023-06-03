import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import ContagionDataModel from '../data/ContagionDataModel';
import ContagionSheetView from '../views/ContagionSheetView.vue';

/**
 * Vue context for Contagion sheets.
 */
export type ContagionSheetContext = IBaseSheetContext<ContagionDataModel>;

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

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ContagionSheetContext> {
		return IBaseSheetContext.baseContext(this);
	}
}
