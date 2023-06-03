import { createPinia } from 'pinia';

import InfinityItem from './item/InfinityItem';
import { useItemStore } from './stores/itemStore';

export namespace StoreManager {
	export const instance = createPinia();
}

function updateItemStore(item: Item) {
	const itemStore = useItemStore(item.uuid);
	itemStore.setItem(item as InfinityItem);
}

Hooks.on('createActor', (...args: any[]) => {
	console.warn('CREATE ACTOR');
	console.log(args);
});

Hooks.on('updateActor', (...args: any[]) => {
	console.warn('UPDATE ACTOR');
	console.log(args);
});

Hooks.on('deleteActor', (...args: any[]) => {
	console.warn('DELETE ACTOR');
	console.log(args);
});

Hooks.on('createItem', updateItemStore);
Hooks.on('updateItem', updateItemStore);
Hooks.on('deleteItem', (item: Item) => {
	const itemStore = useItemStore(item.uuid);
	itemStore.setItem(null);
});

Hooks.on('updateCompendium', (...args: any[]) => {
	console.warn('UPDATING COMPENDIUM');
	console.log(args);
});
