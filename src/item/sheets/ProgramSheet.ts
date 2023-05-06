import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet from '../InfinityItemSheet';
import ProgramDataModel from '../data/ProgramDataModel';
import ProgramSheetViewVue from '../views/ProgramSheetView.vue';

/**
 * Vue context for Program sheets.
 */
export type ProgramSheetContext = {
	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<ProgramDataModel>;

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
	system: ProgramDataModel;
};

/**
 * Program sheet controller.
 */
export default class ProgramSheet extends VueSheet(InfinityItemSheet<ProgramDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ProgramSheetViewVue;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ProgramSheetContext> {
		return {
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}
}
