import { TalentDataModel } from '@/items/models/talent';
import { InfinityItemSheet, type SheetTabs } from './infinity-item';
import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin';
import { LABELED_SKILLS, localizeSkill } from '@/data/skills';
import { InfinityItem } from '../infinity-item';

/**
 * Item Sheet for Talents.
 */
export class TalentItemSheet extends InfinityItemSheet<TalentDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		actions: {
			removeTalent: TalentItemSheet.#removeTalent,
		},
		window: {
			contentClasses: ['talent'],
		},
	};

	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/item/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		description: { template: 'systems/infinity/templates/sheets/item/talent/description.hbs' },
		detail: { template: 'systems/infinity/templates/sheets/item/talent/detail.hbs' },
		effects: { template: 'systems/infinity/templates/sheets/item/effects.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [{ id: 'description' }, { id: 'detail' }, { id: 'effects' }],
			initial: 'description',
			labelPrefix: 'Infinity.Tabs',
		},
	};

	/**
	 * Type Label - "<Skill> Talent"
	 */
	override get typeLabel() {
		return game.i18n.format(`Infinity.Sheets.Item.Label.Talent`, {
			skill: localizeSkill(this.item.system.skill),
		});
	}

	/**
	 * Add a DragDrop handler to support dropping other talents on this sheet as a prerequisite.
	 */
	override async _onRender(
		context: any,
		options: foundry.applications.types.ApplicationRenderOptions,
	) {
		await super._onRender(context, options);

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

		// Fetch information about the prerequisite talent.
		let prereqTalent: InfinityItem<TalentDataModel> | null = null;
		if (this.item.system.prerequisiteTalentUuid) {
			prereqTalent = await fromUuid<InfinityItem<TalentDataModel>>(
				this.item.system.prerequisiteTalentUuid,
			);
		}

		return {
			...baseContext,

			localizedSkillName: localizeSkill(this.item.system.skill),
			prereqTalent,
			showPrerequisite: prereqTalent !== null || this.item.system.prerequisiteSkillRanks > 0,
			showMaximumRanks: this.item.system.maximumRanks > 1,

			LABELED_SKILLS,
		};
	}

	/**
	 * Event Handler when the user chooses to remove the prerequisite talent.
	 */
	static async #removeTalent(this: InfinityItemSheet) {
		if (!this.isEditable) {
			return;
		}

		await this.item.update({
			'system.prerequisiteTalentUuid': null,
		});
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

		// Fetch the dropped item to validate it's a talent.
		const item = await fromUuid<InfinityItem<TalentDataModel>>(dropData.uuid);
		if (!item || item.type !== 'talent') {
			ui.notifications.error(
				game.i18n.localize('Infinity.Sheets.Talent.TalentsOnlyNotification'),
			);
			return;
		}

		if (
			item.uuid === this.item.uuid ||
			item.name.toLowerCase().trim() === this.item.name.toLowerCase().trim()
		) {
			ui.notifications.error(
				game.i18n.localize('Infinity.Sheets.Talent.SameTalentNotification'),
			);
			return;
		}

		await this.item.update({
			'system.prerequisiteTalentUuid': item.uuid,
		});
	}
}
