/**
 * Constructs a labeled enum constant for use with the selectOptions handlebars helper.
 *
 * @param locCategory Category the enum labels appear under in the localization file.
 * @param key This is the actual value the select option will use, as well as what key in the localization file is used for its label.
 */
export function labeledEnum(locCategory: string, key: string) {
	return {
		key,
		label: `Infinity.${locCategory}.${key}`,
	};
}
