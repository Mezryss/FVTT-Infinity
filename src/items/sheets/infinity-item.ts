import { HandlebarsRenderOptions } from '@client/applications/api/handlebars-application.mjs';

import {
	HandlebarsMixin,
	type HandlebarsParts,
	type SheetTabs,
} from '@/apps/sheets/handlebars-mixin';
import { InfinityItem } from '@/items/infinity-item';
import type { InfinityItemDataModel } from '@/items/models/infinity-item';

const { ItemSheetV2 } = foundry.applications.sheets;

/**
 * Base class for all Infinity item sheets.
 */
export class InfinityItemSheet<
	DataModelType extends InfinityItemDataModel = InfinityItemDataModel,
> extends HandlebarsMixin(ItemSheetV2) {
	static PARTS: HandlebarsParts = {};

	static TABS: SheetTabs = {};

	static override DEFAULT_OPTIONS = {
		actions: {
			openDocument: InfinityItemSheet.#openDocument,
		},
		classes: ['infinity', 'item-window'],
		form: {
			submitOnChange: true,
		},
		position: <any>{
			// Need <any> typing due to lack of Partiality in Foundry JSDocs (& width typed as number instead of number|'auto').
			height: 400,
		},
		window: {
			icon: 'far fa-image-portrait',
			resizable: true,
			contentClasses: ['item-sheet'],
		},
	};

	/**
	 * Accessor for the Item Sheet's associated Item, with a strongly-typed data model class.
	 */
	// @ts-expect-error Overriding the item accessor from ItemSheetV2 to get a Generic item appropriately.
	readonly item!: InfinityItem<DataModelType>;

	/**
	 * The label applied on an Item sheet above the name of the item itself, indicating details about what type of item it is.
	 */
	get typeLabel(): string {
		return game.i18n.localize(`TYPES.Item.${this.item.type}`);
	}

	/**
	 * Inserts base context information shared by all item sheets.
	 */
	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);
		const enrichedDescription = await foundry.applications.ux.TextEditor.enrichHTML(
			this.item.system.description,
		);

		return {
			...baseContext,

			// Ownership
			isOwner: this.document.isOwner,
			limited: this.document.limited,
			isOwned: this.item.isOwned,

			// Item Data
			item: this.item,
			system: this.item.system,
			flags: this.item.flags,

			// Item Type Label
			typeLabel: this.typeLabel,

			// Specially-processed data
			enrichedDescription,
		};
	}

	/**
	 * Injects information about the current tab for the given part.
	 */
	override async _preparePartContext(
		partId: string,
		context: foundry.applications.types.ApplicationRenderContext,
		options: HandlebarsRenderOptions,
	): Promise<foundry.applications.types.ApplicationRenderContext> {
		const partContext = await super._preparePartContext(partId, context, options);
		if (!partContext.tabs) {
			return partContext;
		}

		const newContext: Record<string, any> = {};
		if (partId in partContext.tabs) {
			newContext.tab = partContext.tabs[partId];
		}

		Object.assign(partContext, newContext);

		return partContext;
	}

	/**
	 * Event Handler: `data-action="openDocument"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Attempts to open a sheet for the document with the specified UUID.
	 */
	static async #openDocument(this: InfinityItemSheet, _event: Event, target: HTMLElement) {
		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return Promise.reject('Invalid data-uuid property.');
		}

		(await fromUuid<InfinityItem>(uuid))?.sheet?.render(true);
	}
}
