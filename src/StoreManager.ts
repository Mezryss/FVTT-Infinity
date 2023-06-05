import { createPinia } from 'pinia';

import InfinityActor from './actor/InfinityActor';
import InfinityItem from './item/InfinityItem';
import { useActorStore } from './stores/actorStore';
import { useItemStore } from './stores/itemStore';

export namespace StoreManager {
	/**
	 * Shared Pinia instance used to track documents.
	 */
	export const instance = createPinia();

	/**
	 * Tracks whether the Pinia instance has been properly initialized with a Vue app.
	 *
	 * Set by the VueSheet mixin.
	 */
	// eslint-disable-next-line
	export let initialized = false;
}

function updateItemStore(item: Item, deleted = false) {
	if (!StoreManager.initialized) {
		return;
	}

	const itemStore = useItemStore(item.uuid);
	itemStore.setItem(deleted ? null : (item as InfinityItem));

	// Foundry won't fire an updateActor hook for create/delete/update events on embedded items.
	if (item.parent instanceof Actor) {
		updateActorStore(item.parent);
	}
}

function updateActorStore(actor: Actor, deleted = false) {
	if (!StoreManager.initialized) {
		return;
	}

	const actorStore = useActorStore(actor.uuid);
	actorStore.setActor(deleted ? null : (actor as InfinityActor));
}

Hooks.on('createActor', (actor: Actor) => updateActorStore(actor));
Hooks.on('updateActor', (actor: Actor) => updateActorStore(actor));
Hooks.on('deleteActor', (actor: Actor) => updateActorStore(actor, true));

Hooks.on('createItem', (item: Item) => updateItemStore(item));
Hooks.on('updateItem', (item: Item) => updateItemStore(item));
Hooks.on('deleteItem', (item: Item) => updateItemStore(item, true));

Hooks.on('updateCompendium', (...args: any[]) => {
	console.warn('UPDATING COMPENDIUM');
	console.log(args);
});
