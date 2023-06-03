<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import AbilityDataModel from '@/item/data/AbilityDataModel';
import { useItemStore } from '@/stores/itemStore';

import Enriched from '../Enriched.vue';
import Field from '../Field.vue';

const props = withDefaults(
	defineProps<{
		/**
		 * UUID for the Item document representing the ability.
		 */
		uuid: string;

		/**
		 * Whether this ability's details can be edited.
		 */
		editable?: boolean;

		/**
		 * Rank of the ability, if it is a ranked ability.
		 */
		rank: number;
	}>(),
	{
		editable: false,
	},
);

const emit = defineEmits<{
	(e: 'delete'): Promise<void>;
	(e: 'rank-changed', newValue: number): Promise<void>;
}>();

const itemStore = useItemStore<AbilityDataModel>(props.uuid);
const { name, system } = storeToRefs(itemStore);
</script>

<template>
	<span class="flex flex-wrap items-center font-roboto-flex gap-x-1 w-full">
		<a v-if="editable" @click="emit('delete')">
			<i class="fas fa-trash" />
		</a>
		<span class="flex">
			<a @click="itemStore.openSheet" class="flex font-semibold whitespace-nowrap">
				<span>{{ name }}</span>
				<template v-if="!editable">
					<span v-if="system?.isRanked" class="pl-1"> {{ rank }}:</span>
					<span v-else>:</span>
				</template>
			</a>
			<template v-if="editable && system?.isRanked">
				<Field type="number" :min="1" :value="rank" @change="emit('rank-changed', +$event)" class="ml-1 w-10 h-6 text-center" />
				<span>:</span>
			</template>
		</span>
		<Enriched v-if="system?.description" :value="system.description" />
	</span>
</template>
