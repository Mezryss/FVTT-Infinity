import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import WeaponDataModel from '../data/WeaponDataModel';
import WeaponSheetView from '../views/WeaponSheetView.vue';

/**
 * Vue context for Weapon sheets.
 */
export type WeaponSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<WeaponDataModel>;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Talent Item icon.
	 */
	img: string;

	/**
	 * Talent Item name.
	 */
	name: string;

	/**
	 * System data for the talent.
	 */
	system: WeaponDataModel;
};

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

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<WeaponSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
