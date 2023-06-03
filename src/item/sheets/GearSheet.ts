import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import { ItemQualitiesActions, addItemQuality, removeItemQuality, updateItemQuality } from '../ItemQualities';
import GearDataModel from '../data/GearDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import GearSheetView from '../views/GearSheetView.vue';

export type GearSheetContext = IBaseSheetContext<GearDataModel, ItemQualitiesActions>;

/**
 * Gear sheet controller.
 */
export default class GearSheet extends VueSheet(InfinityItemSheet<GearDataModel>) {
	/**
	 * View Actions
	 */
	private actions: ItemQualitiesActions = {
		addItemQuality: addItemQuality.bind(this),
		removeItemQuality: removeItemQuality.bind(this),
		updateItemQuality: updateItemQuality.bind(this),
	};

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
		return IBaseSheetContext.baseContext(this);
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
		await this.actions.addItemQuality(droppedItem);
	}
}
