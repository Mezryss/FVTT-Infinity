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

	async getData(options = {}) {
		const enrichedDescription = await TextEditor.enrichHTML(this.system.description, { async: true });

		return {
			...super.getData(options),
			system: this.system,
			enrichedDescription,
			isOwned: this.item.isOwned,
		};
	}
}
