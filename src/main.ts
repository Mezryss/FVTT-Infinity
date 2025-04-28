import { register as registerDice } from '@/dice';
import { register as registerTextEnrichers } from '@/text-enrichers';

import '@/styles/main.css';

Hooks.once('init', () => {
	console.log('Infinity | Init');

	registerDice();
	registerTextEnrichers();

	console.log('Infinity | Init Complete');
});
