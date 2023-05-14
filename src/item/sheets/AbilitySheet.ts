import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import AbilityDataModel from '../data/AbilityDataModel';
import AbilitySheetView from '../views/AbilitySheetView.vue';

/**
 * Special Ability Sheet Context
 */
export type AbilitySheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<AbilityDataModel>;

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
	system: AbilityDataModel;

	/**
	 * Whether the item is Owned.
	 */
	owned: boolean;
};

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
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
			owned: this.item.isOwned,
		};
	}
}
