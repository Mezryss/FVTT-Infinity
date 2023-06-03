<!--
	A pill view for displaying item qualities.
-->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import ItemQualityDataModel from '@/item/data/ItemQualityDataModel';
import { useItemStore } from '@/stores/itemStore';

import Field from '../Field.vue';

const props = withDefaults(
	defineProps<{
		/**
		 * UUID for the Item document representing the Item Quality.
		 */
		uuid: string;

		/**
		 * Whether this pill allows editing Rank & Specialization.
		 */
		editable?: boolean;

		/**
		 * Current specialization for the quality.
		 */
		specialization?: string;

		/**
		 * Current rank of the quality.
		 */
		rank?: number;
	}>(),
	{
		editable: false,
	},
);

const emit = defineEmits<{
	(e: 'delete'): Promise<void>;
	(e: 'rank-changed', newValue: number): Promise<void>;
	(e: 'specialization-changed', newValue: string): Promise<void>;
}>();

const itemStore = useItemStore<ItemQualityDataModel>(props.uuid);
const { name, system } = storeToRefs(itemStore);
</script>

<template>
	<div class="flex gap-1 items-center rounded-md border-[1px] border-solid border-slate-900 px-1 py-0.5 bg-slate-900 bg-opacity-10 hover:bg-opacity-20">
		<a @click="itemStore.openSheet" class="flex gap-1">
			<span>{{ name }}</span>
			<template v-if="!editable">
				<span v-if="system?.isSpecialized">({{ specialization || system?.specializationPlaceholder }})</span>
				<span v-if="system?.isRanked"></span>
			</template>
		</a>

		<template v-if="editable">
			<Field
				v-if="system?.isSpecialized"
				type="text"
				class="text-sm w-20 text-center rounded-sm h-6"
				:value="specialization ?? ''"
				:placeholder="system.specializationPlaceholder"
				@change="emit('specialization-changed', $event as string)"
			/>

			<Field v-if="system?.isRanked" type="number" class="text-sm w-8 text-center rounded-sm h-6" :min="1" :value="rank ?? 0" @change="emit('rank-changed', +$event)" />

			<a @click="emit('delete')" class="px-1 relative text-sm -my-2">
				<i class="fas fa-trash" />
			</a>
		</template>
	</div>
</template>
