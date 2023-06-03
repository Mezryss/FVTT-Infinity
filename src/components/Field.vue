<!--
	Provides a source of consistent styling for an input field.
-->

<script lang="ts" setup>
withDefaults(
	defineProps<{
		/**
		 * Property name on the document.
		 */
		name?: string;

		/**
		 * Input field type.
		 */
		type?: 'text' | 'number';

		/**
		 * Current value.
		 */
		value: string | number;

		/**
		 * Whether the view is currently editable.
		 */
		editable?: boolean;

		/**
		 * Whether the field should be read-only
		 */
		readonly?: boolean;

		/**
		 * Placeholder Value
		 */
		placeholder?: string;

		/**
		 * Min value for number inputs
		 */
		min?: number;

		/**
		 * Max value for number inputs
		 */
		max?: number;
	}>(),
	{
		editable: true,
		readonly: false,
		type: 'text',
	},
);

const emit = defineEmits<{
	(e: 'change', value: string | number): void;
}>();
</script>

<template>
	<input
		v-if="!readonly && editable"
		class="px-2 font-roboto-flex"
		:type="type"
		:name="name"
		:value="value"
		:placeholder="placeholder"
		:min="min"
		:max="max"
		@change="emit('change', ($event.target as HTMLInputElement).value as string | number)"
	/>
	<span class="font-roboto-flex" v-else>{{ value }}</span>
</template>
