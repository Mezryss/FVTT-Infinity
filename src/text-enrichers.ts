/**
 * Register all custom text enrichers.
 */
export function register() {
	CONFIG.TextEditor.enrichers.push(
		{
			pattern: /@(N|combat(-die)?)/gi,
			async enricher(_match, _options) {
				const span = document.createElement('span');
				span.classList.add('icon-combat-die');
				span.innerText = 'N';
				return span;
			},
		},
		{
			pattern: /@X/gi,
			async enricher(_match, options: { rank?: number }) {
				let rankText = 'X';

				if (options.rank !== undefined) {
					rankText = `${options.rank}`;
				}

				const span = document.createElement('span');
				span.innerText = rankText;
				return span;
			},
		},
	);
}
