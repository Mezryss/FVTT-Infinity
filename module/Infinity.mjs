import { registerItems } from './item/InfinityItem.mjs';

import { registerEnrichers } from './enrichers.mjs';
import { registerFonts } from './fonts.mjs';
import { registerHandlebars } from './handlebars.mjs';

import { Attribute } from './data/Attribute.mjs';
import { Skill } from './data/Skill.mjs';
import { AmmunitionCategory, ItemSize } from './data/Gear.mjs';

// Some items need to be direct-imported for Hook registrations.
import './apps/index.mjs';
import './handlebars.mjs';

Hooks.once('init', () => {
	console.debug('Infinity | Initializing...');

	// Document Registrations
	registerItems();

	// Misc. Registrations
	registerEnrichers();
	registerFonts();
	registerHandlebars();

	// Register classes that should be available for macros, modules, etc.
	CONFIG.Infinity = {
		Attributes: Attribute,
		Skills: Skill,
		ItemSize,
		AmmunitionCategory,
	};

	console.debug('Infinity | Initialization complete.');
});

// Add the prose class from Tailwind Typography to Journal text entries.
Hooks.on(
	'renderJournalTextPageSheet',
	/**
	 * @param _application
	 * @param html {JQuery}
	 * @param _data
	 */
	(_application, html, _data) => {
		$(html[2]).addClass('prose max-w-none prose-p:text-black');
	},
);
