import { VueSheet } from '@/VueSheet';

import InfinityItemSheet from '../InfinityItemSheet';
import WeaponDataModel from '../data/WeaponDataModel';
import WeaponSheetView from '../views/WeaponSheetView.vue';

/**
 * Weapon sheet controller.
 */
export default class WeaponSheet extends VueSheet(InfinityItemSheet<WeaponDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return WeaponSheetView;
	}
}
