import { HandlebarsParts, SheetTabs } from '@/apps/sheets/handlebars-mixin';
import { PlayerCharacterDataModel } from '../models/player';
import { InfinityActorSheet } from './infinity-actor-sheet';

/**
 * Actor Sheet for Player Characters.
 */
export class PlayerCharacterActorSheet extends InfinityActorSheet<PlayerCharacterDataModel> {
	static PARTS: HandlebarsParts = {
		header: { template: 'systems/infinity/templates/sheets/actor/player/header.hbs' },
		tabs: { template: 'templates/generic/tab-navigation.hbs' },
		temp: { template: 'systems/infinity/templates/sheets/actor/player/temp.hbs' },
	};

	static TABS: SheetTabs = {
		primary: {
			tabs: [{ id: 'temp' }],
			initial: 'temp',
			labelPrefix: 'Infinity.Tabs',
		},
	};
}
