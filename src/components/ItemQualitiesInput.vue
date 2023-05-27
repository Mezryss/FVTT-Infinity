<!--
	Input field for a list of Item Qualities, allowing for handling of changing ranks & specialization
	values, as well as removing an individual quality.
-->
<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';
import { ItemQualitiesActions } from '@/item/ItemQualities';
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

const context = inject<{
	actions?: ItemQualitiesActions;
}>(RootContext)!;

const actions = computed(() => context.actions);

async function rankChanged(uuid: string, newRank: number) {
	await actions.value?.updateItemQuality(uuid, {
		rank: newRank,
	});
}

async function specializationChanged(uuid: string, newSpec: string) {
	await actions.value?.updateItemQuality(uuid, {
		specialization: newSpec,
	});
}

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
		<span class="text-lg font-orbitron font-semibold">Item Qualities</span>
		<em class="ml-4" v-if="qualities.length === 0">No Qualities Added</em>
		<div v-else class="flex flex-wrap gap-1 ml-4">
			<div v-for="quality in loadedQualities" :key="quality.uuid" class="flex gap-1 items-center rounded-md border-[1px] border-solid border-slate-900 px-1 py-0.5 bg-slate-900 bg-opacity-10">
				<a @click="openItem(quality.uuid)" class="flex gap-1">
					<span>{{ quality.name }}</span>
					<template v-if="!editable">
						<span v-if="quality.system?.isSpecialized">({{ quality.specialization || quality.system?.specializationPlaceholder }})</span>
						<span v-if="quality.system?.isRanked">{{ quality.rank }}</span>
					</template>
				</a>
				<template v-if="editable">
					<!-- Specialization -->
					<input
						v-if="editable && quality.system?.isSpecialized"
						type="text"
						class="text-sm w-20 text-center rounded-sm h-6"
						:value="quality.specialization"
						:placeholder="quality.system.specializationPlaceholder"
						@change="specializationChanged(quality.uuid, ($event.currentTarget as HTMLInputElement).value)"
					/>

					<!-- Rank -->
					<input
						v-if="editable && quality.system?.isRanked"
						type="number"
						class="text-sm w-8 text-center rounded-sm h-6"
						:min="1"
						:value="quality.rank"
						@change="rankChanged(quality.uuid, +($event.currentTarget as HTMLInputElement).value)"
					/>

					<!-- Delete Action -->
					<a @click="actions?.removeItemQuality(quality.uuid)" class="px-1 relative text-sm -my-2">
						<i class="fas fa-trash" />
					</a>
				</template>
			</div>
		</div>
	</div>
</template>
