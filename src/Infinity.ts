import { register as registerActors } from '@/actor';
import { register as registerItems } from '@/item';

import './Infinity.css';

Hooks.once('init', async () => {
	console.debug('Infinity | Initializing...');

	// By default, foundry.abstract.DataModel.defineSchema is coded to throw an error to remind developers to override it.
	// However, this messes up defineSchema() chaining in template mixins, so we'll scrap that behavior.
	foundry.abstract.DataModel.defineSchema = () => ({});

	// System Documents
	registerActors();
	registerItems();

	console.debug('Infinity | Initialization Complete.');
});
