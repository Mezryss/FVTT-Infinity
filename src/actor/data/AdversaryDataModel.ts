import Attribute from '@/data/Attributes';
import IHasDerivedData from '@/dataModel/IHasDerivedData';
import InfinityActor from '../InfinityActor';

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

type StressTrack = {
	value: number;
	max: number;
};

export default abstract class AdversaryDataModel extends foundry.abstract.DataModel implements IHasDerivedData<InfinityActor<AdversaryDataModel>> {
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
	 * Stress Tracks
	 */
	abstract stress: {
		firewall: StressTrack;
		vigour: StressTrack;
		resolve: StressTrack;
	};

	/**
	 * Defences
	 */
	abstract defences: {
		security: number;
		morale: number;
		armour: number;
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
	 * Prepare the maximum value of the adversary's Stress tracks.
	 *
	 * CRB p.415
	 */
	prepareDerivedData(actor: InfinityActor<AdversaryDataModel>) {
		const system = actor.system;
		let maxFirewall = system.stress.firewall.max;
		let maxResolve = system.stress.resolve.max;
		let maxVigour = system.stress.vigour.max;

		switch (actor.system.type) {
			case AdversaryType.Trooper:
				maxFirewall = Math.ceil(system.attributes.Intelligence / 2);
				maxResolve = Math.ceil(system.attributes.Willpower / 2);
				maxVigour = Math.ceil(system.attributes.Brawn / 2);
				break;

			case AdversaryType.Elite:
				maxFirewall = system.attributes.Intelligence;
				maxResolve = system.attributes.Willpower;
				maxVigour = system.attributes.Brawn;
				break;

			case AdversaryType.Nemesis:
				maxFirewall = system.attributes.Intelligence + system.fieldsOfExpertise.technical.expertise;
				maxResolve = system.attributes.Willpower + system.fieldsOfExpertise.fortitude.expertise;
				maxVigour = system.attributes.Brawn + system.fieldsOfExpertise.fortitude.expertise;
				break;
		}

		actor.system.stress.firewall.max = maxFirewall;
		actor.system.stress.resolve.max = maxResolve;
		actor.system.stress.vigour.max = maxVigour;
	}

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

			stress: new fields.SchemaField({
				firewall: new fields.SchemaField({
					value: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					max: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),

				vigour: new fields.SchemaField({
					value: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					max: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),

				resolve: new fields.SchemaField({
					value: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					max: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),
			}),

			defences: new fields.SchemaField({
				security: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				morale: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				armour: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
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
