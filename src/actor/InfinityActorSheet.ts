import InfinityItem from '@/item/InfinityItem';
import InfinityActor from './InfinityActor';

export default class InfinityActorSheet<
	ActorDataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel,
	ItemDataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel,
> extends ActorSheet<
	InfinityActor<ActorDataModelType>,
	InfinityItem<ItemDataModelType>
> {
	static override get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['infinity', 'sheet', 'actor'],
		};
	}
}
