import type { ItemType } from '.';
import type { InfinityItemDataModel } from './models/infinity-item';
import type { InfinityItemSheet } from './sheets/infinity-item';

const { Item } = foundry.documents;

/**
 * Customized class for handling Items in Infinity.
 */
export class InfinityItem<
	DataModelType extends InfinityItemDataModel = InfinityItemDataModel,
> extends Item {
	/**
	 * Item Flags.
	 */
	readonly flags!: Record<string, Record<string, unknown>>;

	/**
	 * File path for the item's icon image.
	 */
	readonly img!: string;

	/**
	 * Name of the Item document.
	 */
	readonly name!: string;

	/**
	 * The Item's Sheet.
	 */
	readonly sheet!: InfinityItemSheet;

	/**
	 * System details for the Item document.
	 */
	readonly system!: DataModelType;

	/**
	 * Item type.
	 */
	readonly type!: ItemType;
}
