import IBaseSheetContext from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import ExplosiveDataModel from '../data/ExplosiveDataModel';
import { ItemQualityReference } from '../data/ItemQualityDataModel';
import ExplosiveSheetView from '../views/ExplosiveSheetView.vue';

/**
 * Vue sheet actions
 */
type ExplosiveSheetActions = {
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
 * Vue context for Explosive sheets.
 */
export type ExplosiveSheetContext = IBaseSheetContext<ExplosiveDataModel, ExplosiveSheetActions>;

/**
 * Explosive sheet controller.
 */
export default class ExplosiveSheet extends VueSheet(InfinityItemSheet<ExplosiveDataModel>) {
	/**
	 * View Actions
	 */
	private actions: ExplosiveSheetActions = {
		updateQuality: this.updateQuality.bind(this),
		removeQuality: this.removeQuality.bind(this),
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
