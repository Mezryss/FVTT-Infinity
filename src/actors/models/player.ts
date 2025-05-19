import { Attribute } from '@/data/attributes';
import { InfinityActorDataModel } from './infinity-actor';
import { Skill } from '@/data/skills';

const { DataModel } = foundry.abstract;
const { BooleanField, EmbeddedDataField, NumberField, StringField } = foundry.data.fields;

/**
 * Utility wrapper for Attribute fields.
 */
function makeAttributeField() {
	return new NumberField({
		initial: 7,
		integer: true,
		min: 1,
	});
}

/**
 * Container data model for all of a character's Attribute values.
 */
class CharacterAttributesDataModel extends DataModel {
	[Attribute.Agility]!: number;
	[Attribute.Awareness]!: number;
	[Attribute.Brawn]!: number;
	[Attribute.Coordination]!: number;
	[Attribute.Intelligence]!: number;
	[Attribute.Personality]!: number;
	[Attribute.Willpower]!: number;

	static defineSchema() {
		return {
			[Attribute.Agility]: makeAttributeField(),
			[Attribute.Awareness]: makeAttributeField(),
			[Attribute.Brawn]: makeAttributeField(),
			[Attribute.Coordination]: makeAttributeField(),
			[Attribute.Intelligence]: makeAttributeField(),
			[Attribute.Personality]: makeAttributeField(),
			[Attribute.Willpower]: makeAttributeField(),
		};
	}
}

/**
 * A single skill entry.
 */
class SkillEntryDataModel extends DataModel {
	/**
	 * Whether the skill is one of the character's Signature Skills.
	 */
	signature!: boolean;

	/**
	 * Expertise value of the skill is used to determine the Target Number for a roll.
	 */
	expertise!: number;

	/**
	 * Focus value of the skill is sued to determine the Critical range for a roll.
	 */
	focus!: number;

	static defineSchema() {
		return {
			signature: new BooleanField({
				initial: false,
				nullable: false,
			}),

			expertise: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
			}),

			focus: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
			}),
		};
	}
}

/**
 * Utility wrapper for Skill fields.
 */
function makeSkillField() {
	return new EmbeddedDataField(SkillEntryDataModel as any, {
		nullable: false,
	});
}

/**
 * Container data model for all character skill data.
 */
class CharacterSkillsDataModel extends DataModel {
	[Skill.Acrobatics]!: SkillEntryDataModel;
	[Skill.Analysis]!: SkillEntryDataModel;
	[Skill.AnimalHandling]!: SkillEntryDataModel;
	[Skill.Athletics]!: SkillEntryDataModel;
	[Skill.Ballistics]!: SkillEntryDataModel;
	[Skill.CloseCombat]!: SkillEntryDataModel;
	[Skill.Command]!: SkillEntryDataModel;
	[Skill.Discipline]!: SkillEntryDataModel;
	[Skill.Education]!: SkillEntryDataModel;
	[Skill.Extraplanetary]!: SkillEntryDataModel;
	[Skill.Hacking]!: SkillEntryDataModel;
	[Skill.Lifestyle]!: SkillEntryDataModel;
	[Skill.Medicine]!: SkillEntryDataModel;
	[Skill.Observation]!: SkillEntryDataModel;
	[Skill.Persuade]!: SkillEntryDataModel;
	[Skill.Pilot]!: SkillEntryDataModel;
	[Skill.Psychology]!: SkillEntryDataModel;
	[Skill.Resistance]!: SkillEntryDataModel;
	[Skill.Science]!: SkillEntryDataModel;
	[Skill.Spacecraft]!: SkillEntryDataModel;
	[Skill.Stealth]!: SkillEntryDataModel;
	[Skill.Survival]!: SkillEntryDataModel;
	[Skill.Tech]!: SkillEntryDataModel;
	[Skill.Thievery]!: SkillEntryDataModel;

	static defineSchema() {
		return {
			[Skill.Acrobatics]: makeSkillField(),
			[Skill.Analysis]: makeSkillField(),
			[Skill.AnimalHandling]: makeSkillField(),
			[Skill.Athletics]: makeSkillField(),
			[Skill.Ballistics]: makeSkillField(),
			[Skill.CloseCombat]: makeSkillField(),
			[Skill.Command]: makeSkillField(),
			[Skill.Discipline]: makeSkillField(),
			[Skill.Education]: makeSkillField(),
			[Skill.Extraplanetary]: makeSkillField(),
			[Skill.Hacking]: makeSkillField(),
			[Skill.Lifestyle]: makeSkillField(),
			[Skill.Medicine]: makeSkillField(),
			[Skill.Observation]: makeSkillField(),
			[Skill.Persuade]: makeSkillField(),
			[Skill.Pilot]: makeSkillField(),
			[Skill.Psychology]: makeSkillField(),
			[Skill.Resistance]: makeSkillField(),
			[Skill.Science]: makeSkillField(),
			[Skill.Spacecraft]: makeSkillField(),
			[Skill.Stealth]: makeSkillField(),
			[Skill.Survival]: makeSkillField(),
			[Skill.Tech]: makeSkillField(),
			[Skill.Thievery]: makeSkillField(),
		};
	}
}

/**
 * Infinity Points tracking for Player Characters.
 */
class InfinityPointsDataModel extends DataModel {
	/**
	 * Current Infinity Points value.
	 */
	value!: number;

	/**
	 * Maximum number of Infinity Points the character can have.
	 */
	max!: number;

	static defineSchema() {
		return {
			value: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
			}),

			max: new NumberField({
				initial: 5,
				integer: true,
				min: 0,
			}),
		};
	}
}

/**
 * Data Model for Player Characters.
 */
export class PlayerCharacterDataModel extends InfinityActorDataModel {
	/**
	 * Character Faction.
	 */
	faction!: string;

	/**
	 * Character Heritage.
	 */
	heritage!: string;

	/**
	 * Player's Current Infinity Points.
	 */
	infinityPoints!: InfinityPointsDataModel;

	/**
	 * Character's Refresh Value.
	 */
	refresh!: string;

	/**
	 * Character's Attribute Values.
	 */
	attributes!: CharacterAttributesDataModel;

	/**
	 * Character's Skill Values.
	 */
	skills!: CharacterSkillsDataModel;

	/**
	 * Character's Homeworld.
	 */
	homeworld!: string;

	/**
	 * Character's Social Status.
	 */
	socialStatus!: string;

	/**
	 * Character's Age.
	 */
	age!: string;

	/**
	 * Languages Spoken.
	 */
	languages!: string;

	/**
	 * Background Information.
	 */
	background!: string;

	static defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			faction: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),
			heritage: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			infinityPoints: new EmbeddedDataField(InfinityPointsDataModel as any, {
				nullable: false,
			}),

			refresh: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			attributes: new EmbeddedDataField(CharacterAttributesDataModel as any, {
				nullable: false,
			}),

			skills: new EmbeddedDataField(CharacterSkillsDataModel as any, {
				nullable: false,
			}),

			homeworld: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			socialStatus: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			age: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			languages: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),

			background: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),
		};
	}
}
