<!--
	Input field for a list of Item Qualities, allowing for handling of changing ranks & specialization
	values, as well as removing an individual quality.
-->
<script lang="ts" setup>
import { computed } from 'vue';
import InfinityItem from '@/item/InfinityItem';
import ItemQualityDataModel, { ItemQualityReference } from '@/item/data/ItemQualityDataModel';

const props = withDefaults(
	defineProps<{
		/**
		 * The list of Item Quality references.
		 */
		qualities: ItemQualityReference[];

		/**
		 * Whether or not the list is editable.
		 */
		editable?: boolean;
	}>(),
	{
		editable: false,
	},
);

const emit = defineEmits<{
	(e: 'rank-changed', index: number, newRank: number): void;
	(e: 'specialization-changed', index: number, newSpecialization: string): void;
	(e: 'remove', index: number): void;
}>();

/**
 * Item qualities aren't actually embedded, and instead are listed as UUIDs with their associated Name, Rank, & Specialization data.
 *
 * We need to fetch the actual Items' system data for the list for display, though.
 */
const loadedQualities = computed(() => {
	return props.qualities.map((quality) => {
		const item = fromUuidSync(quality.uuid) as InfinityItem<ItemQualityDataModel>;

		return {
			...quality,
			system: item?.system,
		};
	});
});

/**
 * Opens the sheet view for the given item UUID, if the UUID still exists and is valid.
 *
 * @param uuid Item UUID to display.
 */
async function openItem(uuid: string) {
	const item = await fromUuid(uuid);
	item?.sheet?.render(true);
}
</script>

<template>
	<div class="flex flex-col flex-nowrap">
		<h3>Item Qualities</h3>
		<em v-if="qualities.length === 0">No Qualities Added</em>
		<div v-else class="flex flex-wrap gap-x-1 gap-y-1">
			<div v-for="(quality, index) in loadedQualities" :key="quality.uuid" class="flex gap-1 items-center bg-slate-400 rounded-md border-[1px] border-solid border-slate-900 p-1">
				<a @click="openItem(quality.uuid)">{{ quality.name }}</a>
				<template v-if="editable">
					<!-- Specialization -->
					<input
						v-if="editable && quality.system?.isSpecialized"
						type="text"
						class="text-xs w-20"
						:value="quality.specialization"
						:placeholder="quality.system.specializationPlaceholder"
						@change="emit('specialization-changed', index, ($event.currentTarget as HTMLInputElement).value)"
					/>

					<!-- Rank -->
					<input v-if="editable && quality.system?.isRanked" type="number" class="text-xs w-8 text-center" :min="1" :value="quality.rank" @change="emit('rank-changed', index, +($event.currentTarget as HTMLInputElement).value)" />

					<!-- Delete Action -->
					<a @click="emit('remove', index)" class="px-1 relative text-xl -my-2">&times;</a>
				</template>
				<template v-else>
					<span class="text-xs text-slate-700" v-if="quality.system?.isSpecialized">{{ quality.specialization || quality.system?.specializationPlaceholder }}</span>
					<span class="text-xs text-slate-700" v-if="quality.system?.isRanked">{{ quality.rank }}</span>
				</template>
			</div>
		</div>
	</div>
</template>
