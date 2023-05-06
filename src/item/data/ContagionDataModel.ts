import GearItemDataModel from './templates/GearItemDataModel';

/**
 * Contagion Categories.
 */
export enum ContagionCategory {
	Disease = 'Disease',
	Drug = 'Drug',
	Poison = 'Poison',
	Other = 'Other',
}

export namespace ContagionCategory {
	/**
	 * Convenience accessor for all Contagion categories.
	 */
	export const all: ContagionCategory[] = [ContagionCategory.Disease, ContagionCategory.Drug, ContagionCategory.Poison, ContagionCategory.Other];
}

/**
 * Contagion Types.
 */
export enum ContagionType {
	Instant = 'Instant',
	Complex = 'Complex',
	Progressive = 'Progressive',
	Chronic = 'Chronic',
}

export namespace ContagionType {
	/**
	 * Convenience accessor for all Contagion types.
	 */
	export const all: ContagionType[] = [ContagionType.Instant, ContagionType.Complex, ContagionType.Progressive, ContagionType.Chronic];
}

/**
 * Contagion Term.
 */
export enum ContagionTerm {
	Round = 'Round',
	Minute = 'Minute',
	Hour = 'Hour',
	Day = 'Day',
	Week = 'Week',
	Month = 'Month',
}

export namespace ContagionTerm {
	/**
	 * Convenience accessor for all Contagion terms.
	 */
	export const all: ContagionTerm[] = [ContagionTerm.Round, ContagionTerm.Minute, ContagionTerm.Hour, ContagionTerm.Day, ContagionTerm.Week, ContagionTerm.Month];
}

export default abstract class ContagionDataModel extends GearItemDataModel {
	/**
	 * Category for the Contagion item.
	 */
	abstract category: ContagionCategory;

	/**
	 * Information about the Type of the Contagion (p.347).
	 */
	abstract type: {
		/**
		 * Infection mechanic.
		 */
		value: ContagionType;

		/**
		 * Difficulty of Contagion tests.
		 */
		difficulty: number;

		/**
		 * Momentum required in an extended test to overcome the Contagion.
		 */
		momentum: number;
	};

	/**
	 * Frequency contagion tests must be made at to avoid the contagion.
	 */
	abstract term: ContagionTerm;

	/**
	 * Infection vector
	 */
	abstract vector: string;

	/**
	 * Damage value used by the contagion.
	 */
	abstract damage: string;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			category: new fields.StringField({
				initial: ContagionCategory.Disease,
				choices: ContagionCategory.all,
				nullable: false,
			}),

			type: new fields.SchemaField({
				value: new fields.StringField({
					initial: ContagionType.Instant,
					choices: ContagionType.all,
					nullable: false,
				}),

				difficulty: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),

				momentum: new fields.NumberField({
					initial: 1,
					integer: true,
					min: 0,
					nullable: false,
				}),
			}),

			term: new fields.StringField({
				initial: ContagionTerm.Round,
				choices: ContagionTerm.all,
				nullable: false,
			}),

			vector: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			damage: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
