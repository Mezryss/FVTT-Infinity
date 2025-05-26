import type { HandlebarsParts, SheetTabs } from '@/apps/sheets/handlebars-mixin.ts';
import type { InfinityItem } from '@/items/infinity-item.ts';
import { GearDataModel, GearQuality } from '@/items/models/gear.ts';
import type { QualityDataModel } from '@/items/models/quality.ts';
import { InfinityItemSheet } from '@/items/sheets/infinity-item.ts';
import { ItemType } from '@/items';

interface GearQualityTemplateData {
	label: string;
	uuid: string;
	tooltip: string;
	valid: true;
	rank: number;
	ranked: boolean;
}

async function fetchQuality({
	uuid,
	rank,
}: GearQuality): Promise<GearQualityTemplateData | { uuid: string; valid: false }> {
	// Fetch and validate the item from its UUID.
	const item = await fromUuid<InfinityItem<QualityDataModel>>(uuid);
	if (!item) {
		return { uuid, valid: false };
	}

	const tooltip = await foundry.applications.ux.TextEditor.enrichHTML(item.system.description, <
		any
	>{ rank });

	return {
		label: item.system.abbreviation || item.name,
		uuid,
		rank,
		tooltip,
		valid: true,
		ranked: item.system.ranked,
	};
}

/**
 * Item Sheet for Gear.
 */
export class GearItemSheet<
	DataModel extends GearDataModel = GearDataModel,
> extends InfinityItemSheet<DataModel> {
	static override DEFAULT_OPTIONS = <any>{
		actions: {
			removeQuality: GearItemSheet.#removeQuality,
		},
		window: {
			contentClasses: ['gear'],
		},
	};

	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/item/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		description: { template: 'systems/infinity/templates/sheets/item/description.hbs' },
		detail: { template: 'systems/infinity/templates/sheets/item/gear/detail/other.hbs' },
		effects: { template: 'systems/infinity/templates/sheets/item/effects.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [{ id: 'description' }, { id: 'detail' }, { id: 'effects' }],
			initial: 'detail',
			labelPrefix: 'Infinity.Tabs',
		},
	};

	override async _onFirstRender(context: any, options: any) {
		await super._onFirstRender(context, options);

		// Establish Drag-Drop support for item qualities.
		if (this.isEditable) {
			new foundry.applications.ux.DragDrop({
				dropSelector: '.window-content',
				// Another instance of Foundry JSDocs not using Partials causing TS issues.
				callbacks: <any>{
					drop: this.#onDrop.bind(this),
				},
			}).bind(this.element);
		}
	}

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		const enrichedDescription = await foundry.applications.ux.TextEditor.enrichHTML(
			this.item.system.description,
		);

		// Fetch quality data for the piece of gear.
		const qualities = await Promise.all(this.item.system.qualities.map(fetchQuality));

		return {
			...baseContext,

			enrichedDescription,
			qualities,
		};
	}

	/**
	 * Event handler when the item sheet is the target of a document drop.
	 */
	async #onDrop(event: DragEvent) {
		// Only allow dropping qualities on editable sheets.
		if (!this.isEditable) {
			return;
		}

		// Fetch & validate drag/drop data.
		let dropData: {
			type: string;
			uuid: string;
		} | null = null;

		const plainData = event.dataTransfer?.getData('text/plain');
		if (!plainData) {
			return;
		}

		// Parse the drop details
		try {
			dropData = JSON.parse(plainData);
		} catch (err: unknown) {
			console.error(err);
			return;
		}

		if (!dropData || !dropData.type || dropData.type !== 'Item') {
			return;
		}

		// Fetch the dropped item to validate it's an Item Quality.
		const item = await fromUuid<InfinityItem<QualityDataModel>>(dropData.uuid);
		if (!item || item.type !== ItemType.Quality) {
			ui.notifications.error(
				game.i18n.localize('Infinity.Sheets.Gear.QualitiesOnlyNotification'),
			);
			return;
		}

		// Don't allow the same quality to be added multiple times.
		const qualities = this.item.system.qualities;
		const existingQualityUuids = qualities.map((q) => q.uuid);

		if (existingQualityUuids.includes(item.uuid)) {
			ui.notifications.error(
				game.i18n.format('Infinity.Sheets.Gear.QualityAlreadyAddedNotification', {
					name: item.name,
				}),
			);
			return;
		}

		// Add the quality to the appropriate qualities list.
		await this.item.update({
			'system.qualities': [
				...qualities,
				{
					uuid: item.uuid,
					rank: 1,
				},
			],
		});
	}

	/**
	 * Event Handler: `data-action="removeQuality"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Removes the Quality with the specified UUID from the sheet.
	 */
	static async #removeQuality(this: GearItemSheet, _event: Event, target: HTMLElement) {
		if (!this.isEditable) {
			return;
		}

		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return Promise.reject('Invalid data-uuid property.');
		}

		const qualities = this.item.system.qualities;

		const newQualities = [...qualities];
		const index = newQualities.findIndex((q) => q.uuid === uuid);
		if (index < 0) {
			return;
		}

		newQualities.splice(index, 1);

		await this.item.update({
			'system.qualities': newQualities,
		});
	}
}
