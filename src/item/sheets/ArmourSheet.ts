import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import ArmourDataModel from '../data/ArmourDataModel';
import ItemQualityDataModel from '../data/ItemQualityDataModel';
import ArmourSheetViewVue from '../views/ArmourSheetView.vue';

/**
 * A list of item types allowed as part of the Armour's loadout.
 */
export const ARMOUR_LOADOUT_ALLOWLIST = ['ammunition', 'augmentation', 'contagion', 'explosive', 'gear', 'hackingDevice', 'weapon'];

/**
 * Armour sheet controller.
 */
export default class ArmourSheet extends VueSheet(InfinityItemSheet<ArmourDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return ArmourSheetViewVue;
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
			await this.addItemQuality(droppedItem as InfinityItem<ItemQualityDataModel>);
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
}
