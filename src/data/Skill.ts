import Attribute from './Attributes';

/**
 * Character skills.
 */
enum Skill {
	// Agility Skills
	Acrobatics = 'Acrobatics',
	CloseCombat = 'CloseCombat',
	Stealth = 'Stealth',

	// Awareness Skills
	Analysis = 'Analysis',
	Extraplanetary = 'Extraplanetary',
	Observation = 'Observation',
	Survival = 'Survival',
	Thievery = 'Thievery',

	// Brawn Skills
	Athletics = 'Athletics',
	Resistance = 'Resistance',

	// Coordination Skills
	Ballistics = 'Ballistics',
	Pilot = 'Pilot',
	Spacecraft = 'Spacecraft',

	// Intelligence Skills
	Education = 'Education',
	Hacking = 'Hacking',
	Medicine = 'Medicine',
	Psychology = 'Psychology',
	Science = 'Science',
	Tech = 'Tech',

	// Personality Skills
	AnimalHandling = 'AnimalHandling',
	Command = 'Command',
	Lifestyle = 'Lifestyle',
	Persuade = 'Persuade',

	// Willpower Skills
	Discipline = 'Discipline',
}

namespace Skill {
	/**
	 * A collection of skills broken down by their attributes.
	 */
	export const BY_ATTRIBUTE: Record<Attribute, Skill[]> = {
		[Attribute.Agility]: [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth],

		[Attribute.Awareness]: [
			Skill.Analysis,
			Skill.Extraplanetary,
			Skill.Observation,
			Skill.Survival,
			Skill.Thievery,
		],

		[Attribute.Brawn]: [Skill.Athletics, Skill.Resistance],

		[Attribute.Coordination]: [Skill.Ballistics, Skill.Pilot, Skill.Spacecraft],

		[Attribute.Intelligence]: [
			Skill.Education,
			Skill.Hacking,
			Skill.Medicine,
			Skill.Psychology,
			Skill.Science,
			Skill.Tech,
		],

		[Attribute.Personality]: [
			Skill.AnimalHandling,
			Skill.Command,
			Skill.Lifestyle,
			Skill.Persuade,
		],

		[Attribute.Willpower]: [Skill.Discipline],
	};

	/**
	 * Retrieves the Attribute for the specified skill.
	 */
	export function attribute(skill: Skill) {
		return (Object.keys(Skill.BY_ATTRIBUTE) as Attribute[]).find((attr) =>
			Skill.BY_ATTRIBUTE[attr].includes(skill),
		)!;
	}

	/**
	 * Retrieves the localized name of the specified Skill.
	 */
	export function localize(skill: Skill) {
		return game.i18n.localize(`Infinity.Skills.${skill}`);
	}
}

export default Skill;
