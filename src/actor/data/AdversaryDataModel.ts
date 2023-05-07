import Attribute from '@/data/Attributes';
import Defence from '@/data/Defences';

/**
 * Adversary Types
 */
export enum AdversaryType {
	Trooper = 'Trooper',
	Elite = 'Elite',
	Nemesis = 'Nemesis',
}

export namespace AdversaryType {
	/**
	 * Convenience accessor for all Adversary Types
	 */
	export const all: AdversaryType[] = [AdversaryType.Trooper, AdversaryType.Elite, AdversaryType.Nemesis];
}

/**
 * Individual Adversary Field of Expertise
 */
type FieldOfExpertise = {
	/**
	 * Expertise Value
	 */
	expertise: number;

	/**
	 * Focus Value
	 */
	focus: number;
};

export default abstract class AdversaryDataModel extends foundry.abstract.DataModel {
	/**
	 * Adversary Type
	 */
	abstract type: AdversaryType;

	/**
	 * Adversary Attributes
	 */
	abstract attributes: {
		[Attribute.Agility]: number;
		[Attribute.Awareness]: number;
		[Attribute.Brawn]: number;
		[Attribute.Coordination]: number;
		[Attribute.Intelligence]: number;
		[Attribute.Personality]: number;
		[Attribute.Willpower]: number;
	};

	/**
	 * Defences
	 */
	abstract defences: {
		[Defence.Firewall]: number;
		[Defence.Security]: number;
		[Defence.Resolve]: number;
		[Defence.Morale]: number;
		[Defence.Vigour]: number;
		[Defence.Armour]: number;
	};

	/**
	 * Fields of Expertise
	 */
	abstract fieldsOfExpertise: {
		combat: FieldOfExpertise;
		fortitude: FieldOfExpertise;
		movement: FieldOfExpertise;
		senses: FieldOfExpertise;
		social: FieldOfExpertise;
		technical: FieldOfExpertise;
	};

	/**
	 * Harms
	 */
	abstract harms: {
		/**
		 * Quantronic Harm
		 */
		breaches: string[];

		/**
		 * Mental Harm
		 */
		metanoia: string[];

		/**
		 * Physical Harm
		 */
		wounds: [];
	};

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			type: new fields.StringField({
				initial: AdversaryType.Trooper,
				choices: AdversaryType.all,
				nullable: false,
			}),

			attributes: new fields.SchemaField({
				[Attribute.Agility]: new fields.NumberField({
					initial: 7,
					integer: true,
					nullable: false,
				}),

				[Attribute.Awareness]: new fields.NumberField({
					initial: 7,
					integer: true,
					nullable: false,
				}),

				[Attribute.Brawn]: new fields.NumberField({
					initial: 7,
					integer: true,
					nullable: false,
				}),

				[Attribute.Coordination]: new fields.NumberField({
					initial: 7,
					integer: true,
					nullable: false,
				}),

				[Attribute.Intelligence]: new fields.NumberField({
					initial: 7,
					integer: true,
					nullable: false,
				}),

				[Attribute.Personality]: new fields.NumberField({
					initial: 7,
					integer: true,
					nullable: false,
				}),

				[Attribute.Willpower]: new fields.NumberField({
					initial: 7,
					integer: true,
					nullable: false,
				}),
			}),

			defences: new fields.SchemaField({
				[Defence.Firewall]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Defence.Security]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Defence.Resolve]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Defence.Morale]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Defence.Vigour]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),

				[Defence.Armour]: new fields.NumberField({
					initial: 0,
					integer: true,
					nullable: false,
				}),
			}),

			fieldsOfExpertise: new fields.SchemaField({
				combat: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				fortitude: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				movement: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				senses: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				social: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				technical: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),
			}),

			harms: new fields.SchemaField({
				breaches: new fields.ArrayField(
					new fields.StringField({
						initial: '',
						nullable: false,
					}),
					{
						initial: [],
						nullable: false,
					},
				),

				metanoia: new fields.ArrayField(
					new fields.StringField({
						initial: '',
						nullable: false,
					}),
					{
						initial: [],
						nullable: false,
					},
				),

				wounds: new fields.ArrayField(
					new fields.StringField({
						initial: '',
						nullable: false,
					}),
					{
						initial: [],
						nullable: false,
					},
				),
			}),
		};
	}
}
