import { ApplicationRenderContext } from "@client/applications/_types.mjs";
import type { HandlebarsRenderOptions, HandlebarsTemplatePart } from "@client/applications/api/handlebars-application.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Handlebars Parts definition utility.
 */
export type HandlebarsParts = Record<string, HandlebarsTemplatePart>;

/**
 * Utility class providing stronger typing information for HandlebarsApplicationMixin.
 *
 * WARNING: This class is only used for typing, and won't actually provide any functionality.
 */
declare class HandlebarsApp {
	/**
	 * Registry of template parts supported for this application for partial rendering.
	 */
	declare static PARTS: HandlebarsParts;

	/**
	 * Record of all rendered template parts.
	 */
	get parts(): Record<string, HTMLElement>;

	/**
	 * Allow subclasses to dynamically configure render parts.
	 */
	protected _configureRenderParts(options: HandlebarsRenderOptions): Record<string, HandlebarsTemplatePart>;

	/**
	 * Prepare context that is specific to only a single rendered part.
     *
     * It is recommended to augment or mutate the shared context so that downstream methods like _onRender have
     * visibility into the data that was used for rendering. It is acceptable to return a different context object
     * rather than mutating the shared context at the expense of this transparency.
	 *
	 * @param partId The part being rendered
	 * @param context Shared context provided by _prepareContext
	 * @param options Options which configure application rendering behavior
	 */
	protected _preparePartContext(partId: string, context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
}

/**
 * Wrapper type for the HandlebarsApplicationMixin providing stronger typing information.
 */
export function HandlebarsMixin<
	SheetType extends foundry.applications.api.DocumentSheetV2,
	BaseType extends foundry.types.Constructor<SheetType>
>(base: BaseType) {
	return (class extends HandlebarsApplicationMixin(base) {}) as BaseType & foundry.types.Constructor<HandlebarsApp>;
}
