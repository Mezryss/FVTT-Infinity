import { ALL_QUALITY_TYPES, QualityType } from '@/data/quality';

import { InfinityItemDataModel } from './infinity-item';

const { BooleanField, StringField } = foundry.data.fields;

/**
 * Data model for Qualities that can be applied to items.
 *
 * Item Qualities are not automated in any way, but Active Effects are available on Quality item sheets.
 */
export class QualityDataModel extends InfinityItemDataModel {
	/**
	 * What type of Quality is it?
	 */
	type!: QualityType;

	/**
	 * Some Qualities appear with an Abbreviation instead of their full name.
	 *
	 * An empty string indicates the Quality is not abbreviated.
	 */
	abbreviation!: string;

	/**
	 * Ranked qualities are listed in the book as "Quality X" (with X being a number).
	 */
	ranked!: boolean;

	static override defineSchema() {
		const baseSchema = super.defineSchema();

		return {
			...baseSchema,

			type: new StringField({
				choices: ALL_QUALITY_TYPES,
				initial: QualityType.General,
				nullable: false,
				trim: true,
			}),

			abbreviation: new StringField({
				initial: '',
				nullable: false,
			}),

			ranked: new BooleanField({
				initial: false,
				nullable: false,
			}),
		};
	}
}
