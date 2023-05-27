import InfinityActor from './actor/InfinityActor';
import InfinityItem from './item/InfinityItem';

/**
 * Base type for all SheetContexts used by Item document sheets.
 */
export default interface IBaseSheetContext<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel, ActionsType = never> {
	/**
	 * An optional set of function callbacks passed from the sheet class.
	 */
	actions?: ActionsType;

	/**
	 * A link to the actual Item Document instance.
	 *
	 * This should be used infrequently; prefer instead to call sheet actions.
	 */
	document: InfinityActor<DataModelType> | InfinityItem<DataModelType>;

	/**
	 * Item document's icon image.
	 */
	img: string;

	/**
	 * Item document's name.
	 */
	name: string;

	/**
	 * Data Model instance for system data.
	 */
	system: DataModelType;

	/**
	 * Whether the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Whether the sheet is owned.
	 */
	owned: boolean;

	/**
	 * Whether the sheet is in Limited Permissions mode.
	 */
	limited: boolean;
}
