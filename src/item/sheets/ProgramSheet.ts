import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ProgramDataModel from '../data/ProgramDataModel';
import ProgramSheetView from '../views/ProgramSheetView.vue';

/**
 * Program sheet controller.
 */
export default class ProgramSheet extends VueSheet(InfinityItemSheet<ProgramDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ProgramSheetView;
	}

	/**
	 * Handle drag-and-drop support for Item Qualities.
	 *
	 * @inheritdoc
	 */
	protected override async _onDropItem(_event: DragEvent, data: DropData) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem<ItemQualityDataModel> | undefined;
		await this.addItemQuality(droppedItem);
	}
}
