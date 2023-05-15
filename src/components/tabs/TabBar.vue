<!--
	Container for <TabLink> elements activating various sheet tabs.
-->

<script lang="ts" setup>
withDefaults(
	defineProps<{
		/**
		 * Which navigation group this set of Nav links applies to.
		 */
		group?: string;
	}>(),
	{
		group: 'primary',
	},
);
</script>

<template>
	<nav class="sheet-tabs" :data-group="group">
		<slot />
	</nav>
</template>
