import { HandlebarsRenderOptions } from '@client/applications/api/handlebars-application.mjs';

import {
	HandlebarsMixin,
	type HandlebarsParts,
	type SheetTabs,
} from '@/apps/sheets/handlebars-mixin';
import { InfinityItem } from '@/items/infinity-item';
import { InfinityActorDataModel } from '../models/infinity-actor';
import { InfinityActor } from '../infinity-actor';

const { ActorSheetV2 } = foundry.applications.sheets;

/**
 * Base class for all Infinity actor sheets.
 */
export class InfinityActorSheet<
	DataModelType extends InfinityActorDataModel = InfinityActorDataModel,
> extends HandlebarsMixin(ActorSheetV2) {
	static PARTS: HandlebarsParts = {};

	static TABS: SheetTabs = {};

	// Need <any> typing due to lack of Partiality in Foundry JSDocs.
	static override DEFAULT_OPTIONS = <any>{
		actions: {
			openDocument: InfinityActorSheet.#openDocument,
		},
		classes: ['infinity', 'actor-window'],
		form: {
			submitOnChange: true,
		},
		position: {
			height: 400,
		},
		window: {
			resizable: true,
			contentClasses: ['actor-sheet'],
		},
	};

	/**
	 * Accessor for the Actor Sheet's associated Actor, with a strongly-typed data model class.
	 */
	// @ts-expect-error Overriding the actor accessor from ActorSheetV2 to get a Generic item appropriately.
	readonly actor!: InfinityActor<DataModelType>;

	/**
	 * Event Handler: `data-action="openDocument"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Attempts to open a sheet for the document with the specified UUID.
	 */
	static async #openDocument(this: InfinityActorSheet, _event: Event, target: HTMLElement) {
		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return Promise.reject('Invalid data-uuid property.');
		}

		(await fromUuid<InfinityItem>(uuid))?.sheet?.render(true);
	}

	/**
	 * Inserts base context information shared by all item sheets.
	 */
	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			// Ownership
			isOwner: this.document.isOwner,
			limited: this.document.limited,
			isEmbedded: this.actor.isEmbedded,
			isToken: this.actor.isToken,

			// Actor Data
			actor: this.actor,
			system: this.actor.system,
			flags: this.actor.flags,
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
}
