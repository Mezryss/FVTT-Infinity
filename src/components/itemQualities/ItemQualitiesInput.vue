<!--
	Input field for a list of Item Qualities, allowing for handling of changing ranks & specialization
	values, as well as removing an individual quality.
-->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { HasItemQualities, ItemQualityReference } from '@/item/data/ItemQualityDataModel';
import { useItemStore } from '@/stores/itemStore';

import ItemQualityPill from './ItemQualityPill.vue';

const itemStore = useItemStore();
const { editable, system } = storeToRefs(itemStore);
const qualities = computed(() => (system.value as unknown as HasItemQualities).qualities);

/**
 * Updates the source item with changes to a specific item quality.
 *
 * @param uuid UUID of the quality to be updated.
 * @param newValue A collection of values to change for the item quality.
 */
async function updateQuality(uuid: string, newValue: Partial<ItemQualityReference>) {
	const qualitiesCopy = [...qualities.value];

	const qualityIdx = qualitiesCopy.findIndex((q) => q.uuid === uuid);
	if (qualityIdx < 0) {
		return;
	}

	qualitiesCopy[qualityIdx] = {
		...qualitiesCopy[qualityIdx],
		...newValue,
		// Ensure UUID is never accidentally changed.
		uuid,
	};

	await itemStore.update({
		'system.qualities': qualitiesCopy,
	});
}

/**
 * Removes an Item Quality reference from the source item.
 *
 * @param uuid UUID of the quality to be removed.
 */
async function deleteQuality(uuid: string) {
	await itemStore.update({
		'system.qualities': qualities.value.filter((q) => q.uuid !== uuid),
	});
}
</script>

<template>
	<div class="flex flex-col flex-nowrap">
		<span class="text-lg font-orbitron font-semibold">Item Qualities</span>
		<em class="ml-4" v-if="qualities.length === 0">No Qualities Added</em>
		<div v-else class="flex flex-wrap gap-1 ml-4">
			<ItemQualityPill
				v-for="quality in qualities"
				:key="quality.uuid"
				:uuid="quality.uuid"
				:editable="editable"
				:rank="quality.rank"
				:specialization="quality.specialization"
				@delete="deleteQuality(quality.uuid)"
				@rank-changed="updateQuality(quality.uuid, { rank: +$event })"
				@specialization-changed="updateQuality(quality.uuid, { specialization: $event })"
			/>
		</div>
	</div>
</template>
