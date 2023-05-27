import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import { ItemQualitiesActions, addItemQuality, removeItemQuality, updateItemQuality } from '../ItemQualities';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import WeaponDataModel from '../data/WeaponDataModel';
import WeaponSheetView from '../views/WeaponSheetView.vue';

/**
 * Vue context for Weapon sheets.
 */
export type WeaponSheetContext = IBaseSheetContext<WeaponDataModel, ItemQualitiesActions>;

/**
 * Weapon sheet controller.
 */
export default class WeaponSheet extends VueSheet(InfinityItemSheet<WeaponDataModel>) {
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
		return WeaponSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<WeaponSheetContext> {
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
