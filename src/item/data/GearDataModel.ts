import GearItemDataModel from './templates/GearItemDataModel';

export enum GearType {
	/**
	 * Other Items, p.360
	 */
	Other = 'Other',

	/**
	 * Resources, pp.355-356
	 */
	Resource = 'Resource',

	/**
	 * Tools, p.357
	 */
	Tool = 'Tool',
}

export namespace GearType {
	/**
	 * Convenience accessor for all gear types.
	 */
	export const all: GearType[] = [GearType.Other, GearType.Resource, GearType.Tool];
}

/**
 * A generic "gear" item that encompasses Resources, Tools, and Other Items.
 *
 * None of these items have special mechanics or stats beyond the default set, so no need for distinct data models.
 */
export default abstract class GearDataModel extends GearItemDataModel {
	/**
	 * Gear Type.
	 */
	abstract type: GearType;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			type: new fields.StringField({
				initial: GearType.Other,
				choices: GearType.all,
				nullable: false,
			}),
		};
	}
}
