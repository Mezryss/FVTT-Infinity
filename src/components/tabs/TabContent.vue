<!--
	Container for the contents of an individual sheet tab.

	Should always be contained within a <SheetBody>.
-->

<script lang="ts" setup>
withDefaults(
	defineProps<{
		/**
		 * Which navigation group this tab content applies to
		 */
		group?: string;

		/**
		 * Identifier for the tab to associate this content with.
		 */
		tab: string;
	}>(),
	{
		group: 'primary',
	},
);
</script>

<template>
	<div class="tab w-full h-full" :data-tab="tab" :data-group="group">
		<slot />
	</div>
</template>
