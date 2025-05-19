import { ALL_LIFESTYLE_RATINGS, LifestyleRating } from '@/data/gear.ts';

const { DataModel } = foundry.abstract;
const { StringField } = foundry.data.fields;

/**
 * Lifestyles. CRB, p.387
 */
export class LifestyleData extends DataModel {
	/**
	 * Lifestyle Rating.
	 */
	rating!: LifestyleRating;

	static defineSchema() {
		return {
			rating: new StringField({
				choices: ALL_LIFESTYLE_RATINGS,
				initial: LifestyleRating.Demogrant,
				nullable: false,
				trim: true,
			}),
		};
	}
}
