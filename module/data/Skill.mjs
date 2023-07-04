import { Attribute } from './Attribute.mjs';

/**
 * Enum representing all Character skills.
 *
 * @readonly
 * @enum {string}
 */
export const Skill = {
	// Agility Skills
	Acrobatics: 'Acrobatics',
	CloseCombat: 'CloseCombat',
	Stealth: 'Stealth',

	// Awareness Skills
	Analysis: 'Analysis',
	Extraplanetary: 'Extraplanetary',
	Observation: 'Observation',
	Survival: 'Survival',
	Thievery: 'Thievery',

	// Brawn Skills
	Athletics: 'Athletics',
	Resistance: 'Resistance',

	// Coordination Skills
	Ballistics: 'Ballistics',
	Pilot: 'Pilot',
	Spacecraft: 'Spacecraft',

	// Intelligence Skills
	Education: 'Education',
	Hacking: 'Hacking',
	Medicine: 'Medicine',
	Psychology: 'Psychology',
	Science: 'Science',
	Tech: 'Tech',

	// Personality Skills
	AnimalHandling: 'AnimalHandling',
	Command: 'Command',
	Lifestyle: 'Lifestyle',
	Persuade: 'Persuade',

	// Willpower Skills
	Discipline: 'Discipline',

	/**
	 * Convenience accessor for all character skills.
	 *
	 * @returns {Skill[]}
	 */
	get all() {
		return [
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
	},

	/**
	 * @typedef {object} SkillsByAttribute
	 * @property {Skill[]} Agility
	 * @property {Skill[]} Awareness
	 * @property {Skill[]} Brawn
	 * @property {Skill[]} Coordination
	 * @property {Skill[]} Intelligence
	 * @property {Skill[]} Personality
	 * @property {Skill[]} Willpower
	 */
	/**
	 * Convenience accessor to get all skills, broken down by associated Attribute.
	 *
	 * @returns {SkillsByAttribute}
	 */
	get byAttribute() {
		return {
			[Attribute.Agility]: [Skill.Acrobatics, Skill.CloseCombat, Skill.Stealth],
			[Attribute.Awareness]: [Skill.Analysis, Skill.Extraplanetary, Skill.Observation, Skill.Survival, Skill.Thievery],
			[Attribute.Brawn]: [Skill.Athletics, Skill.Resistance],
			[Attribute.Coordination]: [Skill.Ballistics, Skill.Pilot, Skill.Spacecraft],
			[Attribute.Intelligence]: [Skill.Education, Skill.Hacking, Skill.Medicine, Skill.Psychology, Skill.Science, Skill.Tech],
			[Attribute.Personality]: [Skill.AnimalHandling, Skill.Command, Skill.Lifestyle, Skill.Persuade],
			[Attribute.Willpower]: [Skill.Discipline],
		};
	},
};

/**
 * Utility function to localize a Skill name.
 *
 * @param {Skill} skill
 * @returns {string}
 */
export function localizeSkill(skill) {
	return game.i18n.localize(`Skills.${skill}`);
}
