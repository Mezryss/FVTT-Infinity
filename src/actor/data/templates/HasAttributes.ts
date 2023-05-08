import Attribute from '@/data/Attributes';
import { TemplateConstructor } from '@/dataModel/DataTemplates';

/**
 * Adds character attributes to target data model.
 */
export default function HasAttributes<BaseClass extends TemplateConstructor>(baseClass: BaseClass) {
	abstract class TemplateClass extends baseClass {
		/**
		 * Attributes
		 */
		abstract attributes: {
			[Attribute.Agility]: number;
			[Attribute.Awareness]: number;
			[Attribute.Brawn]: number;
			[Attribute.Coordination]: number;
			[Attribute.Intelligence]: number;
			[Attribute.Personality]: number;
			[Attribute.Willpower]: number;
		};

		static override defineSchema(): foundry.data.fields.DataSchema {
			const fields = foundry.data.fields;

			return {
				...super.defineSchema(),

				attributes: new fields.SchemaField({
					[Attribute.Agility]: new fields.NumberField({
						initial: 7,
						integer: true,
						nullable: false,
					}),

					[Attribute.Awareness]: new fields.NumberField({
						initial: 7,
						integer: true,
						nullable: false,
					}),

					[Attribute.Brawn]: new fields.NumberField({
						initial: 7,
						integer: true,
						nullable: false,
					}),

					[Attribute.Coordination]: new fields.NumberField({
						initial: 7,
						integer: true,
						nullable: false,
					}),

					[Attribute.Intelligence]: new fields.NumberField({
						initial: 7,
						integer: true,
						nullable: false,
					}),

					[Attribute.Personality]: new fields.NumberField({
						initial: 7,
						integer: true,
						nullable: false,
					}),

					[Attribute.Willpower]: new fields.NumberField({
						initial: 7,
						integer: true,
						nullable: false,
					}),
				}),
			};
		}
	}

	return TemplateClass;
}
