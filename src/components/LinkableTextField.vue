<!--
	Provides a text input that can either be typed into, or will accept a dropped document for a link.
-->

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useDocumentStore } from '@/stores/documentStore';

import Field from './Field.vue';

const props = withDefaults(
	defineProps<{
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

		/**
		 * For using LinkableTextField with array-type items.
		 */
		isArray?: boolean;

		/**
		 * Index within the array that this field represents
		 */
		arrayIndex?: number;

		/**
		 * Value within an object at the array index that this field represents.
		 */
		arrayValue?: any[];

		/**
		 * Key within the array object (if any) to set.
		 */
		arrayKey?: string;
	}>(),
	{
		isArray: false,
		arrayIndex: 0,
	},
);

/**
 * Test for Foundry's UUID enricher format to determine if we're currently linking a document.
 */
const isLinked = computed(() => /^@UUID\[.*\]{.*}$/i.test(props.value));

/**
 * Computed property for the linked document name.
 */
const linkedDocumentName = computed(() => {
	const uuidMatch = props.value.match(/^@UUID\[(?<uuid>.*)\]{.*}$/i);
	const uuid = uuidMatch?.groups?.uuid;

	if (!uuid) {
		return undefined;
	}

	return isLinked.value ? fromUuidSync(uuid)?.name : undefined;
});

/**
 * Computed property for the name of the target, when it's just a plaintext field.
 */
const targetName = computed(() => {
	// Non-array names don't need any special processing
	if (!props.isArray) {
		return props.name;
	}

	if (props.arrayKey) {
		return `${props.name}.${props.arrayIndex}.${props.arrayKey}`;
	} else {
		return `${props.name}.${props.arrayIndex}`;
	}
});

/**
 * Current number of dragEnter events - dragLeave events that have triggered.
 *
 * This needs to be a number (rather than boolean) b/c the drag events trigger when entering/leaving children as well.
 */
const dragCount = ref(0);

/**
 * This component directly edits the injected document rather than relying on form submission to have Foundry update.
 */
const documentStore = useDocumentStore();

async function openLinkedSheet() {
	const uuidMatch = props.value.match(/^@UUID\[(?<uuid>.*)\]{.*}$/i);
	const uuid = uuidMatch?.groups?.uuid;

	if (!uuid) {
		return undefined;
	}

	const linkedDocument = await fromUuid(uuid);
	await linkedDocument?.sheet?.render(true);
}

/**
 * Updates the injected Document with the new value.
 *
 * @param newValue New value to store.
 */
async function updateValue(newValue = '') {
	if (props.isArray) {
		const valueCopy = [...(props.arrayValue ?? [])];

		if (props.arrayKey) {
			valueCopy[props.arrayIndex][props.arrayKey] = newValue;
		} else {
			valueCopy[props.arrayIndex] = newValue;
		}

		await documentStore.update({
			[props.name]: valueCopy,
		});
	} else {
		await documentStore.update({
			[props.name]: newValue,
		});
	}
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

	await updateValue(`@UUID[${dragSource.uuid}]{${draggedDocument?.name ?? 'Linked'}}`);

	dragCount.value = 0;
}
</script>

<template>
	<span
		class="flex items-center gap-1 w-full border-[1px] rounded-sm border-dashed border-transparent h-full"
		:class="{
			'border-sky-800 bg-sky-400 border-solid bg-opacity-50': dragCount > 0,
		}"
		@dragenter="dragEnter"
		@dragleave="dragLeave"
		@drop="drop"
	>
		<template v-if="isLinked">
			<a @click="openLinkedSheet()" class="flex items-center gap-0.5 h-full pl-2 font-semibold">{{ linkedDocumentName ?? 'ERR: Invalid Document Link' }}</a>
			<a @click="updateValue('')" class="flex items-center h-full"><i class="fas fa-times" /></a>
			<input type="hidden" :name="targetName" :value="value" />
		</template>

		<Field v-else type="text" :name="targetName" :value="value" class="w-full h-full" :class="inputClasses" style="color: unset" />
	</span>
</template>
