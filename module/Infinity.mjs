import { registerHandlebars } from './handlebars.mjs';

Hooks.once('init', async () => {
	console.debug('Infinity | Initializing...');

	// Misc. Registrations
	registerHandlebars();

	// Register classes that should be available for macros, modules, etc.
	CONFIG.Infinity = {};

	console.debug('Infinity | Initialization Complete.');
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
		$(html[2]).addClass('prose max-w-none');
	},
);
