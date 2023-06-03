import InfinityItem from '@/item/InfinityItem';
import { useActorStore } from '@/stores/actorStore';
import { useDocumentStore } from '@/stores/documentStore';

import InfinityActor from './InfinityActor';

/**
 * Base class for Actor sheets used by the system.
 */
export default class InfinityActorSheet<ActorDataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel, ItemDataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel> extends ActorSheet<
	InfinityActor<ActorDataModelType>,
	InfinityItem<ItemDataModelType>
> {
	static override get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['infinity', 'sheet', 'actor'],
		};
	}

	get documentUuid() {
		return this.actor.uuid;
	}

	async updateStores() {
		const uuid = this.actor.uuid;

		const documentStore = useDocumentStore(uuid);
		documentStore.document = this.actor;
		documentStore.editable = this.isEditable;

		const actorStore = useActorStore(uuid);
		actorStore.setActor(this.actor);
	}
}
