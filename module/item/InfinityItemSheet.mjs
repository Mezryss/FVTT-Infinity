import { InfinityItem } from './InfinityItem.mjs';

/**
 * Shared base class for all Infinity Item Sheets
 */
export default class InfinityItemSheet extends ItemSheet {
	/**
	 * Convenience accessor for the item's data model
	 */
	get system() {
		return this.item.system;
	}

	static get defaultOptions() {
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

	get template() {
		return `systems/infinity/templates/items/${this.item.type}.hbs`;
	}

	/**
	 * @param {JQuery} html
	 */
	activateListeners(html) {
		super.activateListeners(html);

		html.find('[data-action="open-sheet"]').on('click', this.openSheet.bind(this));
		html.find('[data-action="delete-quality"]').on('click', this.deleteQuality.bind(this));
	}

	/**
	 * Event Handler; Opens a document sheet.
	 * @param {Event} event
	 */
	async openSheet(event) {
		const uuid = $(event.currentTarget).data('uuid');
		const document = await fromUuid(uuid);
		document?.sheet?.render(true);
	}

	/**
	 * Event Handler; Delete an Item Quality
	 *
	 * @param {Event} event
	 */
	async deleteQuality(event) {
		const uuid = $(event.currentTarget).data('uuid');

		const qualities = [.../** @type Gear */ this.system.qualities];
		const index = qualities.findIndex((q) => q.uuid === uuid);
		if (index < 0) {
			return;
		}

		qualities.splice(index, 1);

		await this.item.update({
			'system.qualities': qualities,
		});
	}

	async getData(options = {}) {
		const enrichedDescription = await TextEditor.enrichHTML(this.system.description, { async: true });

		return {
			...super.getData(options),
			system: this.system,
			enrichedDescription,
			isOwned: this.item.isOwned,
			CONFIG: CONFIG,
			itemQualities: await this.loadItemQualities(),
		};
	}

	/**
	 * @typedef {object} ItemQualityTemplateDetail
	 * @property {string} uuid UUID for the Item Document
	 * @property {string} name Name of the Item Quality
	 * @property {string} img Image for the Item Quality
	 * @property {?ItemQualityDataModel} system System value for the Item Quality
	 * @property {number} rating Rating for this instance of the Item Quality
	 * @property {string} specialization Specialization for this instance of the Item Quality
	 */
	/**
	 * Fetches itemQuality Items by their UUID and prepares the data for use in templates via the `items/item-qualities` partial.
	 *
	 * @returns {Promise<ItemQualityTemplateDetail[]>}
	 */
	async loadItemQualities() {
		/** @type Gear */
		const system = this.system;

		if (!system.qualities) {
			return [];
		}

		return await Promise.all(
			system.qualities.map(async (q) => {
				/** @type ?InfinityItem.<ItemQualityDataModel> */
				const item = await fromUuid(q.uuid);

				return /** @type ItemQualityTemplateDetail */ {
					uuid: q.uuid,
					rating: q.rating,
					specialization: q.specialization,
					name: item?.name ?? 'ERR: Missing',
					img: item?.img ?? 'icons/svg/item-bag.svg',
					system: item?.system ?? null, // It would be undefined otherwise.
				};
			}),
		);
	}

	/**
	 * Processes and adds an Item Quality to the sheet.
	 *
	 * @param {InfinityItem.<ItemQualityDataModel>} quality
	 */
	async addItemQuality(quality) {
		const qualities = /** @type Gear */ this.system.qualities;
		if (!qualities || !quality || quality.type !== 'itemQuality') {
			return;
		}

		// Disallow duplicates of the same item quality
		if (qualities.find((q) => q.uuid === quality.uuid)) {
			return;
		}

		await this.item.update({
			'system.qualities': [
				...qualities,
				{
					uuid: quality.uuid,
					rating: 1,
					specialization: '',
				},
			],
		});
	}

	async _onDrop(event) {
		/** @type DropData */
		const data = TextEditor.getDragEventData(event);

		switch (data.type) {
			case 'ActiveEffect':
				return await this._onDropActiveEffect(event, data);
			case 'Actor':
				return await this._onDropActor(event, data);
			case 'Item':
				return await this._onDropItem(event, data);
			case 'Folder':
				return await this._onDropFolder(event, data);
		}
	}

	/**
	 * Called when an ActiveEffect is dropped on the item sheet.
	 *
	 * @param {DragEvent} _event
	 * @param {DropData} _data
	 * @protected
	 */
	async _onDropActiveEffect(_event, _data) {}

	/**
	 * Called when an Actor is dropped on the item sheet.
	 *
	 * @param {DragEvent} _event
	 * @param {DropData} _data
	 * @protected
	 */
	async _onDropActor(_event, _data) {}

	/**
	 * Called when an Item is dropped on the item sheet.
	 *
	 * @param {DragEvent} _event
	 * @param {DropData} data
	 * @protected
	 */
	async _onDropItem(_event, data) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		/** @type InfinityItem.<ItemQualityDataModel> */
		const droppedItem = await InfinityItem.implementation.fromDropData(data);
		await this.addItemQuality(droppedItem);
	}

	/**
	 * Called when a Folder is dropped on the item sheet.
	 *
	 * @param {DragEvent} _event
	 * @param {DropData} _data
	 * @protected
	 */
	async _onDropFolder(_event, _data) {}
}
