import { HandlebarsParts, SheetTabs } from '@/apps/sheets/handlebars-mixin';
import { PlayerCharacterDataModel } from '../models/player';
import { InfinityActorSheet } from './infinity-actor-sheet';
import { ALL_ATTRIBUTES } from '@/data/attributes';
import { SKILLS_BY_ATTRIBUTE } from '@/data/skills';
import { TalentDataModel } from '@/items/models/talent.ts';
import { TalentDisclosureElement, type ToggleCollapseEvent } from '@/elements/talent-disclosure.ts';
import { AbilityDataModel } from '@/items/models/ability.ts';
import { GearDataModel } from '@/items/models/gear.ts';
import { EQUIP_STATE_SORT_VALUE, EquipState, GearType, ProgramType } from '@/data/gear.ts';
import { InfinityItem } from '@/items/infinity-item.ts';
import { QualityDataModel } from '@/items/models/quality.ts';

type GearItem = InfinityItem<GearDataModel>;

/**
 * Actor Sheet for Player Characters.
 */
export class PlayerCharacterActorSheet extends InfinityActorSheet<PlayerCharacterDataModel> {
	static override DEFAULT_OPTIONS = <any>{
		actions: {
			decreaseQuantity: PlayerCharacterActorSheet.#decreaseQuantity,
			increaseQuantity: PlayerCharacterActorSheet.#increaseQuantity,
			toggleEquip: PlayerCharacterActorSheet.#toggleEquip,
		},
		window: {
			contentClasses: ['player'],
		},
	};

	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/actor/player/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		background: { template: 'systems/infinity/templates/sheets/actor/player/background.hbs' },
		combat: { template: 'systems/infinity/templates/sheets/actor/player/combat.hbs' },
		equipment: { template: 'systems/infinity/templates/sheets/actor/player/equipment.hbs' },
		skills: { template: 'systems/infinity/templates/sheets/actor/player/skills.hbs' },
		talents: { template: 'systems/infinity/templates/sheets/actor/player/talents.hbs' },
		effects: { template: 'systems/infinity/templates/sheets/actor/effects.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [
				{ id: 'skills' },
				{ id: 'combat' },
				{ id: 'talents' },
				{ id: 'equipment' },
				{ id: 'background' },
				{ id: 'effects' },
			],
			initial: 'skills',
			labelPrefix: 'Infinity.Tabs',
		},
	};

	/**
	 * After the Player actor sheet is rendered, we need to monitor talent disclosure elements for their toggleCollapse events,
	 * so that we can store the collapse/expanded state of the talent in the actor's flags to preserve state.
	 */
	override async _onRender(context: any, options: any) {
		await super._onRender(context, options);

		// Context menu for Equipment.
		this._createContextMenu(
			this._getEquipmentContextMenuOptions.bind(this),
			'.gear .item.name, .programs .item.name, .resources .item.name',
			<any>{
				fixed: true,
				hookName: 'EquipmentContextMenu',
			},
		);

		// Store state on toggleCollapse events from <talent-disclosure> elements.
		this.element
			.querySelectorAll<TalentDisclosureElement>('talent-disclosure')
			.forEach((talentDisclosure) => {
				talentDisclosure.addEventListener('toggleCollapse', (event: Event) => {
					const collapseEvent = event as ToggleCollapseEvent;
					const target = event.target as TalentDisclosureElement | null;
					const id = target?.dataset['id'];
					const type = target?.dataset['type'] ?? 'talent';
					if (!target || !id) {
						return;
					}

					// Have to use actor.update instead of setFlag, because setFlag doesn't have a way to prevent re-render.
					this.actor.update(
						{
							[`flags.infinity.${type}.${id}.expanded`]: !collapseEvent.collapsed,
						},
						{ render: false },
					);
				});
			});
	}

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		return {
			...baseContext,

			abilities: await this.prepareAbilities(),
			attributes: this.prepareAttributesAndSkills(),
			background: await this.prepareBackground(),
			equipment: await this.prepareEquipment(),
			talents: await this.prepareTalents(),
		};
	}

	_getEquipmentContextMenuOptions() {
		return [
			{
				name: 'Infinity.Sheets.Player.Equipment.ContextMenu.EquipItem',
				icon: '<i class="fas fa-fw fa-hand-fist"></i>',
				condition: (target: HTMLElement) => {
					const type = target.dataset['type'] as GearType;
					const state = target.dataset['state'];

					// Only certain equipment types can be Equipped.
					return (
						this.isEditable &&
						[
							GearType.Armour,
							GearType.HackingDevice,
							GearType.Weapon,
							GearType.Program,
						].includes(type) &&
						state !== EquipState.Equipped
					);
				},
				callback: this.#equipCallback.bind(this),
			},
			{
				name: 'Infinity.Sheets.Player.Equipment.ContextMenu.DropItem',
				icon: '<i class="fas fa-fw fa-transporter-empty"></i>',
				condition: (target: HTMLElement) => {
					const type = target.dataset['type'] as GearType;
					const state = target.dataset['state'];

					// Programs cannot be dropped.
					return (
						this.isEditable &&
						![GearType.Program, GearType.Resource].includes(type) &&
						state !== EquipState.Dropped
					);
				},
				async callback(target: HTMLElement) {
					const uuid = target.dataset['uuid'];
					if (!uuid) {
						return;
					}

					const item = await fromUuid<InfinityItem>(uuid);
					await item?.update({
						'system.state': EquipState.Dropped,
					});
				},
			},
			{
				name: 'Infinity.Sheets.Player.Equipment.ContextMenu.CarryItem',
				icon: '<i class="fas fa-fw fa-suitcase"></i>',
				condition: (target: HTMLElement) => {
					const state = target.dataset['state'];

					return this.isEditable && state !== EquipState.Carried;
				},
				async callback(target: HTMLElement) {
					const uuid = target.dataset['uuid'];
					if (!uuid) {
						return;
					}

					const item = await fromUuid<InfinityItem>(uuid);
					await item?.update({
						'system.state': EquipState.Carried,
					});
				},
			},
			{
				name: 'Infinity.Sheets.Player.Equipment.ContextMenu.Edit',
				icon: '<i class="fas fa-fw fa-edit"></i>',
				async callback(target: HTMLElement) {
					const uuid = target.dataset['uuid'];
					if (!uuid) {
						return;
					}

					const item = await fromUuid<InfinityItem>(uuid);
					await item?.sheet?.render(<any>{ force: true });
				},
			},
			{
				name: 'Infinity.Sheets.Player.Equipment.ContextMenu.Delete',
				icon: '<i class="fas fa-fw fa-trash"></i>',
				condition: () => this.isEditable,
				async callback(target: HTMLElement) {
					const uuid = target.dataset['uuid'];
					if (!uuid) {
						return;
					}

					const item = await fromUuid<InfinityItem>(uuid);
					await item?.delete();
				},
			},
		];
	}

	async #equipCallback(target: HTMLElement) {
		const uuid = target.dataset['uuid'];
		const type = target.dataset['type'];
		if (!uuid) {
			return;
		}

		if (type === GearType.HackingDevice) {
			// Find other equipped Hacking Devices
			const equippedHackingDevices = (this.actor.itemTypes.gear as GearItem[]).filter(
				(g) =>
					g.system.type === GearType.HackingDevice &&
					g.system.state == EquipState.Equipped,
			);

			equippedHackingDevices.map(async (device) => {
				await device.update({ 'system.state': EquipState.Carried });
			});
		}

		const item = await fromUuid<InfinityItem>(uuid);
		await item?.update({
			'system.state': EquipState.Equipped,
		});
	}

	/**
	 * Prepare structured data for Attributes & their associated Skills for display on the character sheet.
	 */
	prepareAttributesAndSkills() {
		return ALL_ATTRIBUTES.map((attrib) => {
			const attribValue = this.actor.system.attributes[attrib];

			return {
				name: game.i18n.localize(`Infinity.Attributes.${attrib}`),
				field: `system.attributes.${attrib}`,
				value: attribValue,
				skills: SKILLS_BY_ATTRIBUTE[attrib].map((skill) => {
					return {
						name: game.i18n.localize(`Infinity.Skills.${skill}`),
						field: `system.skills.${skill}.`,
						signature: this.actor.system.skills[skill].signature,
						exp: this.actor.system.skills[skill].expertise,
						foc: this.actor.system.skills[skill].focus,
						tn: attribValue + this.actor.system.skills[skill].expertise,
					};
				}),
			};
		});
	}

	/**
	 * Prepared structured data for Background information.
	 */
	async prepareBackground() {
		const enriched = await foundry.applications.ux.TextEditor.enrichHTML(
			this.actor.system.background,
		);

		const fakeIDs = this.actor.itemTypes.gear.filter(
			(g) => (g.system as GearDataModel).type === GearType.FakeID,
		);
		const lifestyles = this.actor.itemTypes.gear.filter(
			(g) => (g.system as GearDataModel).type === GearType.Lifestyle,
		);

		return {
			enriched,
			fakeIDs,
			lifestyles,
		};
	}

	/**
	 * Prepare equipment data context.
	 */
	async prepareEquipment() {
		const gear = (this.actor.itemTypes.gear as GearItem[])
			.filter(
				(g) =>
					![
						// None of these items should ever show up in the Gear section
						GearType.Lifestyle,
						GearType.FakeID,
						GearType.Program,
						GearType.Resource,
					].includes(g.system.type),
			)
			.sort((a, b) => {
				return (
					EQUIP_STATE_SORT_VALUE[a.system.state] - EQUIP_STATE_SORT_VALUE[b.system.state]
				);
			});

		const resources = this.actor.itemTypes.gear.filter(
			(g) => (g.system as GearDataModel).type === GearType.Resource,
		);

		const hackingDevice = (this.actor.itemTypes.gear as GearItem[]).find(
			(g) =>
				g.system.type === GearType.HackingDevice && g.system.state === EquipState.Equipped,
		);

		// Fetch all programs.
		let programs = (this.actor.itemTypes.gear as GearItem[]).filter(
			(g) => g.system.type === GearType.Program,
		);

		// Populate some additional data on the programs.
		programs = await Promise.all(
			programs.map(async (program) => {
				// Track whether we want to show the program rating.
				if (program.system.program.rating !== '—') {
					// What is the program effectively rated at?
					let rating = +program.system.program.rating;
					let showRating = true;
					if (isNaN(rating)) {
						showRating = false;
					} else if (hackingDevice) {
						// If there is an equipped hacking device, limit the effective rating of a program by the corresponding rating on the device.
						let deviceRating = 1000;

						switch (program.system.program.type) {
							case ProgramType.CLAW:
								deviceRating = hackingDevice.system.hackingDevice.claw;
								break;

							case ProgramType.IC:
								deviceRating = hackingDevice.system.hackingDevice.ic;
								break;

							case ProgramType.GADGET:
								deviceRating = hackingDevice.system.hackingDevice.gadget;
								break;

							case ProgramType.SHIELD:
								deviceRating = hackingDevice.system.hackingDevice.shield;
								break;

							case ProgramType.SWORD:
								deviceRating = hackingDevice.system.hackingDevice.sword;
								break;

							default:
								break;
						}

						rating = Math.min(rating, deviceRating);
					}

					Object.assign(program, {
						showRating,
						rating,
					});
				} else {
					Object.assign(program, { showRating: false });
				}

				// Populate data on the program's Qualities.
				const qualities = await Promise.all(
					program.system.program.qualities.map(async ({ uuid, rank }) => {
						const quality = await fromUuid<InfinityItem<QualityDataModel>>(uuid);

						if (!quality) {
							return { valid: false };
						} else {
							const tooltip = await foundry.applications.ux.TextEditor.enrichHTML(
								quality.system.description,
								<any>{ rank },
							);
							return {
								valid: true,
								label: quality.system.abbreviation || quality.name,
								ranked: quality.system.ranked,
								rank,
								tooltip,
							};
						}
					}),
				);

				// Populate a tooltip with the program's description for ease of reference
				const tooltip = await foundry.applications.ux.TextEditor.enrichHTML(
					program.system.description,
				);

				Object.assign(program, { qualities, tooltip });

				return program;
			}),
		);

		// Sort the list of programs by equip state.
		programs = programs.sort((a, b) => {
			return EQUIP_STATE_SORT_VALUE[a.system.state] - EQUIP_STATE_SORT_VALUE[b.system.state];
		});

		return {
			gear,
			hackingDevice,
			resources,
			programs,
		};
	}

	/**
	 * Prepare special abilities data context, injecting enriched description text and expanded state.
	 */
	async prepareAbilities() {
		return await Promise.all(
			this.actor.itemTypes.ability.map(async (ability) => {
				const system = ability.system as AbilityDataModel;
				const enrichedDescription = await foundry.applications.ux.TextEditor.enrichHTML(
					system.description,
				);

				const expandedFlag = this.actor.getFlag(
					'infinity',
					`ability.${ability.id}.expanded`,
				);

				Object.assign(ability, {
					enrichedDescription,
					expanded: !!expandedFlag,
				});

				return ability;
			}),
		);
	}

	/**
	 * Prepare talents data, sorted by skills, for use in the character sheet.
	 */
	async prepareTalents() {
		return Promise.all(
			Array.from(
				new Set(this.actor.itemTypes.talent.map((t) => (<TalentDataModel>t.system).skill)),
			)
				.sort()
				.map(async (skill) => {
					const talents = await Promise.all(
						this.actor.itemTypes.talent
							.filter((t) => (<TalentDataModel>t.system).skill === skill)
							.map(async (talent) => {
								const system = talent.system as TalentDataModel;
								const enrichedDescription =
									await foundry.applications.ux.TextEditor.enrichHTML(
										system.description,
										<any>{ rank: system.ranks },
									);

								const expandedFlag = this.actor.getFlag(
									'infinity',
									`talent.${talent.id}.expanded`,
								);

								Object.assign(talent, {
									enrichedDescription,
									expanded: !!expandedFlag,
								});

								return talent;
							}),
					);

					return {
						skill: game.i18n.localize(`Infinity.Skills.${skill}`),
						talents,
					};
				}),
		);
	}

	/**
	 * Event Handler: `data-action="toggleEquip"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Attempts to adjust the current equip state of the specified item.
	 */
	static async #toggleEquip(this: PlayerCharacterActorSheet, _event: Event, target: HTMLElement) {
		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return;
		}

		const item = this.actor.items.find((i) => i.uuid === uuid) as
			| InfinityItem<GearDataModel>
			| undefined;
		if (!item) {
			return;
		}

		let newState = EquipState.Carried;

		switch (item.system.state) {
			case EquipState.Equipped:
				newState = EquipState.Carried;
				break;

			case EquipState.Carried:
				// Programs are either Carried or Equipped, never dropped.
				if (item.system.type === GearType.Program) {
					newState = EquipState.Equipped;
				} else {
					newState = EquipState.Dropped;
				}
				break;

			case EquipState.Dropped:
				// Only certain types of items can be Equipped. All others are simply carried.
				if (
					[
						GearType.Armour,
						GearType.HackingDevice,
						GearType.Program,
						GearType.Weapon,
					].includes(item.system.type)
				) {
					if (item.system.type === GearType.HackingDevice) {
						// Find other equipped Hacking Devices
						const equippedHackingDevices = (
							this.actor.itemTypes.gear as GearItem[]
						).filter(
							(g) =>
								g.system.type === GearType.HackingDevice &&
								g.system.state == EquipState.Equipped,
						);

						await Promise.all(
							equippedHackingDevices.map(async (device) => {
								await device.update({ 'system.state': EquipState.Carried });
							}),
						);
					}

					newState = EquipState.Equipped;
				} else {
					newState = EquipState.Carried;
				}
				break;
		}

		await item.update({
			'system.state': newState,
		});
	}

	/**
	 * Event Handler: `data-action="increaseQuantity"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Attempts to increase the current quantity of the specified item.
	 */
	static async #increaseQuantity(
		this: PlayerCharacterActorSheet,
		_event: Event,
		target: HTMLElement,
	) {
		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return;
		}

		const item = this.actor.items.find((i) => i.uuid === uuid) as
			| InfinityItem<GearDataModel>
			| undefined;
		if (!item) {
			return;
		}

		await item.update({
			'system.quantity': item.system.quantity + 1,
		});
	}

	/**
	 * Event Handler: `data-action="decreaseQuantity"`
	 * Requires `data-uuid="..."` data property.
	 *
	 * Attempts to decrease the current quantity of the specified item.
	 */
	static async #decreaseQuantity(
		this: PlayerCharacterActorSheet,
		_event: Event,
		target: HTMLElement,
	) {
		const uuid = target.dataset['uuid'];
		if (!uuid) {
			return;
		}

		const item = this.actor.items.find((i) => i.uuid === uuid) as
			| InfinityItem<GearDataModel>
			| undefined;
		if (!item) {
			return;
		}

		await item.update({
			'system.quantity': Math.max(0, item.system.quantity - 1),
		});
	}
}
