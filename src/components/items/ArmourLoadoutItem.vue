<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useItemStore } from '@/stores/itemStore';

import Field from '../Field.vue';

const props = withDefaults(
	defineProps<{
		/**
		 * UUID for the Item document representing the loadout item.
		 */
		uuid: string;

		/**
		 * Whether this loadout item can have its quantity edited.
		 */
		editable?: boolean;

		/**
		 * Quantity of this item currently exists in the loadout.
		 */
		quantity: number;
	}>(),
	{
		editable: false,
	},
);

const emit = defineEmits<{
	(e: 'delete'): Promise<void>;
	(e: 'quantity-changed', newValue: number): Promise<void>;
}>();

const itemStore = useItemStore(props.uuid);
const { name, img } = storeToRefs(itemStore);
</script>

<template>
	<div class="flex flex-nowrap items-center gap-2 p-1 col-span-5 ml-4 rounded-md border-1 border-solid border-slate-900 bg-slate-900 bg-opacity-10 hover:bg-opacity-20 whitespace-nowrap">
		<img :src="img" class="w-6 h-6 aspect-square border-0" />
		<a @click="itemStore.openSheet">{{ name }}</a>
		<Field v-if="editable" type="number" :value="quantity" :min="0" class="text-center w-20" @change="emit('quantity-changed', +$event)" />
		<span v-else>({{ quantity }})</span>
		<div class="w-full" />
		<a v-if="editable" class="px-1" @click="emit('delete')"><i class="fas fa-trash" /></a>
	</div>
</template>
