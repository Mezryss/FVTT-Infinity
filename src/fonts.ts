/**
 * Build a shared font definition structure.
 *
 * @param path Path to the font file, including extension, within the assets/fonts/ folder.
 * @param style Font style
 * @param weight Font weights
 */
function buildDefinition(
	path: string,
	style: 'normal' | 'italic' = 'normal',
	weight: string = '400',
): CONFIG.FontDefinition {
	return {
		urls: [`systems/infinity/fonts/${path}`],
		style,
		weight,
	};
}

export function register() {
	CONFIG.fontDefinitions['Orbitron'] = {
		editor: true,
		fonts: [buildDefinition('Orbitron/Orbitron-VariableFont_wght.ttf', 'normal', '100 900')],
	};
}
