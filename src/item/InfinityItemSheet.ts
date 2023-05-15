import InfinityItem from './InfinityItem';

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
	protected async _onDropItem(_event: DragEvent, _data: DropData) {}
	/**
	 * Called when a Folder is dropped on the item sheet.
	 */
	protected async _onDropFolder(_event: DragEvent, _data: DropData) {}
}
