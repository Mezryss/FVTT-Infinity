import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import TalentDataModel, { TalentPrerequisite } from '../data/TalentDataModel';
import TalentSheetView from '../views/TalentSheetView.vue';

/**
 * Function callbacks
 */
type TalentSheetActions = {
	/**
	 * Adds an empty Prerequisite to the end of the list.
	 */
	addPrerequisite: () => Promise<void>;

	/**
	 * Updates the value of a specified Prerequisite by index.
	 */
	updatePrerequisite: (index: number, newValue: TalentPrerequisite) => Promise<void>;

	/**
	 * Removes the specified index from the list of prerequisites.
	 */
	removePrerequisite: (index: number) => Promise<void>;
};

/**
 * Vue context for Talent sheets.
 */
export type TalentSheetContext = IBaseSheetContext<TalentSheetActions>;

/**
 * Talent sheet controller.
 */
export default class TalentSheet extends VueSheet(InfinityItemSheet<TalentDataModel>) {
	/**
	 * Sheet action bindings.
	 */
	private actions: TalentSheetActions = {
		addPrerequisite: this.addPrerequisite.bind(this),
		updatePrerequisite: this.updatePrerequisite.bind(this),
		removePrerequisite: this.removePrerequisite.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return TalentSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<TalentSheetContext> {
		return IBaseSheetContext.baseContext(this);
	}

	/**
	 * Adds an empty prerequisite to the talent's prereq list.
	 */
	async addPrerequisite() {
		await this.item.update({
			'system.prerequisites': [
				...this.item.system.prerequisites,
				{
					type: TalentPrerequisite.Type.Other,
					value: '',
				} as TalentPrerequisite,
			],
		});
	}

	/**
	 * Update the value of a prerequisite at the specified index.
	 *
	 * @param index Index within the prerequisites array to update.
	 * @param prerequisite New object for the Prerequisite.
	 */
	async updatePrerequisite(index: number, prerequisite: TalentPrerequisite) {
		if (index >= this.item.system.prerequisites.length) {
			return;
		}

		const prereqCopy = [...this.item.system.prerequisites];

		prereqCopy[index] = prerequisite;

		await this.item.update({
			'system.prerequisites': prereqCopy,
		});
	}

	/**
	 * Removes the prerequisite with the specified index.
	 *
	 * @param index Index within the prerequisites array to remove.
	 */
	async removePrerequisite(index: number) {
		const prereqCopy = [...this.item.system.prerequisites];

		prereqCopy.splice(index, 1);

		await this.item.update({
			'system.prerequisites': prereqCopy,
		});
	}

	/**
	 * When a Talent is dropped on the sheet, we want to add a link to it as a prerequisite for the current Talent.
	 *
	 * @inheritdoc
	 */
	protected override async _onDropItem(_event: DragEvent, data: DropData): Promise<void> {
		if (!this.isEditable || !data.uuid) {
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
