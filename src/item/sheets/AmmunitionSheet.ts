import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import { ItemQualitiesActions, addItemQuality, removeItemQuality, updateItemQuality } from '../ItemQualities';
import AmmunitionDataModel from '../data/AmmunitionDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import AmmunitionSheetView from '../views/AmmunitionSheetView.vue';

/**
 * Vue context for Ammunition sheets.
 */
export type AmmunitionSheetContext = IBaseSheetContext<AmmunitionDataModel, ItemQualitiesActions>;

/**
 * Ammunition sheet controller.
 */
export default class AmmunitionSheet extends VueSheet(InfinityItemSheet<AmmunitionDataModel>) {
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
		return AmmunitionSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<AmmunitionSheetContext> {
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
