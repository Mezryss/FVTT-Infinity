import { register as registerDice } from '@/dice';
import { register as registerFonts } from '@/fonts';
import { register as registerItems } from '@/items';
import { register as registerTextEnrichers } from '@/text-enrichers';

import '@/styles/main.css';

Hooks.once('init', () => {
	console.log('Infinity | Init');

	registerDice();
	registerFonts();
	registerTextEnrichers();

	registerItems();

	console.log('Infinity | Init Complete');
});
