import { HandlebarsParts, SheetTabs } from '@/apps/sheets/handlebars-mixin';
import { PlayerCharacterDataModel } from '../models/player';
import { InfinityActorSheet } from './infinity-actor-sheet';
import { TalentDisclosureElement, type ToggleCollapseEvent } from '@/elements/talent-disclosure.ts';

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
}
