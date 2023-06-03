import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import { ItemQualitiesActions, addItemQuality, removeItemQuality, updateItemQuality } from '../ItemQualities';
import ArmourDataModel, { ArmourLoadoutItem } from '../data/ArmourDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ArmourSheetViewVue from '../views/ArmourSheetView.vue';

/**
 * A list of item types allowed as part of the Armour's loadout.
 */
export const ARMOUR_LOADOUT_ALLOWLIST = ['ammunition', 'augmentation', 'contagion', 'explosive', 'gear', 'hackingDevice', 'weapon'];

/**
 * Vue sheet actions
 */
type ArmourSheetActions = ItemQualitiesActions & {
	/**
	 * Update the Loadout item with the specified UUID.
	 *
	 * @param uuid UUID of the contents to be updated.
	 * @param newValue New values to be used.
	 */
	updateLoadoutItem: (uuid: string, newValues: Partial<ArmourLoadoutItem>) => Promise<void>;

	/**
	 * Remove the Loadout item at the specified index.
	 *
	 * @param uuid UUID to be removed.
	 */
	removeLoadoutItem: (uuid: string) => Promise<void>;
};

/**
 * Vue context for Armour sheets.
 */
export type ArmourSheetContext = IBaseSheetContext<ArmourSheetActions>;

/**
 * Armour sheet controller.
 */
export default class ArmourSheet extends VueSheet(InfinityItemSheet<ArmourDataModel>) {
	/**
	 * View Actions
	 */
	private actions: ArmourSheetActions = {
		addItemQuality: addItemQuality.bind(this),
		updateItemQuality: updateItemQuality.bind(this),
		removeItemQuality: removeItemQuality.bind(this),

		updateLoadoutItem: this.updateLoadoutItem.bind(this),
		removeLoadoutItem: this.removeLoadoutItem.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ArmourSheetViewVue;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<ArmourSheetContext> {
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

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem | undefined;
		if (!droppedItem || !['itemQuality', ...ARMOUR_LOADOUT_ALLOWLIST].includes(droppedItem.type)) {
			return;
		}

		const droppedUuid = droppedItem.uuid;

		if (droppedItem.type === 'itemQuality') {
			await this.actions.addItemQuality(droppedItem as InfinityItem<ItemQualityDataModel>);
		} else {
			const loadout = [...this.item.system.loadout];
			const existingIndex = loadout.findIndex((i) => i.uuid === droppedUuid);

			if (existingIndex >= 0) {
				loadout[existingIndex] = {
					...loadout[existingIndex],
					quantity: loadout[existingIndex].quantity + 1,
				};
			} else {
				loadout.push({
					img: droppedItem.img,
					name: droppedItem.name,
					uuid: droppedItem.uuid,
					quantity: 1,
				});
			}

			await this.item.update({
				'system.loadout': loadout,
			});
		}
	}

	/**
	 * Update the Loadout item with the specified UUID.
	 *
	 * @param uuid UUID of the contents to be updated.
	 * @param newValue New values to be used.
	 */
	async updateLoadoutItem(uuid: string, newValues: Partial<ArmourLoadoutItem>) {
		const loadout = [...this.item.system.loadout];

		const itemIdx = loadout.findIndex((i) => i.uuid === uuid);
		if (itemIdx < 0) {
			return;
		}

		loadout[itemIdx] = {
			...loadout[itemIdx],
			...newValues,
			// Ensure UUID is never accidentally changed.
			uuid: loadout[itemIdx].uuid,
		};

		await this.item.update({
			'system.loadout': loadout,
		});
	}

	/**
	 * Remove the Loadout item at the specified index.
	 *
	 * @param uuid UUID to be removed.
	 */
	async removeLoadoutItem(uuid: string) {
		await this.item.update({
			'system.loadout': this.item.system.loadout.filter((i) => i.uuid !== uuid),
		});
	}
}
