import InfinityItem from './InfinityItem';

export function register() {
	// With the 'as any' cast here, we can assign InfinityItem even though it is technically abstract.
	CONFIG.Item.documentClass = InfinityItem as any;

	registerDataModels();
	registerSheets();
}

function registerDataModels() {}

function registerSheets() {}
