/**
 * Register all custom text enrichers.
 */
export function register() {
	CONFIG.TextEditor.enrichers.push({
		pattern: /@(N|combat(-die)?)/gi,
		async enricher(_match, _options) {
			const span = document.createElement('span');
			span.classList.add('icon-combat-die');
			span.innerText = 'N';
			return span;
		},
	});
}
