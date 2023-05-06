import GearItemDataModel from './templates/GearItemDataModel';

/**
 * Armour Types.
 */
export enum ArmourType {
	Civilian = 'Civilian',
	Combat = 'Combat',
	Internal = 'Internal',
	Powered = 'Powered',
	// Symbiont armours behave differently from human armours.
	Symbiont = 'Symbiont',
}

export namespace ArmourType {
	/**
	 * Convenience accessor for all Armour types.
	 */
	export const all: ArmourType[] = [ArmourType.Civilian, ArmourType.Combat, ArmourType.Internal, ArmourType.Powered, ArmourType.Symbiont];
}

export default abstract class ArmourDataModel extends GearItemDataModel {
	/**
	 * Type of armour.
	 */
	abstract type: ArmourType;

	/**
	 * Armour Soak.
	 */
	abstract soak: {
		/**
		 * Symbiont armours have a single soak value.
		 */
		symbiont: number;

		/**
		 * Protection provided to the head.
		 */
		head: number;

		/**
		 * Protection provided to the torso.
		 */
		torso: number;

		/**
		 * Protection provided to the arms.
		 */
		arm: number;

		/**
		 * Protection provided to the legs.
		 */
		leg: number;
	};

	/**
	 * Bio-Technical Shield.
	 */
	abstract bts: number;

	/**
	 * Additional values used exclusively by Tohaa Symbiont armour.
	 */
	abstract symbiont: {
		/**
		 * Symbiont Vigour.
		 */
		vigour: number;

		/**
		 * Symbiont Wounds.
		 */
		wounds: {
			/**
			 * Current wounds suffered by the Symbiont.
			 */
			value: number;

			/**
			 * Max wounds before the Symbiont will die.
			 */
			max: number;
		};
	};

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			type: new fields.StringField({
				initial: ArmourType.Civilian,
				choices: ArmourType.all,
				nullable: false,
			}),

			soak: new fields.SchemaField({
				symbiont: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
				head: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
				torso: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
				arm: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
				leg: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
			}),

			bts: new fields.NumberField({
				initial: 0,
				integer: true,
				nullable: false,
			}),

			symbiont: new fields.SchemaField({
				vigour: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				wounds: new fields.SchemaField({
					value: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
					max: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),
			}),
		};
	}
}
