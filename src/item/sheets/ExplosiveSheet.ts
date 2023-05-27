import IBaseSheetContext from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import { ItemQualitiesActions, addItemQuality, removeItemQuality, updateItemQuality } from '../ItemQualities';
import ExplosiveDataModel from '../data/ExplosiveDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ExplosiveSheetView from '../views/ExplosiveSheetView.vue';

/**
 * Vue context for Explosive sheets.
 */
export type ExplosiveSheetContext = IBaseSheetContext<ExplosiveDataModel, ItemQualitiesActions>;

/**
 * Explosive sheet controller.
 */
export default class ExplosiveSheet extends VueSheet(InfinityItemSheet<ExplosiveDataModel>) {
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
		return ExplosiveSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ExplosiveSheetContext> {
		return {
			actions: this.actions,
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
			owned: this.item.isOwned,
			limited: this.item.limited,
		};
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
