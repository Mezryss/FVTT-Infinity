import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import ExplosiveDataModel from '../data/ExplosiveDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ExplosiveSheetView from '../views/ExplosiveSheetView.vue';

/**
 * Explosive sheet controller.
 */
export default class ExplosiveSheet extends VueSheet(InfinityItemSheet<ExplosiveDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ExplosiveSheetView;
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
