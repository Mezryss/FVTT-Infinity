import Attribute from '@/data/Attributes';
import { TemplateConstructor } from '@/dataModel/DataTemplates';

type AttributeValue = {
	/**
	 * The actual base value of the Attribute.
	 */
	value: number;

	/**
	 * Superhuman Attribute X (p.418)
	 *
	 * This won't be entered directly, but should instead be set by ActiveEffects.
	 */
	superhuman: number;
};

/**
 * Adds character attributes to target data model.
 */
export default function HasAttributes<BaseClass extends TemplateConstructor>(baseClass: BaseClass) {
	abstract class TemplateClass extends baseClass {
		/**
		 * Attributes
		 */
		abstract attributes: {
			[Attribute.Agility]: AttributeValue;
			[Attribute.Awareness]: AttributeValue;
			[Attribute.Brawn]: AttributeValue;
			[Attribute.Coordination]: AttributeValue;
			[Attribute.Intelligence]: AttributeValue;
			[Attribute.Personality]: AttributeValue;
			[Attribute.Willpower]: AttributeValue;
		};

		static override defineSchema(): foundry.data.fields.DataSchema {
			const fields = foundry.data.fields;

			return {
				...super.defineSchema(),

				attributes: new fields.SchemaField({
					[Attribute.Agility]: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 7,
							integer: true,
							min: 0,
							nullable: false,
						}),

						superhuman: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					[Attribute.Awareness]: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 7,
							integer: true,
							min: 0,
							nullable: false,
						}),

						superhuman: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					[Attribute.Brawn]: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 7,
							integer: true,
							min: 0,
							nullable: false,
						}),

						superhuman: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					[Attribute.Coordination]: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 7,
							integer: true,
							min: 0,
							nullable: false,
						}),

						superhuman: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					[Attribute.Intelligence]: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 7,
							integer: true,
							min: 0,
							nullable: false,
						}),

						superhuman: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					[Attribute.Personality]: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 7,
							integer: true,
							min: 0,
							nullable: false,
						}),

						superhuman: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),

					[Attribute.Willpower]: new fields.SchemaField({
						value: new fields.NumberField({
							initial: 7,
							integer: true,
							min: 0,
							nullable: false,
						}),

						superhuman: new fields.NumberField({
							initial: 0,
							integer: true,
							min: 0,
							nullable: false,
						}),
					}),
				}),
			};
		}
	}

	return TemplateClass;
}
