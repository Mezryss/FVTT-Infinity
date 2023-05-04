import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import AmmunitionDataModel from '../data/AmmunitionDataModel';
import InfinityItemSheet from '../InfinityItemSheet';
import AmmunitionSheetView from '../views/AmmunitionSheetView.vue';

/**
 * Vue context for Ammunition sheets.
 */
export type AmmunitionSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<AmmunitionDataModel>;

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
	system: AmmunitionDataModel;
};

/**
 * Ammunition sheet controller.
 */
export default class AmmunitionSheet extends VueSheet(InfinityItemSheet<AmmunitionDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AmmunitionSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<AmmunitionSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
