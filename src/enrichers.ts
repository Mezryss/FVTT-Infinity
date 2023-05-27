/**
 * Registers all TextEditor enrichers.
 */
export function register() {
	CONFIG.TextEditor.enrichers = [
		...CONFIG.TextEditor.enrichers,

		/**
		 * Infinity Icons
		 */
		{
			pattern: /@(?<symbol>[CN])/gim,
			enricher: async (match, _) => {
				const container = document.createElement('span');
				container.className = 'font-infinity-icon';
				container.innerText = match.groups!['symbol'];

				return container;
			},
		},
	];
}
