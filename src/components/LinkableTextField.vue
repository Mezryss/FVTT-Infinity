<!--
	Provides a text input that can either be typed into, or will accept a dropped document for a link.
-->

<script lang="ts" setup>
import { computed, inject, ref, toRaw } from 'vue';

import { RootContext } from '@/VueSheet';

import Enriched from './Enriched.vue';

const props = defineProps<{
	/**
	 * Name of the field (e.g. system.source)
	 */
	name: string;

	/**
	 * Current value of the field
	 */
	value: string;

	/**
	 * CSS Classes for the <input> field.
	 */
	inputClasses?: string | Record<string, boolean>;
}>();

/**
 * Test for Foundry's UUID enricher format to determine if we're currently linking a document.
 */
const isLinked = computed(() => /^@UUID\[.*\]{.*}$/i.test(props.value));

/**
 * Current number of dragEnter events - dragLeave events that have triggered.
 *
 * This needs to be a number (rather than boolean) b/c the drag events trigger when entering/leaving children as well.
 */
const dragCount = ref(0);

/**
 * This component directly edits the injected document rather than relying on form submission to have Foundry update.
 */
const context = inject<{ document: foundry.abstract.Document }>(RootContext)!;

/**
 * Updates the injected Document with the new value.
 *
 * @param newValue New value to store.
 */
async function updateValue(newValue = '') {
	await toRaw(context.document).update({
		[props.name]: newValue,
	});
}

function dragEnter() {
	dragCount.value++;
}

function dragLeave() {
	dragCount.value = Math.max(0, dragCount.value - 1);
}

/**
 * When something is dropped on this field, we want to look for a document UUID and link to it.
 *
 * @param event Event data
 */
async function drop(event: DragEvent) {
	const dragSource = JSON.parse(event.dataTransfer?.getData('text/plain') ?? '{}');
	if (!dragSource.uuid) {
		return;
	}

	const draggedDocument = await fromUuid(dragSource.uuid);

	updateValue(`@UUID[${dragSource.uuid}]{${draggedDocument?.name ?? 'Linked'}}`);

	dragCount.value = 0;
}
</script>

<template>
	<span
		class="flex items-center gap-1 w-full py-1 border-[1px] rounded-sm border-dashed border-transparent h-7"
		:class="{
			'border-sky-400 bg-sky-400 bg-opacity-10': dragCount > 0,
		}"
		@dragenter="dragEnter"
		@dragleave="dragLeave"
		@drop="drop"
	>
		<template v-if="isLinked">
			<Enriched :value="value" />
			<a @click="updateValue('')"><i class="fas fa-times" /></a>
		</template>

		<input v-else type="text" :name="name" :value="value" class="w-full" :class="inputClasses" style="color: unset" />
	</span>
</template>
