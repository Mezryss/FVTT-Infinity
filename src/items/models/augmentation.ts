import {
	ALL_AUGMENTATION_CATEGORIES,
	ALL_AUGMENTATION_TYPES,
	AugmentationCategory,
	AugmentationType,
} from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';

const { StringField } = foundry.data.fields;

/**
 * Augmentations that can be applied to a character's LHost
 */
export class AugmentationDataModel extends GearDataModel {
	/**
	 * Augmentation Type
	 */
	type!: AugmentationType;

	/**
	 * Augmentation Category
	 */
	category!: AugmentationCategory;

	/**
	 * Where the augmentation is installed in the character's body.
	 */
	location!: string;

	static defineSchema() {
		return {
			...super.defineSchema(),

			type: new StringField({
				choices: ALL_AUGMENTATION_TYPES,
				initial: AugmentationType.Implant,
				nullable: false,
				trim: true,
			}),

			category: new StringField({
				choices: ALL_AUGMENTATION_CATEGORIES,
				initial: AugmentationCategory.Cybernetics,
				nullable: false,
				trim: true,
			}),

			location: new StringField({
				initial: '',
				nullable: false,
				trim: true,
			}),
		};
	}
}
