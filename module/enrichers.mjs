/**
 * Register TextEditor enrichers.
 */
export function registerEnrichers() {
	console.debug('Registering enrichers...');

	CONFIG.TextEditor.enrichers = [
		...CONFIG.TextEditor.enrichers,

		/**
		 * Infinity Icon Enrichers
		 */
		{
			pattern: /@(?<symbol>[CN])/gim,
			/**
			 *
			 * @param {RegExpMatchArray} match
			 */
			enricher: async (match) => {
				console.error(match);

				const container = document.createElement('span');
				container.className = 'font-infinity-icon';
				container.innerText = match.groups.symbol;

				return container;
			},
		}
	];
}
