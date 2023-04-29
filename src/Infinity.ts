import { register as registerActors } from '@/actor';
import { register as registerItems } from '@/item';

import './Infinity.css';

Hooks.once('init', async () => {
	console.debug('Infinity | Initializing...');

	// System Documents
	registerActors();
	registerItems();

	// Misc. Modules

	console.debug('Infinity | Initialization Complete.');
});
