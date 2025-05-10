import { AbilityDataModel } from '@/items/models/ability';
import { HostDataModel } from '@/items/models/host';
import { InfinityItemSheet, type SheetTabs } from './infinity-item';
import type { HandlebarsParts } from '@/apps/sheets/handlebars-mixin';
import type { InfinityItem } from '../infinity-item';

type AbilityItem = InfinityItem<AbilityDataModel>;

/**
 * Utility method to fetch details about a Special Ability entry.
 */
async function fetchAbility(uuid: string) {
	const item = await fromUuid<AbilityItem>(uuid);
	if (!item) {
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
}

/**
 * Item Sheet for LHosts.
 */
export class HostItemSheet extends InfinityItemSheet<HostDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		actions: {
			removeAbility: HostItemSheet.#removeAbility,
		},
		window: {
			contentClasses: ['host'],
		},
	};

	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/item/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		description: { template: 'systems/infinity/templates/sheets/item/description.hbs' },
		detail: { template: 'systems/infinity/templates/sheets/item/host/detail.hbs' },
		effects: { template: 'systems/infinity/templates/sheets/item/effects.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [{ id: 'description' }, { id: 'detail' }, { id: 'effects' }],
			initial: 'description',
			labelPrefix: 'Infinity.Tabs',
		},
	};

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

		const specialAbilities = await Promise.all(
			this.item.system.specialAbilities.map(async (abil) => fetchAbility(abil)),
		);

		return {
			...baseContext,

			specialAbilities,
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
		const item = await fromUuid<AbilityItem>(dropData.uuid);
		if (!item || item.type !== 'ability') {
			ui.notifications.error(game.i18n.localize('Infinity.Sheets.Host.OnlyAbilities'));
			return;
		}

		// Don't allow the same ability to be added multiple times.
		const abilities = this.item.system.specialAbilities;
		if (abilities.includes(item.uuid)) {
			ui.notifications.error(
				game.i18n.format('Infinity.Sheets.Host.AbilityAlreadyAdded', {
					name: item.name,
				}),
			);
			return;
		}

		// Add the ability to the list.
		await this.item.update({
			'system.specialAbilities': [...abilities, item.uuid],
		});
	}

	/**
	 * Event Handler: `data-action="removeAbility"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Removes the Special Ability with the specified UUID
	 */
	static async #removeAbility(this: HostItemSheet, _event: Event, target: HTMLElement) {
		if (!this.isEditable) {
			return;
		}

		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return Promise.reject('Invalid data-uuid property.');
		}

		const newAbilities = [...this.item.system.specialAbilities];
		const index = newAbilities.findIndex((id) => id === uuid);
		if (index < 0) {
			return;
		}

		newAbilities.splice(index, 1);

		await this.item.update({
			'system.specialAbilities': newAbilities,
		});
	}
}
