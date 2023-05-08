import { TemplateConstructor } from '@/dataModel/DataTemplates';

/**
 * Adds a 'description' HTMLField to target data model.
 */
export default function HasDescription<BaseClass extends TemplateConstructor>(baseClass: BaseClass) {
	abstract class TemplateClass extends baseClass {
		/**
		 * Rich HTML description of the actor.
		 */
		abstract description: string;

		static override defineSchema(): foundry.data.fields.DataSchema {
			const fields = foundry.data.fields;

			return {
				...super.defineSchema(),

				description: new fields.HTMLField({
					initial: '',
					nullable: false,
				}),
			};
		}
	}

	return TemplateClass;
}
