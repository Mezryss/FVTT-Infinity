import { ALL_LIFESTYLE_RATINGS, LifestyleRating } from '@/data/gear.ts';
import { GearDataModel } from '@/items/models/gear.ts';

const { StringField } = foundry.data.fields;

export class LifestyleDataModel extends GearDataModel {
	/**
	 * Lifestyle Rating.
	 */
	rating!: LifestyleRating;

	static defineSchema() {
		return {
			...super.defineSchema(),

			rating: new StringField({
				choices: ALL_LIFESTYLE_RATINGS,
				initial: LifestyleRating.Demogrant,
				nullable: false,
				trim: true,
			}),
		};
	}
}
