import {
	ALL_AUGMENTATION_CATEGORIES,
	ALL_AUGMENTATION_TYPES,
	AugmentationCategory,
	AugmentationType,
} from '@/data/gear';
import { GearQuality } from './quality';

const { DataModel } = foundry.abstract;
const { ArrayField, EmbeddedDataField, StringField } = foundry.data.fields;

/**
 * Augmentations. CRB, p.344
 */
export class AugmentationData extends DataModel {
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

	/**
	 * Augmentation Qualities
	 */
	qualities!: GearQuality[];

	static defineSchema() {
		return {
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

			qualities: new ArrayField(new EmbeddedDataField(GearQuality as any), {
				initial: [],
				nullable: false,
			}),
		};
	}
}
