/**
 * Build a shared font definition structure.
 *
 * @param path Path to the font file, including extension, within the assets/fonts/ folder.
 * @param style Font style
 * @param weight Font weights
 */
function buildDefinition(path: string, style: 'normal' | 'italic' = 'normal', weight: string = '400'): FontDefinition {
	return {
		urls: [`systems/infinity/assets/fonts/${path}`],
		style,
		weight,
	};
}

/**
 * Registers all fonts that should be made available to the text editor.
 */
export function register() {
	CONFIG.fontDefinitions['Infinity Icons'] = {
		editor: true,
		fonts: [buildDefinition('InfinityIcons/InfinityIcons.ttf', 'normal', '400')],
	};

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
