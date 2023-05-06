import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import HackingDeviceDataModel, { ProgramItemReference } from '../data/HackingDeviceDataModel';
import HackingDeviceSheetViewVue from '../views/HackingDeviceSheetView.vue';
import ProgramDataModel from '../data/ProgramDataModel';

/**
 * Function callbacks
 */
type HackingDeviceSheetActions = {
	/**
	 * Open the Item sheet for the specified Program.
	 *
	 * @param index Index of the Program to open.
	 */
	openProgram: (index: number) => Promise<void>;

	/**
	 * Remove a Program reference from the device's installed program list.
	 *
	 * @param index Index of the Program to remove.
	 */
	removeProgram: (index: number) => Promise<void>;
};

/**
 * Vue context for Hacking Device sheets.
 */
export type HackingDeviceSheetContext = {
	/**
	 * Sheet actions callable by the View.
	 */
	actions: HackingDeviceSheetActions;

	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<HackingDeviceDataModel>;

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
	system: HackingDeviceDataModel;
};

/**
 * Hacking Device sheet controller.
 */
export default class HackingDeviceSheet extends VueSheet(InfinityItemSheet<HackingDeviceDataModel>) {
	/**
	 * Sheet action bindings.
	 */
	private actions: HackingDeviceSheetActions = {
		openProgram: this.openProgram.bind(this),
		removeProgram: this.removeProgram.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return HackingDeviceSheetViewVue;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<HackingDeviceSheetContext> {
		return {
			actions: this.actions,
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
		};
	}

	/**
	 * When a Program is dropped on the sheet, we want to store its UUID as an installed program.
	 *
	 * @inheritdoc
	 */
	protected override async _onDropItem(_event: DragEvent, data: DropData) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem | undefined;
		if (!droppedItem || droppedItem.type !== 'program') {
			return;
		}

		await this.item.update({
			'system.programs': [
				...this.item.system.programs,
				{
					uuid: droppedItem.uuid,
					name: droppedItem.name,
					img: droppedItem.img,
				},
			] as ProgramItemReference[],
		});
	}

	async openProgram(index: number) {
		if (index >= this.item.system.programs.length) {
			return;
		}

		const item = (await fromUuid(this.item.system.programs[index].uuid)) as InfinityItem<ProgramDataModel>;
		await item?.sheet?.render(true);
	}

	async removeProgram(index: number) {
		if (index >= this.item.system.programs.length) {
			return;
		}

		const programsCopy = [...this.item.system.programs];
		programsCopy.splice(index, 1);

		await this.item.update({
			'system.programs': programsCopy,
		});
	}
}
