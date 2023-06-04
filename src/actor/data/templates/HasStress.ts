import { TemplateConstructor } from '@/dataModel/DataTemplates';

/**
 * Simplified reference to a data model that has Harms.
 */
export type HasHarmsData = {
	/**
	 * Harms
	 */
	harms: {
		/**
		 * Quantronic Harm
		 */
		breaches: HarmTrack;

		/**
		 * Mental Harm
		 */
		metanoia: HarmTrack;

		/**
		 * Physical Harm
		 */
		wounds: HarmTrack;
	};
};

/**
 * (Refactor) Tracks current/max value for stress.
 */
type StressTrack = {
	value: number;
	max: number;
};

/**
 * (Refactor) Tracks current/max value for a type of Harm, as well as a list of Harm Effects.
 */
type HarmTrack = {
	effects: string[];
	value: number;
	max: number;
};

/**
 * Adds Stress, Defences, and Harms to target data model.
 */
export default function HasStress<BaseClass extends TemplateConstructor>(baseClass: BaseClass) {
	abstract class TemplateClass extends baseClass {
		/**
		 * Stress Tracks
		 */
		abstract stress: {
			firewall: StressTrack;
			vigour: StressTrack;
			resolve: StressTrack;
		};

		/**
		 * Defences
		 */
		abstract defences: {
			security: number;
			morale: number;
			armour: number;
		};

		/**
		 * Harms
		 */
		abstract harms: {
			/**
			 * Quantronic Harm
			 */
			breaches: HarmTrack;

			/**
			 * Mental Harm
			 */
			metanoia: HarmTrack;

			/**
			 * Physical Harm
			 */
			wounds: HarmTrack;
		};

		static override defineSchema(): foundry.data.fields.DataSchema {
			const fields = foundry.data.fields;

			return {
				...super.defineSchema(),

				stress: new fields.SchemaField({
					firewall: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),

						max: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					vigour: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),

						max: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					resolve: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),

						max: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),
				}),

				defences: new fields.SchemaField({
					security: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					morale: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),

					armour: new fields.NumberField({
						initial: 0,
						integer: true,
						min: 0,
						nullable: false,
					}),
				}),

				harms: new fields.SchemaField({
					breaches: new fields.SchemaField({
						effects: new fields.ArrayField(
							new fields.StringField({
								initial: '',
								nullable: false,
							}),
							{
								initial: [],
								nullable: false,
							},
						),

						value: new fields.NumberField({
							initial: 0,
							integer: true,
							nullable: false,
						}),

						max: new fields.NumberField({
							initial: 0,
							integer: true,
							nullable: false,
						}),
					}),

					metanoia: new fields.SchemaField({
						effects: new fields.ArrayField(
							new fields.StringField({
								initial: '',
								nullable: false,
							}),
							{
								initial: [],
								nullable: false,
							},
						),

						value: new fields.NumberField({
							initial: 0,
							integer: true,
							nullable: false,
						}),

						max: new fields.NumberField({
							initial: 0,
							integer: true,
							nullable: false,
						}),
					}),

					wounds: new fields.SchemaField({
						effects: new fields.ArrayField(
							new fields.StringField({
								initial: '',
								nullable: false,
							}),
							{
								initial: [],
								nullable: false,
							},
						),

						value: new fields.NumberField({
							initial: 0,
							integer: true,
							nullable: false,
						}),

						max: new fields.NumberField({
							initial: 0,
							integer: true,
							nullable: false,
						}),
					}),
				}),
			};
		}
	}

	return TemplateClass;
}
