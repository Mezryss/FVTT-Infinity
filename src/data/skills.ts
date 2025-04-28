import { Attribute } from './attributes';

/**
 * Skills. CRB, p.29
 */
export enum Skill {
	Acrobatics = 'acrobatics',
	Analysis = 'analysis',
	AnimalHandling = 'animalHandling',
	Athletics = 'athletics',
	Ballistics = 'ballistics',
	CloseCombat = 'closeCombat',
	Command = 'command',
	Discipline = 'discipline',
	Education = 'education',
	Extraplanetary = 'extraplanetary',
	Hacking = 'hacking',
	Lifestyle = 'lifestyle',
	Medicine = 'medicine',
	Observation = 'observation',
	Persuade = 'persuade',
	Pilot = 'pilot',
	Psychology = 'psychology',
	Resistance = 'resistance',
	Science = 'science',
	Spacecraft = 'spacecraft',
	Stealth = 'stealth',
	Survival = 'survival',
	Tech = 'tech',
	Thievery = 'thievery',
}

/**
 * Utility method to localize a skill.
 */
export function localizeSkill(skill: Skill): string {
	return game.i18n.localize(`Infinity.Skills.${skill}`);
}

/**
 * List of all skills, organized by their default attribute.
 */
export const SKILLS_BY_ATTRIBUTE: Record<Attribute, Skill[]> = {
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
	[Attribute.Personality]: [Skill.AnimalHandling, Skill.Command, Skill.Lifestyle, Skill.Persuade],
	[Attribute.Willpower]: [Skill.Discipline],
};

/**
 * List of the default attribute associated with each individual skill.
 */
export const ATTRIBUTE_FOR_SKILL: Record<Skill, Attribute> = {
	[Skill.Acrobatics]: Attribute.Agility,
	[Skill.Analysis]: Attribute.Awareness,
	[Skill.AnimalHandling]: Attribute.Personality,
	[Skill.Athletics]: Attribute.Brawn,
	[Skill.Ballistics]: Attribute.Coordination,
	[Skill.CloseCombat]: Attribute.Agility,
	[Skill.Command]: Attribute.Personality,
	[Skill.Discipline]: Attribute.Willpower,
	[Skill.Education]: Attribute.Intelligence,
	[Skill.Extraplanetary]: Attribute.Awareness,
	[Skill.Hacking]: Attribute.Intelligence,
	[Skill.Lifestyle]: Attribute.Personality,
	[Skill.Medicine]: Attribute.Intelligence,
	[Skill.Observation]: Attribute.Awareness,
	[Skill.Persuade]: Attribute.Personality,
	[Skill.Pilot]: Attribute.Coordination,
	[Skill.Psychology]: Attribute.Intelligence,
	[Skill.Resistance]: Attribute.Brawn,
	[Skill.Science]: Attribute.Intelligence,
	[Skill.Spacecraft]: Attribute.Coordination,
	[Skill.Stealth]: Attribute.Agility,
	[Skill.Survival]: Attribute.Awareness,
	[Skill.Tech]: Attribute.Intelligence,
	[Skill.Thievery]: Attribute.Awareness,
};

/**
 * List of all Skills.
 */
export const ALL_SKILLS: Skill[] = [
	Skill.Acrobatics,
	Skill.Analysis,
	Skill.AnimalHandling,
	Skill.Athletics,
	Skill.Ballistics,
	Skill.CloseCombat,
	Skill.Command,
	Skill.Discipline,
	Skill.Education,
	Skill.Extraplanetary,
	Skill.Hacking,
	Skill.Lifestyle,
	Skill.Medicine,
	Skill.Observation,
	Skill.Persuade,
	Skill.Pilot,
	Skill.Psychology,
	Skill.Resistance,
	Skill.Science,
	Skill.Spacecraft,
	Skill.Stealth,
	Skill.Survival,
	Skill.Tech,
	Skill.Thievery,
];

/**
 * Utility to construct a skill label.
 */
function labeled(skill: Skill) {
	return {
		key: skill,
		label: `Infinity.Skills.${skill}`,
	};
}

/**
 * Labeled skills, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_SKILLS = ALL_SKILLS.map(labeled);
