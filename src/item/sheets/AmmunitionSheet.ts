import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import AmmunitionDataModel from '../data/AmmunitionDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import AmmunitionSheetView from '../views/AmmunitionSheetView.vue';

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
