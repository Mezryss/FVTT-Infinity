import IHasDerivedData from '@/dataModel/IHasDerivedData';
import InfinityActor from '../InfinityActor';
import HasAttributes from './templates/HasAttributes';
import HasDescription from './templates/HasDescription';
import HasStress from './templates/HasStress';

/**
 * Adversary Types
 */
export enum AdversaryType {
	Trooper = 'Trooper',
	Elite = 'Elite',
	Nemesis = 'Nemesis',
}

export namespace AdversaryType {
	/**
	 * Convenience accessor for all Adversary Types
	 */
	export const all: AdversaryType[] = [AdversaryType.Trooper, AdversaryType.Elite, AdversaryType.Nemesis];
}

/**
 * Individual Adversary Field of Expertise
 */
type FieldOfExpertise = {
	/**
	 * Expertise Value
	 */
	expertise: number;

	/**
	 * Focus Value
	 */
	focus: number;
};

export default abstract class AdversaryDataModel extends HasStress(HasAttributes(HasDescription(foundry.abstract.DataModel))) implements IHasDerivedData<InfinityActor<AdversaryDataModel>> {
	/**
	 * Adversary Type
	 */
	abstract type: AdversaryType;

	/**
	 * Fields of Expertise
	 */
	abstract fieldsOfExpertise: {
		combat: FieldOfExpertise;
		fortitude: FieldOfExpertise;
		movement: FieldOfExpertise;
		senses: FieldOfExpertise;
		social: FieldOfExpertise;
		technical: FieldOfExpertise;
	};

	/**
	 * Infinity Points for Nemesis adversaries.
	 */
	abstract infinityPoints: number;

	/**
	 * Prepare the maximum value of the adversary's Stress and Harm tracks.
	 *
	 * CRB p.415
	 */
	prepareDerivedData(actor: InfinityActor<AdversaryDataModel>) {
		const system = actor.system;

		let maxFirewall = system.stress.firewall.max;
		let maxResolve = system.stress.resolve.max;
		let maxVigour = system.stress.vigour.max;

		const breaches = system.harms.breaches;
		const metanoia = system.harms.metanoia;
		const wounds = system.harms.wounds;

		switch (actor.system.type) {
			case AdversaryType.Trooper:
				maxFirewall = Math.ceil(system.attributes.Intelligence / 2);
				maxResolve = Math.ceil(system.attributes.Willpower / 2);
				maxVigour = Math.ceil(system.attributes.Brawn / 2);

				breaches.max = metanoia.max = wounds.max = 1;

				break;

			case AdversaryType.Elite:
				maxFirewall = system.attributes.Intelligence;
				maxResolve = system.attributes.Willpower;
				maxVigour = system.attributes.Brawn;

				breaches.max = metanoia.max = wounds.max = 2;

				break;

			case AdversaryType.Nemesis:
				maxFirewall = system.attributes.Intelligence + system.fieldsOfExpertise.technical.expertise;
				maxResolve = system.attributes.Willpower + system.fieldsOfExpertise.fortitude.expertise;
				maxVigour = system.attributes.Brawn + system.fieldsOfExpertise.fortitude.expertise;

				breaches.max = metanoia.max = wounds.max = 5;

				break;
		}

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

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			type: new fields.StringField({
				initial: AdversaryType.Trooper,
				choices: AdversaryType.all,
				nullable: false,
			}),

			fieldsOfExpertise: new fields.SchemaField({
				combat: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				fortitude: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				movement: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				senses: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				social: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),

				technical: new fields.SchemaField({
					expertise: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),

					focus: new fields.NumberField({
						initial: 0,
						integer: true,
						nullable: false,
					}),
				}),
			}),

			infinityPoints: new fields.NumberField({
				initial: 0,
				integer: true,
				min: 0,
				nullable: false,
			}),
		};
	}
}
