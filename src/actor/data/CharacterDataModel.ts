import Skill from '@/data/Skill';

import HasAttributes from './templates/HasAttributes';

/**
 * (Refactor) Tracks current/max value for stress.
 */
type StressTrack = {
	value: number;
	max: number;
};

/**
 * (Refactor) Tracks current/max value for a type of Harm, as well as a list of Harm Effects.
 */
type HarmTrack = {
	effects: string[];
	value: number;
	max: number;
};

/**
 * Character skill values
 */
type SkillValue = {
	/**
	 * Whether the skill is a Signature Skill for the character.
	 */
	signature: boolean;

	/**
	 * Expertise value, used to determine TN of a roll.
	 */
	expertise: number;

	/**
	 * Focus value, used to determine threshold for Critical successes.
	 */
	focus: number;
};

export default abstract class CharacterDataModel extends HasAttributes(foundry.abstract.TypeDataModel) {
	/**
	 * Character meta-information.
	 *
	 * None of these really have mechanical impact.
	 */
	abstract meta: {
		/**
		 * What faction the character belongs to.
		 */
		faction: string;

		/**
		 * The character's homeworld.
		 */
		homeworld: string;

		/**
		 * The character's heritage.
		 */
		heritage: string;

		/**
		 * The character's social status.
		 */
		socialStatus: string;
	};

	/**
	 * Infinity Points meta-currency.
	 */
	abstract infinityPoints: {
		/**
		 * How many points the character currently has to spend.
		 */
		value: number;

		/**
		 * How many points the character's Infinity Points refresh to.
		 */
		refresh: number;
	};

	/**
	 * Accumulated Experience Points
	 */
	abstract xp: {
		/**
		 * Total the character has earned so far.
		 */
		total: number;

		/**
		 * Total the character has spent.
		 */
		spent: number;
	};

	/**
	 * The character's Stress tracks.
	 */
	abstract stress: {
		firewall: StressTrack;
		resolve: StressTrack;
		vigour: StressTrack;
	};

	/**
	 * Harms suffered by the character.
	 */
	abstract harms: {
		breaches: HarmTrack;
		metanoia: HarmTrack;
		wounds: HarmTrack;
	};

	/**
	 * Character's defense values
	 */
	abstract defences: {
		security: number;
		morale: number;
		bts: number;
	};

	/**
	 * Character's skills
	 */
	abstract skills: Record<Skill, SkillValue>;

	/**
	 * Character's accumulated Traits.
	 */
	abstract traits: string[];

	/**
	 * Information about the character's Faction Handler.
	 *
	 * No direct mechanical impact.
	 */
	abstract factionHandler: {
		/**
		 * Who are they?
		 */
		identity: string;

		/**
		 * What faction do they represent?
		 */
		faction: string;

		/**
		 * What is their contact protocol?
		 */
		contactProtocol: string;

		/**
		 * What is the character's current covert objective, if any?
		 */
		covertObjective: string;
	};

	/**
	 * Background information about the character.
	 *
	 * No direct mechanical impact, but useful to reference and potentially used by modules.
	 */
	abstract background: {
		/**
		 * Character's age
		 */
		age: string;

		/**
		 * Character's pronouns (left as 'gender' for Player Pronouns module compatibility)
		 */
		gender: string;

		/**
		 * Languages the character directly speaks and comprehends.
		 */
		languages: string;

		/**
		 * A list of Fake IDs possessed by the character
		 */
		fakeIds: {
			/**
			 * Name of the fake ID
			 */
			name: string;

			/**
			 * Fake ID's rating value.
			 */
			rating: number;
		}[];

		/**
		 * A list of Contacts the character has access to.
		 */
		contacts: string[];
	};

	/**
	 * Information about the Life Path the character followed.
	 */
	abstract lifePath: {
		familySocialStatus: string;
		homeEnvironment: string;
		youthEvent: string;
		education: string;
		adolescentEvent: string;
		careers: string[];
		previousFactions: string[];
		notes: string;
	};

	/**
	 * Prepare the maximum value of the character's Stress and Harm tracks.
	 *
	 * CRB p.71
	 */
	override prepareDerivedData() {
		const breaches = this.harms.breaches;
		const metanoia = this.harms.metanoia;
		const wounds = this.harms.wounds;

		this.stress.firewall.max = this.attributes.Intelligence.value + this.skills.Hacking.expertise;
		this.stress.resolve.max = this.attributes.Willpower.value + this.skills.Discipline.expertise;
		this.stress.vigour.max = this.attributes.Brawn.value + this.skills.Resistance.expertise;

		breaches.max = metanoia.max = wounds.max = 5;

		breaches.value = breaches.effects.length;
		metanoia.value = metanoia.effects.length;
		wounds.value = wounds.effects.length;

		this.harms.breaches = breaches;
		this.harms.metanoia = metanoia;
		this.harms.wounds = wounds;
	}

	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			meta: new fields.SchemaField({
				faction: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				homeworld: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				heritage: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				socialStatus: new fields.StringField({
					initial: '',
					nullable: false,
				}),
			}),

			infinityPoints: new fields.SchemaField({
				value: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				refresh: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			xp: new fields.SchemaField({
				total: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),

				spent: new fields.NumberField({
					initial: 0,
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
			}),

			harms: new fields.SchemaField({
				breaches: new fields.SchemaField({
					effects: new fields.ArrayField(
						new fields.StringField({
							initial: '',
							nullable: false,
						}),
						{
							initial: [],
							nullable: false,
						},
					),

					value: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					max: new fields.NumberField({
						initial: 5,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),

				metanoia: new fields.SchemaField({
					effects: new fields.ArrayField(
						new fields.StringField({
							initial: '',
							nullable: false,
						}),
						{
							initial: [],
							nullable: false,
						},
					),

					value: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					max: new fields.NumberField({
						initial: 5,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),

				wounds: new fields.SchemaField({
					effects: new fields.ArrayField(
						new fields.StringField({
							initial: '',
							nullable: false,
						}),
						{
							initial: [],
							nullable: false,
						},
					),

					value: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					max: new fields.NumberField({
						initial: 5,
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

				bts: new fields.NumberField({
					initial: 0,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			skills: new fields.SchemaField({
				[Skill.Acrobatics]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.CloseCombat]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Stealth]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Analysis]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Extraplanetary]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Observation]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Survival]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Thievery]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Athletics]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Resistance]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Ballistics]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Pilot]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Spacecraft]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Education]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Hacking]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Medicine]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Psychology]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Science]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Tech]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.AnimalHandling]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Command]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Lifestyle]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Persuade]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),

				[Skill.Discipline]: new fields.SchemaField({
					signature: new fields.BooleanField({
						initial: false,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						nullable: false,
					}),
				}),
			}),

			traits: new fields.ArrayField(
				new fields.StringField({
					initial: '',
					nullable: false,
				}),
				{
					initial: [],
					nullable: false,
				},
			),

			factionHandler: new fields.SchemaField({
				identity: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				faction: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				contactProtocol: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				covertObjective: new fields.HTMLField({
					initial: '',
					nullable: false,
				}),
			}),

			background: new fields.SchemaField({
				age: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				gender: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				languages: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				fakeIds: new fields.ArrayField(
					new fields.SchemaField({
						name: new fields.StringField({
							initial: '',
							nullable: false,
						}),

						rating: new fields.NumberField({
							initial: 0,
							integer: true,
							nullable: false,
						}),
					}),
					{
						initial: [],
						nullable: false,
					},
				),

				contacts: new fields.ArrayField(
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

			lifePath: new fields.SchemaField({
				familySocialStatus: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				homeEnvironment: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				youthEvent: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				education: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				adolescentEvent: new fields.StringField({
					initial: '',
					nullable: false,
				}),

				careers: new fields.ArrayField(
					new fields.StringField({
						initial: '',
						nullable: false,
					}),
					{
						initial: [],
						nullable: false,
					},
				),

				previousFactions: new fields.ArrayField(
					new fields.StringField({
						initial: '',
						nullable: false,
					}),
					{
						initial: [],
						nullable: false,
					},
				),

				notes: new fields.HTMLField({
					initial: '',
					nullable: false,
				}),
			}),
		};
	}
}
