import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import GearDataModel from '../data/GearDataModel';
import GearSheetView from '../views/GearSheetView.vue';

export type GearSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<GearDataModel>;

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
	system: GearDataModel;
};

/**
 * Gear sheet controller.
 */
export default class GearSheet extends VueSheet(InfinityItemSheet<GearDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return GearSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<GearSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
