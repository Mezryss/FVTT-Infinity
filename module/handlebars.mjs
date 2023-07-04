/**
 * Register all custom Handlebars items for the Infinity system.
 */
export function registerHandlebars() {
	console.debug('Registering Handlebars utilities...');

	monkeypatchEditor();
	registerHelpers();

	let _ = registerPartials();
}

function registerHelpers() {}

/**
 * Register global partials.
 */
async function registerPartials() {
	console.debug('Registering global partials...');

	await loadTemplates({
		...corePartial('sheet-base'),

		...corePartial('field'),
		...corePartial('linkable-text-field'),
		...corePartial('tab-bar'),
		...corePartial('tab-content'),
		...corePartial('tab-link'),
		...corePartial('title-box'),
	});
}

/**
 * Utility method to define a global partial. This will create a partial named "partials/{name}"
 *
 * @param {string} name Name of the partial to use.
 * @returns {{[p: string]: string}}
 */
function corePartial(name) {
	return {
		[`core/${name}`]: `systems/infinity/templates/partials/${name}.hbs`,
	};
}

/**
 * Monkey-patch the Handlebars editor partial to inject Tailwind styling.
 */
function monkeypatchEditor() {
	console.debug('🐒🔧 Monkey-patching Handlebars editor partial...');

	const oldMethod = HandlebarsHelpers.editor;

	HandlebarsHelpers.editor = function (...args) {
		const result = $(oldMethod(...args).toHTML());

		result.find('.editor-content').addClass('prose max-w-none prose-p:text-black');
		const html = result.prop('outerHTML');

		return new Handlebars.SafeString(html);
	};

	Handlebars.unregisterHelper('editor');
	Handlebars.registerHelper('editor', HandlebarsHelpers.editor);
}

/**
 * Foundry's base HBS hot-reload doesn't re-register our custom partials, so we should do that.
 * Also handle hot-reload for Momentum Tracker.
 */
Hooks.on(
	'hotReload',
	/**
	 * Handles special-case hot reload functionality to support reloading with our custom partial paths.
	 *
	 * @param {HotReloadData} data
	 * @returns {boolean} Whether to proceed with Foundry's handling of auto-reload
	 */
	(data) => {
		if (data.extension !== 'hbs') {
			return true;
		}

		let partialType = '';
		if (data.path.startsWith('systems/infinity/templates/partials')) {
			partialType = 'core';
		} else if (data.path.startsWith('systems/infinity/templates/actors/partials')) {
			partialType = 'actors';
		} else if (data.path.startsWith('systems/infinity/templates/items/partials')) {
			partialType = 'items';
		} else if (data.path.startsWith('systems/infinity/templates/items/sidebars')) {
			partialType = 'sidebars';
		}

		// (empty string is false-y)
		if (!partialType) {
			return true;
		}

		const splitPath = data.path.split('/');
		const templateName = splitPath[splitPath.length - 1].split('.')[0];

		// Compile the new template data.
		let template;
		try {
			template = Handlebars.compile(data.content);
		} catch (err) {
			return console.error(err);
		}

		// Re-register our new partial template & cache it.
		Handlebars.registerPartial(`${partialType}/${templateName}`, template);
		_templateCache[`${partialType}/${templateName}`] = template;

		// Re-render open windows
		for (const appId in ui.windows) {
			ui.windows[appId].render(true);
		}

		return false;
	},
);
