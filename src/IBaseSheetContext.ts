import InfinityActor from './actor/InfinityActor';
import InfinityActorSheet from './actor/InfinityActorSheet';
import InfinityItem from './item/InfinityItem';
import InfinityItemSheet from './item/InfinityItemSheet';

type InfinityDocumentType<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel> = InfinityActor<DataModelType> | InfinityItem<DataModelType>;

/**
 * Base type for all SheetContexts used by Item document sheets.
 */
export interface IBaseSheetContext<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel, ActionsType = never> {
	/**
	 * An optional set of function callbacks passed from the sheet class.
	 */
	actions?: ActionsType;

	/**
	 * A link to the actual Item Document instance.
	 *
	 * This should be used infrequently; prefer instead to call sheet actions.
	 */
	document: InfinityDocumentType<DataModelType>;

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

export namespace IBaseSheetContext {
	/**
	 * Constructs the default context used by most Actor & Item document sheets.
	 *
	 * @param sheet Sheet to create the context for.
	 */
	export function baseContext<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel, ActionsType = never>(
		sheet: InfinityActorSheet<DataModelType> | InfinityItemSheet<DataModelType>,
	): IBaseSheetContext<DataModelType, ActionsType> {
		return {
			actions: (sheet as any).actions,
			document: sheet.document,
			editable: sheet.isEditable,
			img: sheet.document.img,
			name: sheet.document.name,
			system: sheet.document.system as any,
			owned: (sheet.document as any).isOwned ?? false,
			limited: sheet.document.limited,
		};
	}
}
