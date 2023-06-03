import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import AbilityDataModel from '../data/AbilityDataModel';
import AbilitySheetView from '../views/AbilitySheetView.vue';

/**
 * Special Ability Sheet Context
 */
export type AbilitySheetContext = IBaseSheetContext<AbilityDataModel>;

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

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<AbilitySheetContext> {
		return IBaseSheetContext.baseContext(this);
	}
}
