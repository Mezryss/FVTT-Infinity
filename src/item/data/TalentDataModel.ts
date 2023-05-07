import Skill from '@/data/Skill';
import BasicItemDataModel from './templates/BasicItemDataModel';

/**
 * Represents one of the Prerequisites for taking a talent.
 *
 * These aren't enforced by the system implementation, but they may have different means of being displayed to users.
 */
export type TalentPrerequisite = {
	/**
	 * What type of prerequisite does this represent?
	 */
	type: TalentPrerequisite.Type;

	/**
	 * Actual value for the prerequisite.
	 *
	 * SkillExpertise & SkillFocus use `number`.
	 * Talent & Other use `string`.
	 */
	value: number | string;
};

export namespace TalentPrerequisite {
	/**
	 * What specific type of Prerequisite does this one represent?
	 */
	export enum Type {
		/**
		 * Talent requires a certain level of expertise in the associated skill.
		 */
		SkillExpertise = 'SkillExpertise',

		/**
		 * Talent requires a certain level of focus in the associated skill.
		 */
		SkillFocus = 'SkillFocus',

		/**
		 * Talent requires a rank in another talent.
		 */
		Talent = 'Talent',

		/**
		 * A catch-all for a generic prerequisite presented as a string.
		 */
		Other = 'Other',
	}

	export namespace Type {
		/**
		 * Convenience accessor for the numeric Talent types.
		 */
		export const numeric: TalentPrerequisite.Type[] = [TalentPrerequisite.Type.SkillExpertise, TalentPrerequisite.Type.SkillFocus];
	}
}

/**
 * Data model for Talent items.
 */
export default abstract class TalentDataModel extends BasicItemDataModel {
	/**
	 * Every Talent in the game is part of a talent tree tied to a specific skill.
	 */
	abstract skill: Skill;

	/**
	 * Whether or not the talent has multiple ranks.
	 */
	abstract isRanked: boolean;

	/**
	 * If the talent is ranked (`isRanked === true`), track both the max rank and current rank.
	 */
	abstract rank: {
		/**
		 * (Owned Only) How many ranks the character has taken in the talent.
		 */
		current: number;

		/**
		 * The maximum number of times a talent can be taken.
		 */
		max: number;
	};

	/**
	 * Prerequisites for taking this talent.
	 */
	abstract prerequisites: TalentPrerequisite[];

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			skill: new fields.StringField({
				initial: Skill.Acrobatics,
				choices: Skill.all,
				nullable: false,
			}),

			isRanked: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),

			rank: new fields.SchemaField({
				current: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
				}),
				max: new fields.NumberField({
					initial: 1,
					integer: true,
					nullable: false,
				}),
			}),

			prerequisites: new fields.ArrayField(
				new fields.ObjectField({
					initial: {
						type: TalentPrerequisite.Type.Other,
						value: '',
					},
					nullable: false,
				}),
				{
					initial: [],
					nullable: false,
				},
			),
		};
	}
}
