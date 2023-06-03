import { createPinia } from 'pinia';

import InfinityActor from './actor/InfinityActor';
import InfinityItem from './item/InfinityItem';
import { useActorStore } from './stores/actorStore';
import { useItemStore } from './stores/itemStore';

export namespace StoreManager {
	export const instance = createPinia();
}

function updateItemStore(item: Item) {
	const itemStore = useItemStore(item.uuid);
	itemStore.setItem(item as InfinityItem);
}

function updateActorStore(actor: Actor) {
	const actorStore = useActorStore(actor.uuid);
	actorStore.setActor(actor as InfinityActor);
}

Hooks.on('createActor', updateActorStore);
Hooks.on('updateActor', updateActorStore);
Hooks.on('deleteActor', (actor: Actor) => {
	const actorStore = useActorStore(actor.uuid);
	actorStore.setActor(null);
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
