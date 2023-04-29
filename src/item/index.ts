import InfinityItem from './InfinityItem';

/**
 * Handle registration for all Item-related documents and document sheets.
 */
export function register() {
	// With the 'as any' cast here, we can assign InfinityItem even though it is technically abstract.
	CONFIG.Item.documentClass = InfinityItem as any;

	registerDataModels();
	registerSheets();
}

/**
 * Register Item data model classes.
 */
function registerDataModels() {}

/**
 * Register Item sheet classes.
 */
function registerSheets() {}
