<script lang="ts" setup>
withDefaults(
	defineProps<{
		/**
		 * Property name on the document.
		 */
		name: string;

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
	}>(),
	{
		editable: true,
		readonly: false,
		type: 'text',
	},
);
</script>

<template>
	<input class="px-2" v-if="!readonly && editable" :type="type" :name="name" :value="value" :placeholder="placeholder" />
	<span v-else>{{ value }}</span>
</template>
