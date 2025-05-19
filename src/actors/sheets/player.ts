import { HandlebarsParts, SheetTabs } from '@/apps/sheets/handlebars-mixin';
import { PlayerCharacterDataModel } from '../models/player';
import { InfinityActorSheet } from './infinity-actor-sheet';
import { ALL_ATTRIBUTES } from '@/data/attributes';
import { SKILLS_BY_ATTRIBUTE } from '@/data/skills';
import { TalentDataModel } from '@/items/models/talent.ts';
import { TalentDisclosureElement, type ToggleCollapseEvent } from '@/elements/talent-disclosure.ts';
import { AbilityDataModel } from '@/items/models/ability.ts';

/**
 * Actor Sheet for Player Characters.
 */
export class PlayerCharacterActorSheet extends InfinityActorSheet<PlayerCharacterDataModel> {
	static override DEFAULT_OPTIONS = <any>{
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
		effects: { template: 'systems/infinity/templates/sheets/actor/effects.hbs' }
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
			talents: await this.prepareTalents(),
		};
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
}
