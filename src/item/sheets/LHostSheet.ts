import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import LHostDataModel, { AbilityItemReference } from '../data/LHostDataModel';
import LHostSheetView from '../views/LHostSheetView.vue';

/**
 * LHost sheet controller.
 */
export default class LHostSheet extends VueSheet(InfinityItemSheet<LHostDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return LHostSheetView;
	}

	/**
	 * When an Ability is dropped on the sheet, we want to store its UUID as a special ability.
	 *
	 * @inheritdoc
	 */
	protected override async _onDropItem(_event: DragEvent, data: DropData) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem | undefined;
		if (!droppedItem || droppedItem.type !== 'ability') {
			return;
		}

		if (this.item.system.specialAbilities.find((a) => a.uuid === droppedItem.uuid)) {
			return;
		}

		await this.item.update({
			'system.specialAbilities': [
				...this.item.system.specialAbilities,
				{
					uuid: droppedItem.uuid,
					rank: 1,
				},
			] as AbilityItemReference[],
		});
	}
}
