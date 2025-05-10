import type { HandlebarsRenderOptions } from '@client/applications/api/handlebars-application.mjs';

import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin';
import {
	GearType,
	LABELED_AMMUNITION_CATEGORIES,
	LABELED_ARMOUR_TYPES,
	LABELED_AUGMENTATION_CATEGORIES,
	LABELED_AUGMENTATION_TYPES,
	LABELED_EXPLOSIVE_CATEGORIES,
	LABELED_GEAR_TYPES,
	LABELED_ITEM_SIZES,
	LABELED_PROGRAM_TYPES,
	LABELED_WEAPON_TYPES,
	WeaponType,
} from '@/data/gear';
import type { GearDataModel } from '@/items/models/gear';
import { GearQuality } from '@/items/models/gear/quality';
import type { QualityDataModel } from '@/items/models/quality';

import { InfinityItemSheet, type SheetTabs } from './infinity-item';
import type { InfinityItem } from '../infinity-item';

type GearItem = InfinityItem<GearDataModel>;
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
			removeProgram: GearItemSheet.#removeProgram,
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

			case GearType.ExplosiveDevice:
				qualitiesPath = 'system.explosiveDevice.qualities';
				qualities = this.item.system.explosiveDevice.qualities;
				break;

			case GearType.Program:
				qualitiesPath = 'system.program.qualities';
				qualities = this.item.system.program.qualities;
				break;

			case GearType.Tool:
				qualitiesPath = 'system.tool.qualities';
				qualities = this.item.system.tool.qualities;
				break;

			case GearType.Weapon:
				qualitiesPath = 'system.weapon.qualities';
				qualities = this.item.system.weapon.qualities;
				break;

			case GearType.Other:
				qualitiesPath = 'system.other.qualities';
				qualities = this.item.system.other.qualities;
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
			explosiveDevice: await this.prepareExplosiveDeviceContext(),
			hackingDevice: await this.prepareHackingDeviceContext(),
			program: await this.prepareProgramContext(),
			tool: await this.prepareToolContext(),
			weapon: await this.prepareWeaponContext(),
			other: await this.prepareOtherContext(),

			qualitiesPath,

			LABELED_AMMUNITION_CATEGORIES,
			LABELED_ARMOUR_TYPES,
			LABELED_AUGMENTATION_CATEGORIES,
			LABELED_AUGMENTATION_TYPES,
			LABELED_EXPLOSIVE_CATEGORIES,
			LABELED_GEAR_TYPES,
			LABELED_ITEM_SIZES,
			LABELED_PROGRAM_TYPES,
			LABELED_WEAPON_TYPES,
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
	 * Prepares context for Explosive Device-type gear.
	 */
	async prepareExplosiveDeviceContext() {
		const qualities = await Promise.all(
			this.item.system.explosiveDevice.qualities.map(fetchQuality),
		);

		return {
			qualities,
		};
	}

	/**
	 * Prepares context for Hacking Device-type gear.
	 */
	async prepareHackingDeviceContext() {
		const preinstalledPrograms = await Promise.all(
			this.item.system.hackingDevice.preinstalledPrograms.map(async (uuid) => {
				const item = await fromUuid<GearItem>(uuid);
				if (!item || item.system.type !== GearType.Program) {
					return {
						uuid,
						valid: false,
					};
				}

				const description = await foundry.applications.ux.TextEditor.enrichHTML(
					item.system.description,
				);

				return {
					uuid,
					label: item.name,
					tooltip: description,
					valid: true,
				};
			}),
		);

		return {
			preinstalledPrograms,
		};
	}

	/**
	 * Prepares context for Program-type gear.
	 */
	async prepareProgramContext() {
		const qualities = await Promise.all(this.item.system.program.qualities.map(fetchQuality));

		return {
			qualities,
		};
	}

	/**
	 * Prepares context for Tool-type gear.
	 */
	async prepareToolContext() {
		const qualities = await Promise.all(this.item.system.tool.qualities.map(fetchQuality));

		return {
			qualities,
		};
	}

	/**
	 * Prepares context for Weapon-type gear.
	 */
	async prepareWeaponContext() {
		const qualities = await Promise.all(this.item.system.weapon.qualities.map(fetchQuality));

		return {
			showRangedFields: this.item.system.weapon.type === WeaponType.Ranged,
			qualities,
		};
	}

	/**
	 * Prepares context for Other Items-type gear.
	 */
	async prepareOtherContext() {
		const qualities = await Promise.all(this.item.system.other.qualities.map(fetchQuality));

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
		const item = await fromUuid<GearItem | QualityItem>(dropData.uuid);
		if (!item || !['quality', 'gear'].includes(item.type)) {
			ui.notifications.error(
				game.i18n.localize('Infinity.Sheets.Gear.QualitiesOnlyNotification'),
			);
			return;
		}

		switch (item.type) {
			case 'gear':
				await this.#onDropGear(item as GearItem);
				break;

			case 'quality':
				await this.#onDropQuality(item as QualityItem);
				break;
		}
	}

	/**
	 * Handles the dropping of a Gear item on an existing item sheet.
	 *
	 * Currently, only Programs are allowed to be dropped, and only onto sheets for Hacking Devices.
	 */
	async #onDropGear(item: GearItem) {
		if (
			item.system.type !== GearType.Program ||
			this.item.system.type !== GearType.HackingDevice
		) {
			ui.notifications.error(
				game.i18n.localize('Infinity.Sheets.Gear.QualitiesOnlyNotification'),
			);
			return;
		}

		// Don't allow the same program to be added multiple times.
		const programs = this.item.system.hackingDevice.preinstalledPrograms;
		if (programs.includes(item.uuid)) {
			ui.notifications.error(
				game.i18n.format(
					'Infinity.Sheets.Gear.HackingDevice.ProgramAlreadyAddedNotification',
					{
						name: item.name,
					},
				),
			);
			return;
		}

		// Add the program to the list of preinstalled programs.
		await this.item.update({
			'system.hackingDevice.preinstalledPrograms': [...programs, item.uuid],
		});
	}

	/**
	 * Handles the dropping of a Quality item on an existing item sheet.
	 */
	async #onDropQuality(item: QualityItem) {
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

	/**
	 * Event Handler: `data-action="removeProgram"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Removes the Preinstalled Program with the specified UUID from the sheet.
	 */
	static async #removeProgram(this: GearItemSheet, _event: Event, target: HTMLElement) {
		if (!this.isEditable) {
			return;
		}

		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return Promise.reject('Invalid data-uuid property.');
		}

		const newPrograms = [...this.item.system.hackingDevice.preinstalledPrograms];
		const index = newPrograms.findIndex((id) => id === uuid);
		if (index < 0) {
			return;
		}

		newPrograms.splice(index, 1);

		await this.item.update({
			'system.hackingDevice.preinstalledPrograms': newPrograms,
		});
	}
}
