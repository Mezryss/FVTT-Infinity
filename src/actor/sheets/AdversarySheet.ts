import { VueSheet } from '@/VueSheet';

import InfinityActorSheet from '../InfinityActorSheet';
import AdversaryDataModel from '../data/AdversaryDataModel';
import AdversarySheetView from '../views/AdversarySheetView.vue';

export default class AdversarySheet extends VueSheet(InfinityActorSheet<AdversaryDataModel>) {
	static override get defaultOptions() {
		return {
			...super.defaultOptions,
			tabs: [
				{
					navSelector: '.sheet-tabs',
					contentSelector: '.sheet-body',
					initial: 'details',
				},
			],
		};
	}

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AdversarySheetView;
	}
}
