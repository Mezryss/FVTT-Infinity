import GearItemDataModel from './templates/GearItemDataModel';

/**
 * Explosive Categories.
 */
export enum ExplosiveCategory {
	Charge = 'Charge',
	Grenade = 'Grenade',
	Mine = 'Mine',
}

export namespace ExplosiveCategory {
	/**
	 * Convenience accessor for all Explosive categories.
	 */
	export const all: ExplosiveCategory[] = [ExplosiveCategory.Charge, ExplosiveCategory.Grenade, ExplosiveCategory.Mine];
}

export default abstract class ExplosiveDataModel extends GearItemDataModel {
	/**
	 * Category for the explosive.
	 */
	abstract category: ExplosiveCategory;

	/**
	 * Damage string
	 */
	abstract damage: string;

	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			category: new fields.StringField({
				initial: ExplosiveCategory.Charge,
				choices: ExplosiveCategory.all,
				nullable: false,
			}),

			damage: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
