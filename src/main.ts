import { register as registerDice } from '@/dice';
import { register as registerFonts } from '@/fonts';
import { register as registerItems } from '@/items';
import { register as registerSettings } from '@/settings';
import { register as registerSockets } from '@/socket';
import { register as registerTextEnrichers } from '@/text-enrichers';

import '@/apps';

import '@styles/main.css';

Hooks.once('init', () => {
	console.log('Infinity | Init');

	registerDice();
	registerFonts();
	registerSettings();
	registerSockets();
	registerTextEnrichers();

	registerItems();

	registerPartials();

	console.log('Infinity | Init Complete');
});

async function registerPartials() {
	await foundry.applications.handlebars.loadTemplates({
		gearQualities: 'systems/infinity/templates/sheets/item/gear/qualities-list.hbs',
	});
}
