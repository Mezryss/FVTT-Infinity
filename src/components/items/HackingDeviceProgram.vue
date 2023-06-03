<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useItemStore } from '@/stores/itemStore';

const props = withDefaults(
	defineProps<{
		/**
		 * UUID for the Item document representing the program.
		 */
		uuid: string;

		/**
		 * Whether this program can be removed.
		 */
		editable?: boolean;
	}>(),
	{
		editable: false,
	},
);

const emit = defineEmits<{
	(e: 'delete'): Promise<void>;
}>();

const itemStore = useItemStore(props.uuid);
const { name, img } = storeToRefs(itemStore);
</script>

<template>
	<div class="flex flex-nowrap items-center gap-2 p-1 col-span-5 ml-4 rounded-md border-1 border-solid border-slate-900 bg-slate-900 bg-opacity-10 hover:bg-opacity-20 whitespace-nowrap">
		<img class="w-6 h-6" :src="img" />
		<a class="w-full" @click="itemStore.openSheet">{{ name }}</a>
		<a class="px-1" @click="emit('delete')">
			<i class="fas fa-trash" />
		</a>
	</div>
</template>
