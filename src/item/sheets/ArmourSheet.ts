import IBaseSheetContext from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import ArmourDataModel, { ArmourLoadoutItem } from '../data/ArmourDataModel';
import { ItemQualityReference } from '../data/ItemQualityDataModel';
import ArmourSheetViewVue from '../views/ArmourSheetView.vue';

/**
 * A list of item types allowed as part of the Armour's loadout.
 */
export const ARMOUR_LOADOUT_ALLOWLIST = ['ammunition', 'augmentation', 'contagion', 'explosive', 'gear', 'hackingDevice', 'weapon'];

/**
 * Vue sheet actions
 */
type ArmourSheetActions = {
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

	/**
	 * Update the Loadout item at the specified index.
	 *
	 * @param index Index to be updated.
	 * @param newValue New values to be updated. UUID cannot be changed.
	 */
	updateLoadoutItem: (index: number, newValues: Exclude<ArmourLoadoutItem, 'uuid'>) => Promise<void>;

	/**
	 * Remove the Loadout item at the specified index.
	 *
	 * @param index Index to be removed.
	 */
	removeLoadoutItem: (index: number) => Promise<void>;
};

/**
 * Vue context for Armour sheets.
 */
export type ArmourSheetContext = IBaseSheetContext<ArmourDataModel, ArmourSheetActions>;

/**
 * Armour sheet controller.
 */
export default class ArmourSheet extends VueSheet(InfinityItemSheet<ArmourDataModel>) {
	/**
	 * View Actions
	 */
	private actions: ArmourSheetActions = {
		updateQuality: this.updateQuality.bind(this),
		removeQuality: this.removeQuality.bind(this),
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
		if (!droppedItem || !['itemQuality', ...ARMOUR_LOADOUT_ALLOWLIST].includes(droppedItem.type)) {
			return;
		}

		const droppedUuid = droppedItem.uuid;

		if (droppedItem.type === 'itemQuality') {
			// Disallow dropping multiple of the same quality.
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

	/**
	 * Update the Loadout item at the specified index.
	 *
	 * @param index Index to be updated.
	 * @param newValue New values to be updated. UUID cannot be changed.
	 */
	async updateLoadoutItem(index: number, newValues: Exclude<ArmourLoadoutItem, 'uuid'>) {
		const loadout = this.item.system.loadout;
		if (index >= loadout.length) {
			return;
		}

		const loadoutCopy = [...loadout];
		loadoutCopy[index] = {
			...loadout[index],
			...newValues,
		};

		await this.item.update({
			'system.loadout': loadoutCopy,
		});
	}

	/**
	 * Remove the Loadout item at the specified index.
	 *
	 * @param index Index to be removed.
	 */
	async removeLoadoutItem(index: number) {
		const loadout = this.item.system.loadout;
		if (index >= loadout.length) {
			return;
		}

		const loadoutCopy = [...loadout];
		loadoutCopy.splice(index, 1);

		await this.item.update({
			'system.loadout': loadoutCopy,
		});
	}
}
