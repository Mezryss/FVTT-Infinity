/**
 * Item Size Categories.
 *
 * See Core Rulebook, pp.332-333 for mechanical impacts which need to be implemented.
 */
enum ItemSize {
	/**
	 * Insignificant is for items without a Size rating, so there's no special case needed for a null field.
	 */
	Insignificant = 'Insignificant',

	OneHanded = 'OneHanded',
	TwoHanded = 'TwoHanded',
	Unbalanced = 'Unbalanced',
	Unwieldy = 'Unwieldy',
	Mounted = 'Mounted',
	Massive = 'Massive',
	Facility = 'Facility',
}

namespace ItemSize {
	/**
	 * Convenience accessor for all Item sizes.
	 */
	export const all: ItemSize[] = [ItemSize.Insignificant, ItemSize.OneHanded, ItemSize.TwoHanded, ItemSize.Unbalanced, ItemSize.Unwieldy, ItemSize.Mounted, ItemSize.Massive, ItemSize.Facility];
}

export default ItemSize;
