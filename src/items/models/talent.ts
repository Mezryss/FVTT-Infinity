import { ALL_SKILLS, Skill } from '@/data/skills';
import { InfinityItemDataModel } from './infinity-item';

const { DocumentUUIDField, NumberField, StringField } = foundry.data.fields;

/**
 * Data model for Talents that the character can pick up.
 */
export class TalentDataModel extends InfinityItemDataModel {
	/**
	 * Skill that this talent is associated with.
	 */
	skill!: Skill;

	/**
	 * Ranks the owning player has taken in the talent.
	 */
	ranks!: number;

	/**
	 * Maximum number of ranks that can be purchased.
	 */
	maximumRanks!: number;

	/**
	 * UUID of a talent that is required in order to take this talent.
	 */
	prerequisiteTalentUuid!: string;

	/**
	 * Number of ranks in the associated skill's Expertise that is required for this talent.
	 */
	prerequisiteSkillRanks!: number;

	static override defineSchema(): foundry.abstract.types.DataSchema {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			skill: new StringField({
				choices: ALL_SKILLS,
				initial: Skill.Acrobatics,
				nullable: false,
				trim: true,
			}),

			ranks: new NumberField({
				initial: 1,
				integer: true,
				min: 1,
				nullable: false,
				positive: true,
			}),

			maximumRanks: new NumberField({
				initial: 1,
				integer: true,
				min: 1,
				nullable: false,
				positive: true,
			}),

			prerequisiteTalentUuid: new DocumentUUIDField({
				embedded: false,
				initial: null,
				nullable: true,
			}),

			prerequisiteSkillRanks: new NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),
		};
	}
}
