import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import { ItemQualitiesActions, addItemQuality, removeItemQuality, updateItemQuality } from '../ItemQualities';
import AugmentationDataModel from '../data/AugmentationDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import AugmentationSheetView from '../views/AugmentationSheetView.vue';

/**
 * Vue context for Augmentation sheets.
 */
export type AugmentationSheetContext = IBaseSheetContext<AugmentationDataModel, ItemQualitiesActions>;

/**
 * Augmentation sheet controller.
 */
export default class AugmentationSheet extends VueSheet(InfinityItemSheet<AugmentationDataModel>) {
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
		return AugmentationSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<AugmentationSheetContext> {
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
