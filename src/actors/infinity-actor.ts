import { InfinityItem } from '@/items/infinity-item';
import { ItemType } from '@/items';

import type { ActorType } from '.';
import type { InfinityActorDataModel } from './models/infinity-actor';

const { Actor } = foundry.documents;

/**
 * Customized base class for Actors in Infinity
 */
export class InfinityActor<
	DataModelType extends InfinityActorDataModel = InfinityActorDataModel,
> extends Actor {
	/**
	 * Actor Flags.
	 */
	readonly flags!: Record<string, Record<string, unknown>>;

	/**
	 * File path for the actor's icon image.
	 */
	readonly img!: string;

	/**
	 * Name of the Item document.
	 */
	readonly name!: string;

	/**
	 * System details for the Actor document.
	 */
	readonly system!: DataModelType;

	/**
	 * Actor type.
	 */
	readonly type!: ActorType;

	/**
	 * Items owned by the Actor.
	 */
	readonly items!: InfinityItem[];

	/**
	 * Provide a more strongly-typed ItemTypes accessor.
	 */
	override get itemTypes(): Record<ItemType, InfinityItem[]> {
		return super.itemTypes as Record<ItemType, InfinityItem[]>;
	}
}
