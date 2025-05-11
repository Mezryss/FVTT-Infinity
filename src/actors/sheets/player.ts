import { HandlebarsParts, SheetTabs } from '@/apps/sheets/handlebars-mixin';
import { PlayerCharacterDataModel } from '../models/player';
import { InfinityActorSheet } from './infinity-actor-sheet';

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
}
