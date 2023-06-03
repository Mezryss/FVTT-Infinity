import { useDocumentStore } from '@/stores/documentStore';
import { useItemStore } from '@/stores/itemStore';

import InfinityItem from './InfinityItem';
import ItemQualityDataModel, { HasItemQualities, ItemQualityReference } from './data/ItemQualityDataModel';

/**
 * Simplified drop data structure.
 */
export type DropData = {
	type: 'ActiveEffect' | 'Actor' | 'Item' | 'Folder';
	uuid: string;
};

/**
 * Base class for Item sheets used by the system.
 */
export default class InfinityItemSheet<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel> extends ItemSheet<InfinityItem<DataModelType>> {
	static override get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['infinity', 'sheet', 'item'],
			dragDrop: [
				{
					dragSelector: '.item-list .item',
				},
			],
			tabs: [
				{
					navSelector: '.sheet-tabs',
					contentSelector: '.sheet-body',
					initial: 'description',
				},
			],
		};
	}

	/**
	 * Convenience accessor for the Item UUID.
	 */
	get documentUuid() {
		return this.item.uuid;
	}

	/**
	 * Update Pinia stores.
	 */
	async updateStores() {
		const uuid = this.item.uuid;

		const documentStore = useDocumentStore(uuid);
		documentStore.document = this.item;
		documentStore.editable = this.isEditable;

		const itemStore = useItemStore(uuid);
		itemStore.setItem(this.item);
	}

	/**
	 * Processes and adds an Item Quality to the sheet.
	 *
	 * @param quality Item Quality to add to the sheet.
	 */
	protected async addItemQuality(quality?: InfinityItem<ItemQualityDataModel>) {
		const qualities = (this.item.system as unknown as HasItemQualities).qualities;

		if (qualities === undefined) {
			return;
		}

		// Don't process undefined items or items that aren't Item Qualities.
		if (!quality || quality.type !== 'itemQuality') {
			return;
		}

		// Don't allow duplicate copies of the same Item Quality
		if (qualities.find((q) => q.uuid === quality.uuid)) {
			return;
		}

		await this.item.update({
			'system.qualities': [
				...qualities,
				{
					uuid: quality.uuid,
					name: quality.name,
					rank: quality.system.isRanked ? 1 : 0,
					specialization: '',
				},
			] as ItemQualityReference[],
		});
	}

	/**
	 * Add support for drop data on Item sheets.
	 */
	protected override _onDrop(event: DragEvent) {
		const data: DropData = <DropData>TextEditor.getDragEventData(event);

		switch (data.type) {
			case 'ActiveEffect':
				return this._onDropActiveEffect(event, data);
			case 'Actor':
				return this._onDropActor(event, data);
			case 'Item':
				return this._onDropItem(event, data);
			case 'Folder':
				return this._onDropFolder(event, data);
		}
	}

	/**
	 * Called when an ActiveEffect is dropped on the item sheet.
	 */
	protected async _onDropActiveEffect(_event: DragEvent, _data: DropData) {}

	/**
	 * Called when an Actor is dropped on the item sheet.
	 */
	protected async _onDropActor(_event: DragEvent, _data: DropData) {}

	/**
	 * Called when an Item is dropped on the item sheet.
	 */
	protected async _onDropItem(_event: DragEvent, data: DropData) {
		// Handle drag-and-drop support for Item Qualities.
		if (!this.isEditable || !data.uuid) {
			return;
		}

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem<ItemQualityDataModel> | undefined;
		await this.addItemQuality(droppedItem);
	}

	/**
	 * Called when a Folder is dropped on the item sheet.
	 */
	protected async _onDropFolder(_event: DragEvent, _data: DropData) {}
}
