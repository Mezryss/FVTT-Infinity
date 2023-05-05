import { AugmentationCategory, AugmentationType } from '@/data/Augmentations';
import GearItemDataModel from './templates/GearItemDataModel';

export default abstract class AugmentationDataModel extends GearItemDataModel {
	/**
	 * Augmentation Type (p.344)
	 */
	abstract type: AugmentationType;

	/**
	 * Augmentation Category (p.344)
	 */
	abstract category: AugmentationCategory;

	/**
	 * Location that an augmentation has been installed, if relevant (for example for Replacements)
	 */
	abstract location: string;

	/**
	 * @inheritdoc
	 */
	static override defineSchema() {
		const fields = foundry.data.fields;

		return {
			...super.defineSchema(),

			type: new fields.StringField({
				initial: AugmentationType.Implant,
				choices: AugmentationType.all,
				nullable: false,
			}),

			category: new fields.StringField({
				initial: AugmentationCategory.Cybernetic,
				choices: AugmentationCategory.all,
				nullable: false,
			}),

			location: new fields.StringField({
				initial: '',
				nullable: false,
			}),
		};
	}
}
