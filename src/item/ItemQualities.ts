import InfinityItem from './InfinityItem';
import InfinityItemSheet from './InfinityItemSheet';
import ItemQualityDataModel, { ItemQualityReference } from './data/ItemQualityDataModel';
import HasGearData from './data/templates/HasGearData';

// TODO: For some reason Vite isn't tree-shaking this out of the built JS. Find a better way to handle this.
abstract class GearDataModel extends HasGearData(foundry.abstract.DataModel) {}

export type ItemQualitiesActions = {
	/**
	 * Adds an Item Quality to the item's list of item quality references.
	 *
	 * @param quality Quality document to reference.
	 */
	addItemQuality: (quality?: InfinityItem<ItemQualityDataModel>) => Promise<void>;

	/**
	 * Update the stored values for the quality with the specified UUID.
	 *
	 * @param uuid UUID of the item quality to update.
	 * @param newValue New values to use.
	 */
	updateItemQuality: (uuid: string, newValues: Partial<ItemQualityReference>) => Promise<void>;

	/**
	 * Remove the Item Quality with the specified UUID.
	 *
	 * @param uuid UUID of the item quality to remove.
	 */
	removeItemQuality: (uuid: string) => Promise<void>;
};

/**
 * Adds an Item Quality to the item's list of item quality references.
 *
 * @param this An ItemSheet that the function should be bound to.
 * @param quality Quality document to reference
 */
export async function addItemQuality(this: InfinityItemSheet<GearDataModel>, quality?: InfinityItem<ItemQualityDataModel>) {
	// Don't process undefined items or items that aren't Item Qualities.
	if (!quality || quality.type !== 'itemQuality') {
		return;
	}

	// Don't allow duplicate copies of the same Item Quality
	if (this.item.system.qualities.find((q) => q.uuid === quality.uuid)) {
		return;
	}

	console.error(quality.system);

	await this.item.update({
		'system.qualities': [
			...this.item.system.qualities,
			{
				uuid: quality.uuid,
				name: quality.name,
				rank: quality.system.isRanked ? 1 : 0,
				specialization: '',
			},
		] as ItemQualityReference[],
	});
}

/**
 * Update the stored values for the quality with the specified UUID.
 *
 * @param this An ItemSheet that the function should be bound to.
 * @param uuid UUID of the item quality to update.
 * @param newValue New values to use.
 */
export async function updateItemQuality(this: InfinityItemSheet<GearDataModel>, uuid: string, newValues: Partial<ItemQualityReference>) {
	const qualities = [...this.item.system.qualities];

	const qualityIdx = qualities.findIndex((q) => q.uuid === uuid);
	if (qualityIdx < 0) {
		return;
	}

	qualities[qualityIdx] = {
		...qualities[qualityIdx],
		...newValues,
		// Ensure UUID is never accidentally changed.
		uuid: qualities[qualityIdx].uuid,
	};

	await this.item.update({
		'system.qualities': qualities,
	});
}

/**
 * Remove the Item Quality with the specified UUID.
 *
 * @param this An ItemSheet that the function should be bound to.
 * @param uuid UUID of the item quality to remove.
 */
export async function removeItemQuality(this: InfinityItemSheet<GearDataModel>, uuid: string) {
	await this.item.update({
		'system.qualities': this.item.system.qualities.filter((q) => q.uuid !== uuid),
	});
}
