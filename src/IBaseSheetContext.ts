import InfinityActorSheet from './actor/InfinityActorSheet';
import InfinityItemSheet from './item/InfinityItemSheet';

/**
 * Base type for all SheetContexts used by Item document sheets.
 */
export interface IBaseSheetContext<ActionsType = never> {
	/**
	 * An optional set of function callbacks passed from the sheet class.
	 */
	actions?: ActionsType;
}

export namespace IBaseSheetContext {
	/**
	 * Constructs the default context used by most Actor & Item document sheets.
	 *
	 * @param sheet Sheet to create the context for.
	 */
	export function baseContext<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel, ActionsType = never>(sheet: InfinityActorSheet<DataModelType> | InfinityItemSheet<DataModelType>): IBaseSheetContext<ActionsType> {
		return {
			actions: (sheet as any).actions,
		};
	}
}
