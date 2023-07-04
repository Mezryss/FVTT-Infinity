/**
 * Register all custom Handlebars items for the Infinity system.
 */
export function registerHandlebars() {
	monkeypatchEditor();
}

/**
 * Monkey-patch the Handlebars editor partial to inject Tailwind styling.
 */
function monkeypatchEditor() {
	console.debug('Infinity | Monkey-patching Handlebars editor partial...');

	const oldMethod = HandlebarsHelpers.editor;

	HandlebarsHelpers.editor = function (...args) {
		const result = $(oldMethod(...args).toHTML());

		result.find('.editor-content').addClass('prose max-w-none');
		const html = result.prop('outerHTML');

		return new Handlebars.SafeString(html);
	}

	Handlebars.unregisterHelper('editor');
	Handlebars.registerHelper('editor', HandlebarsHelpers.editor);

	console.debug('Infinity | Done Monkey-patching Handlebars editor partial.');
}
