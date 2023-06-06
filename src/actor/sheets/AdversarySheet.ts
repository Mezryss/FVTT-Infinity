import { VueSheet } from '@/VueSheet';

import InfinityActorSheet from '../InfinityActorSheet';
import AdversaryDataModel from '../data/AdversaryDataModel';
import AdversarySheetView from '../views/AdversarySheetView.vue';

export default class AdversarySheet extends VueSheet(InfinityActorSheet<AdversaryDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AdversarySheetView;
	}
}
