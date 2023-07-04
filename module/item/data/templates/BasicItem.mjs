const fields = foundry.data.fields;

/**
 * Data model template mixin providing a Description and Source field.
 *
 * @mixin
 * @property {string} description User-friendly rich-text string describing the item.
 * @property {string} source User-friendly string with the source of the item, usually a rulebook page reference or Journal UUID.
 */
const BasicItem = () => ({
	description: new fields.HTMLField({
		initial: '',
		nullable: false,
	}),
	source: new fields.StringField({
		initial: 'Core Rulebook',
		nullable: false,
	}),
});

export default BasicItem;
