import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import AugmentationDataModel from '../data/AugmentationDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import AugmentationSheetView from '../views/AugmentationSheetView.vue';

/**
 * Augmentation sheet controller.
 */
export default class AugmentationSheet extends VueSheet(InfinityItemSheet<AugmentationDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return AugmentationSheetView;
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
