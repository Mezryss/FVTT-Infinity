import type { HandlebarsRenderOptions } from '@client/applications/api/handlebars-application.mjs';

import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin';
import {
	GearType,
	LABELED_AMMUNITION_CATEGORIES,
	LABELED_ARMOUR_TYPES,
	LABELED_AUGMENTATION_CATEGORIES,
	LABELED_AUGMENTATION_TYPES,
	LABELED_GEAR_TYPES,
} from '@/data/gear';
import type { GearDataModel } from '@/items/models/gear';
import { InfinityItemSheet, type SheetTabs } from './infinity-item';
import type { InfinityItem } from '../infinity-item';
import type { QualityDataModel } from '../models/quality';
import { GearQuality } from '../models/gear/quality';

type QualityItem = InfinityItem<QualityDataModel>;

/**
 * Utility method to fetch details about a Quality entry from the quality's actual item.
 */
async function fetchQuality(quality: GearQuality) {
	const qual = await fromUuid<QualityItem>(quality.uuid);
	if (!qual) {
		return {
			uuid: quality.uuid,
			valid: false,
		};
	}

	const rank = qual.system.ranked ? quality.rank : 0;

	const description = await foundry.applications.ux.TextEditor.enrichHTML(
		qual.system.description,
		<any>{ rank },
	);

	return {
		uuid: quality.uuid,
		// Label is what should actually be displayed on sheets - prefer the Abbreviation when possible.
		label: qual.system.abbreviation.trim() || qual.name,
		ranked: qual.system.ranked,
		rank,
		tooltip: description,
		valid: true,
	};
}

/**
 * Item Sheet for Gear.
 */
export class GearItemSheet extends InfinityItemSheet<GearDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		actions: {
			removeQuality: GearItemSheet.#removeQuality,
		},
		window: {
			contentClasses: ['talent'],
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

	/**
	 * Utility method to fetch qualities information by item type.
	 */
	getQualitiesForItemType(): [string | null, GearQuality[] | null] {
		let qualitiesPath: string | null = null;
		let qualities: GearQuality[] | null = null;

		switch (this.item.system.type) {
			case GearType.Ammunition:
				qualitiesPath = 'system.ammunition.addsQualities';
				qualities = this.item.system.ammunition.addsQualities;
				break;

			case GearType.Armour:
				qualitiesPath = 'system.armour.qualities';
				qualities = this.item.system.armour.qualities;
				break;

			case GearType.Augmentation:
				qualitiesPath = 'system.augmentation.qualities';
				qualities = this.item.system.augmentation.qualities;
				break;

			case GearType.Drug:
				qualitiesPath = 'system.drug.qualities';
				qualities = this.item.system.drug.qualities;
				break;
		}

		return [qualitiesPath, qualities];
	}

	override get typeLabel(): string {
		return game.i18n.localize(`Infinity.GearTypes.${this.item.system.type}`);
	}

	override _configureRenderParts(options: HandlebarsRenderOptions): HandlebarsParts {
		const parts = super._configureRenderParts(options);

		parts['detail'].template =
			`systems/infinity/templates/sheets/item/gear/detail/${this.item.system.type}.hbs`;

		return parts;
	}

	override async _onFirstRender(context: any, options: any) {
		await super._onFirstRender(context, options);

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

		const [qualitiesPath, _] = this.getQualitiesForItemType();

		return {
			...baseContext,

			ammunition: await this.prepareAmmunitionContext(),
			armour: await this.prepareArmourContext(),
			augmentation: await this.prepareAugmentationContext(),
			drug: await this.prepareDrugContext(),

			qualitiesPath,

			LABELED_AMMUNITION_CATEGORIES,
			LABELED_ARMOUR_TYPES,
			LABELED_AUGMENTATION_CATEGORIES,
			LABELED_AUGMENTATION_TYPES,
			LABELED_GEAR_TYPES,
		};
	}

	/**
	 * Prepares Context data for Ammunition-type gear.
	 */
	async prepareAmmunitionContext() {
		const qualities = await Promise.all(
			this.item.system.ammunition.addsQualities.map(fetchQuality),
		);

		return {
			qualities,
		};
	}

	/**
	 * Prepares Context data for Armour-type gear.
	 */
	async prepareArmourContext() {
		const qualities = await Promise.all(this.item.system.armour.qualities.map(fetchQuality));

		return {
			qualities,
		};
	}

	/**
	 * Prepares context for Augmentation-type gear.
	 */
	async prepareAugmentationContext() {
		const qualities = await Promise.all(
			this.item.system.augmentation.qualities.map(fetchQuality),
		);

		return {
			qualities,
		};
	}

	/**
	 * Prepares context for Drug-type gear.
	 */
	async prepareDrugContext() {
		const qualities = await Promise.all(this.item.system.drug.qualities.map(fetchQuality));

		return {
			qualities,
		};
	}

	/**
	 * Event handler when the item sheet is the target of a document drop.
	 */
	async #onDrop(event: DragEvent) {
		if (!this.isEditable) {
			return;
		}

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
		const item = await fromUuid<QualityItem>(dropData.uuid);
		if (!item || item.type !== 'quality') {
			ui.notifications.error(
				game.i18n.localize('Infinity.Sheets.Gear.QualitiesOnlyNotification'),
			);
			return;
		}

		// Capture the list of existing Qualities depending on the item type.
		const [qualitiesPath, qualities] = this.getQualitiesForItemType();
		if (qualitiesPath === null || qualities === null) {
			return;
		}

		// Don't allow the same quality to be added multiple times.
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
			[qualitiesPath]: [
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

		const [qualitiesPath, qualities] = this.getQualitiesForItemType();
		if (qualitiesPath === null || qualities === null) {
			return;
		}

		const newQualities = [...qualities];
		const index = newQualities.findIndex((q) => q.uuid === uuid);
		if (index < 0) {
			return;
		}

		newQualities.splice(index, 1);

		await this.item.update({
			[qualitiesPath]: newQualities,
		});
	}
}
