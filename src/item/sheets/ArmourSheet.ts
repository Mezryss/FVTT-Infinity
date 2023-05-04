import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import ArmourDataModel from '../data/ArmourDataModel';
import ArmourSheetViewVue from '../views/ArmourSheetView.vue';

/**
 * Vue context for Armour sheets.
 */
export type ArmourSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<ArmourDataModel>;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Item icon.
	 */
	img: string;

	/**
	 * Item name.
	 */
	name: string;

	/**
	 * System data for the item.
	 */
	system: ArmourDataModel;
};

/**
 * Armour sheet controller.
 */
export default class ArmourSheet extends VueSheet(InfinityItemSheet<ArmourDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ArmourSheetViewVue;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ArmourSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
