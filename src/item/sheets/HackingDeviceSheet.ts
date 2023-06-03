import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import HackingDeviceDataModel, { ProgramItemReference } from '../data/HackingDeviceDataModel';
import HackingDeviceSheetViewVue from '../views/HackingDeviceSheetView.vue';

/**
 * Hacking Device sheet controller.
 */
export default class HackingDeviceSheet extends VueSheet(InfinityItemSheet<HackingDeviceDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return HackingDeviceSheetViewVue;
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
}
