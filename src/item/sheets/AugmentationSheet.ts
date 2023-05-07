import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import AugmentationDataModel from '../data/AugmentationDataModel';
import { ItemQualityReference } from '../data/ItemQualityDataModel';
import AugmentationSheetView from '../views/AugmentationSheetView.vue';

/**
 * Vue sheet actions
 */
type AugmentationSheetActions = {
	/**
	 * Update the Item Quality at the specified index.
	 *
	 * @param index Index to be updated.
	 * @param newValue New values to be updated. UUID cannot be changed.
	 */
	updateQuality: (index: number, newValues: Exclude<ItemQualityReference, 'uuid'>) => Promise<void>;

	/**
	 * Remove the Item Quality at the specified index.
	 *
	 * @param index Index to be removed.
	 */
	removeQuality: (index: number) => Promise<void>;
};

/**
 * Vue context for Augmentation sheets.
 */
export type AugmentationSheetContext = {
	/**
	 * Vue sheet actions
	 */
	actions: AugmentationSheetActions;

	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityItem<AugmentationDataModel>;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Item icon.
	 */
	img: string;

	/**
	 * Item name.
	 */
	name: string;

	/**
	 * System data for the item.
	 */
	system: AugmentationDataModel;
};

/**
 * Augmentation sheet controller.
 */
export default class AugmentationSheet extends VueSheet(InfinityItemSheet<AugmentationDataModel>) {
	/**
	 * View Actions
	 */
	private actions: AugmentationSheetActions = {
		updateQuality: this.updateQuality.bind(this),
		removeQuality: this.removeQuality.bind(this),
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
		return {
			actions: this.actions,
			document: this.item,
			editable: this.isEditable,
			img: this.item.img,
			name: this.item.name,
			system: this.item.system,
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

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem | undefined;
		if (!droppedItem || droppedItem.type !== 'itemQuality') {
			return;
		}

		// Disallow dropping multiple of the same quality.
		const droppedUuid = droppedItem.uuid;

		if (this.item.system.qualities.find((q) => q.uuid === droppedUuid)) {
			return;
		}

		await this.item.update({
			'system.qualities': [
				...this.item.system.qualities,
				{
					uuid: droppedUuid,
					name: droppedItem.name,
					rank: 1,
					specialization: '',
				},
			] as ItemQualityReference[],
		});
	}

	/**
	 * Update the Item Quality at the specified index.
	 *
	 * @param index Index to be updated.
	 * @param newValue New values to be updated. UUID cannot be changed.
	 */
	async updateQuality(index: number, newValues: Exclude<ItemQualityReference, 'uuid'>) {
		const qualities = this.item.system.qualities;
		if (index >= qualities.length) {
			return;
		}

		const qualitiesCopy = [...qualities];
		qualitiesCopy[index] = {
			...qualities[index],
			...newValues,
		};

		await this.item.update({
			'system.qualities': qualitiesCopy,
		});
	}

	/**
	 * Remove the Item Quality at the specified index.
	 *
	 * @param index Index to be removed.
	 */
	async removeQuality(index: number) {
		const qualities = this.item.system.qualities;
		if (index >= qualities.length) {
			return;
		}

		const qualitiesCopy = [...qualities];
		qualitiesCopy.splice(index, 1);

		await this.item.update({
			'system.qualities': qualitiesCopy,
		});
	}
}
