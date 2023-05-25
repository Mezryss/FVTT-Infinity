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

export default abstract class AdversaryDataModel extends HasStress(HasAttributes(HasDescription(foundry.abstract.TypeDataModel))) {
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
	override prepareDerivedData() {
		let maxFirewall = this.stress.firewall.max;
		let maxResolve = this.stress.resolve.max;
		let maxVigour = this.stress.vigour.max;

		const breaches = this.harms.breaches;
		const metanoia = this.harms.metanoia;
		const wounds = this.harms.wounds;

		switch (this.type) {
			case AdversaryType.Trooper:
				maxFirewall = Math.ceil(this.attributes.Intelligence.value / 2);
				maxResolve = Math.ceil(this.attributes.Willpower.value / 2);
				maxVigour = Math.ceil(this.attributes.Brawn.value / 2);

				breaches.max = metanoia.max = wounds.max = 1;

				break;

			case AdversaryType.Elite:
				maxFirewall = this.attributes.Intelligence.value;
				maxResolve = this.attributes.Willpower.value;
				maxVigour = this.attributes.Brawn.value;

				breaches.max = metanoia.max = wounds.max = 2;

				break;

			case AdversaryType.Nemesis:
				maxFirewall = this.attributes.Intelligence.value + this.fieldsOfExpertise.technical.expertise;
				maxResolve = this.attributes.Willpower.value + this.fieldsOfExpertise.fortitude.expertise;
				maxVigour = this.attributes.Brawn.value + this.fieldsOfExpertise.fortitude.expertise;

				breaches.max = metanoia.max = wounds.max = 5;

				break;
		}

		this.stress.firewall.max = maxFirewall;
		this.stress.resolve.max = maxResolve;
		this.stress.vigour.max = maxVigour;

		breaches.value = breaches.effects.length;
		metanoia.value = metanoia.effects.length;
		wounds.value = wounds.effects.length;

		this.harms.breaches = breaches;
		this.harms.metanoia = metanoia;
		this.harms.wounds = wounds;
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
