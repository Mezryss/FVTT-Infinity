import Skill from '@/data/Skill';
import IHasDerivedData from '@/dataModel/IHasDerivedData';
import InfinityActor from '../InfinityActor';
import HasAttributes from './templates/HasAttributes';
import HasDescription from './templates/HasDescription';
import HasStress from './templates/HasStress';

type GeistSkill = {
	skill: Skill;
	expertise: number;
	focus: number;
};

export default abstract class GeistDataModel extends HasStress(HasAttributes(HasDescription(foundry.abstract.DataModel))) implements IHasDerivedData<InfinityActor<GeistDataModel>> {
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
	prepareDerivedData(actor: InfinityActor<GeistDataModel>) {
		const system = actor.system;

		let maxFirewall = system.stress.firewall.max;
		let maxResolve = system.stress.resolve.max;
		let maxVigour = system.stress.vigour.max;

		const breaches = system.harms.breaches;
		const metanoia = system.harms.metanoia;
		const wounds = system.harms.wounds;

		// TODO: Tie these to appropriate Skills on the Geist.
		maxFirewall = system.attributes.Intelligence.value; // + system.fieldsOfExpertise.technical.expertise;
		maxResolve = system.attributes.Willpower.value; // + system.fieldsOfExpertise.fortitude.expertise;
		maxVigour = system.attributes.Brawn.value; // + system.fieldsOfExpertise.fortitude.expertise;

		breaches.max = metanoia.max = wounds.max = 5;

		actor.system.stress.firewall.max = maxFirewall;
		actor.system.stress.resolve.max = maxResolve;
		actor.system.stress.vigour.max = maxVigour;

		breaches.value = breaches.effects.length;
		metanoia.value = metanoia.effects.length;
		wounds.value = wounds.effects.length;

		actor.system.harms.breaches = breaches;
		actor.system.harms.metanoia = metanoia;
		actor.system.harms.wounds = wounds;
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
