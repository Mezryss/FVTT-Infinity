import { register as registerActors } from '@/actor';
import { register as registerEnrichers } from '@/enrichers';
import { register as registerFonts } from '@/fonts';
import { register as registerItems } from '@/item';
import { register as registerSettings } from '@/settings';

import './apps';
import './socket';
import './StoreManager';

import './Infinity.css';

Hooks.once('init', async () => {
	console.debug('Infinity | Initializing...');

	// By default, foundry.abstract.DataModel.defineSchema is coded to throw an error to remind developers to override it.
	// However, this messes up defineSchema() chaining in template mixins, so we'll scrap that behavior.
	foundry.abstract.DataModel.defineSchema = () => ({});

	// System Documents
	registerActors();
	registerItems();

	// Misc. Modules
	registerEnrichers();
	registerFonts();
	registerSettings();

	console.debug('Infinity | Initialization Complete.');
});
