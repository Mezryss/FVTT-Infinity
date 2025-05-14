import { HandlebarsParts, SheetTabs } from '@/apps/sheets/handlebars-mixin';
import { PlayerCharacterDataModel } from '../models/player';
import { InfinityActorSheet } from './infinity-actor-sheet';
import { ALL_ATTRIBUTES } from '@/data/attributes';
import { SKILLS_BY_ATTRIBUTE } from '@/data/skills';

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
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [
				{ id: 'skills' },
				{ id: 'combat' },
				{ id: 'talents' },
				{ id: 'equipment' },
				{ id: 'background' },
			],
			initial: 'skills',
			labelPrefix: 'Infinity.Tabs',
		},
	};

	override async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		/**
		 * Consolidate Attribute & Skills Data.
		 */
		const attributes = ALL_ATTRIBUTES.map(attrib => {
			const attribValue = this.actor.system.attributes[attrib];

			return {
				name: game.i18n.localize(`Infinity.Attributes.${attrib}`),
				field: `system.attributes.${attrib}`,
				value: attribValue,
				skills: SKILLS_BY_ATTRIBUTE[attrib].map(skill => {
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

		return {
			...baseContext,

			attributes,
		};
	}
}
