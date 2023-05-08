import { TemplateConstructor } from '@/dataModel/DataTemplates';

/**
 * Adds 'description' and 'source' fields to target data model.
 */
export default function HasBasicItemData<BaseClass extends TemplateConstructor>(baseClass: BaseClass) {
	abstract class TemplateClass extends baseClass {
		/**
		 * Rich HTML description of the item.
		 */
		abstract description: string;

		/**
		 * Source the item originates from 9for example, "Core Rulebook, p.75")
		 */
		abstract source: string;

		static override defineSchema(): foundry.data.fields.DataSchema {
			const fields = foundry.data.fields;

			return {
				description: new fields.HTMLField({
					initial: '',
					nullable: false,
				}),
				source: new fields.StringField({
					initial: 'Core Rulebook',
					nullable: false,
				}),
			};
		}
	}

	return TemplateClass;
}
