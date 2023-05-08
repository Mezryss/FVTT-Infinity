import HasBasicItemData from './templates/HasBasicItemData';
import HasGearData from './templates/HasGearData';

/**
 * Program types.
 */
export enum ProgramType {
	/**
	 * Attack programs (SWORD)
	 */
	Sword = 'Sword',

	/**
	 * Control Programs (CLAW)
	 */
	Claw = 'Claw',

	/**
	 * Defensive Programs (SHIELD)
	 */
	Shield = 'Shield',

	/**
	 * Utility Programs (GADGET)
	 */
	Gadget = 'Gadget',

	/**
	 * Intrusion Countermeasures (IC)
	 */
	IC = 'IC',

	/**
	 * Upgrades (UPGRADE)
	 */
	Upgrade = 'Upgrade',
}

export namespace ProgramType {
	/**
	 * Convenience accessor for all program types.
	 */
	export const all: ProgramType[] = [ProgramType.Sword, ProgramType.Claw, ProgramType.Shield, ProgramType.Gadget, ProgramType.IC, ProgramType.Upgrade];
}

export default abstract class ProgramDataModel extends HasGearData(HasBasicItemData(foundry.abstract.DataModel)) {
	/**
	 * Type of program, p.352
	 */
	abstract type: ProgramType;

	/**
	 * Program's Rating.
	 *
	 * Usually one of '-', 'X', or a number.
	 *
	 * X indicates that the value should be changed when purchased based on desired rating, while - indicates irrelevance of rating.
	 */
	abstract rating: string;

	/**
	 * Damage dealt when using the program.
	 */
	abstract damage: string;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			type: new fields.StringField({
				initial: ProgramType.Sword,
				choices: ProgramType.all,
				nullable: false,
			}),

			rating: new fields.StringField({
				initial: '1',
				nullable: false,
			}),

			damage: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
