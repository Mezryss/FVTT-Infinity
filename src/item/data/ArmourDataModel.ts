import HasBasicItemData from './templates/HasBasicItemData';
import HasGearData from './templates/HasGearData';

/**
 * Item references within an Armour's loadout.
 */
export type ArmourLoadoutItem = {
	img: string;
	name: string;
	uuid: string;
	quantity: number;
};

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

export default abstract class ArmourDataModel extends HasGearData(HasBasicItemData(foundry.abstract.TypeDataModel)) {
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
	 * Equipment included in the armour, either stock or through customization.
	 */
	abstract loadout: ArmourLoadoutItem[];

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

			loadout: new fields.ArrayField(
				new fields.SchemaField({
					img: new fields.StringField({
						initial: '',
						nullable: false,
					}),

					name: new fields.StringField({
						initial: '',
						nullable: false,
					}),

					uuid: new fields.StringField({
						initial: '',
						nullable: false,
					}),

					quantity: new fields.NumberField({
						initial: 1,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),
				{
					initial: [],
					nullable: false,
				},
			),
		};
	}
}
