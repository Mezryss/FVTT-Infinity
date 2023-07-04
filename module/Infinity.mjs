import { registerEnrichers } from './enrichers.mjs';
import { registerFonts } from './fonts.mjs';
import { registerHandlebars } from './handlebars.mjs';

import {Attribute} from './data/Attribute.mjs';
import {Skill} from './data/Skill.mjs';

// Apps don't need to be manually registered, but some of them DO need to be direct-imported to trigger Hook registrations.
import './apps/index.mjs';

Hooks.once('init', async () => {
	console.group('Infinity | Initialization');

	// Misc. Registrations
	registerEnrichers();
	registerFonts();
	registerHandlebars();

	// Register classes that should be available for macros, modules, etc.
	CONFIG.Infinity = {
		Attributes: Attribute,
		Skills: Skill,
	};

	console.groupEnd();
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
