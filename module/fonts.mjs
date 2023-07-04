/**
 * Build a shared font definition structure.
 *
 * @param path {string} Path to the font file, including extension, within the assets/fonts/ folder.
 * @param style {'normal'|'italic'} Font Style
 * @param weight {string} Font weights
 */
function buildDefinition(path, style = 'normal', weight = '400') {
	return {
		urls: [`systems/infinity/fonts/${path}`],
		style,
		weight,
	};
}

/**
 * Register system fonts that should be available in the ProseMirror editor.
 *
 * This currently includes Orbitron and Roboto Flex. Icons used by the system should instead be applied with enrichers.
 */
export function registerFonts() {
	console.debug('Registering fonts...');

	CONFIG.fontDefinitions['Orbitron'] = {
		editor: true,
		fonts: [buildDefinition('Orbitron/Orbitron-VariableFont_wght.ttf', 'normal', '400 900')],
	};

	CONFIG.fontDefinitions['Roboto Flex'] = {
		editor: true,
		fonts: [
			buildDefinition('RobotoFlex/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf', 'normal', '100 1000'),
			buildDefinition('RobotoFlex/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf', 'italic', '100 1000'),
		],
	};
}
