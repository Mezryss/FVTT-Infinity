import Skill from '@/data/Skill';

import HasAttributes from './templates/HasAttributes';
import HasDescription from './templates/HasDescription';
import HasStress from './templates/HasStress';

type GeistSkill = {
	skill: Skill;
	expertise: number;
	focus: number;
};

export default abstract class GeistDataModel extends HasStress(HasAttributes(HasDescription(foundry.abstract.TypeDataModel))) {
	/**
	 * UUID of the Character this Geist belongs to.
	 */
	abstract characterUuid: string;

	/**
	 * List of skills the Geist has acquired.
	 */
	abstract skills: GeistSkill[];

	/**
	 * List of Traits the Geist has.
	 */
	abstract traits: string[];

	/**
	 * Prepare the maximum value of the geist's Stress and Harm tracks.
	 *
	 * CRB p.415
	 */
	override prepareDerivedData() {
		let maxFirewall = this.stress.firewall.max;
		let maxResolve = this.stress.resolve.max;

		const breaches = this.harms.breaches;
		const metanoia = this.harms.metanoia;

		const hacking = this.skills.find((s) => s.skill === Skill.Hacking);
		const discipline = this.skills.find((s) => s.skill === Skill.Discipline);

		maxFirewall = this.attributes.Intelligence.value + (hacking?.expertise ?? 0);
		maxResolve = this.attributes.Willpower.value + (discipline?.expertise ?? 0);

		breaches.max = metanoia.max = 5;

		this.stress.firewall.max = maxFirewall;
		this.stress.resolve.max = maxResolve;

		breaches.value = breaches.effects.length;
		metanoia.value = metanoia.effects.length;

		this.harms.breaches = breaches;
		this.harms.metanoia = metanoia;
	}

	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			characterUuid: new fields.StringField({
				initial: '',
				nullable: false,
			}),

			skills: new fields.ArrayField(
				new fields.SchemaField({
					skill: new fields.StringField({
						initial: Skill.Acrobatics,
						choices: Skill.all,
						nullable: false,
					}),

					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),
				{
					initial: [],
					nullable: false,
				},
			),

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
		};
	}
}
