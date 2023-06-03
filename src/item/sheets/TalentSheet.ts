import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import TalentDataModel, { TalentPrerequisite } from '../data/TalentDataModel';
import TalentSheetView from '../views/TalentSheetView.vue';

/**
 * Talent sheet controller.
 */
export default class TalentSheet extends VueSheet(InfinityItemSheet<TalentDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return TalentSheetView;
	}

	/**
	 * When a Talent is dropped on the sheet, we want to add a link to it as a prerequisite for the current Talent.
	 *
	 * @inheritdoc
	 */
	protected override async _onDropItem(_event: DragEvent, data: DropData): Promise<void> {
		if (!this.isEditable || !data.uuid || data.uuid === this.item.uuid) {
			return;
		}

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem | undefined;
		if (!droppedItem || droppedItem.type !== 'talent') {
			return;
		}

		await this.item.update({
			'system.prerequisites': [
				...this.item.system.prerequisites,
				{
					type: TalentPrerequisite.Type.Talent,
					value: `@UUID[${data.uuid}]{${droppedItem.name}}`,
				},
			] as TalentPrerequisite[],
		});
	}
}
