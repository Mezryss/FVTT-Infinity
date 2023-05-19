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
	<nav class="sheet-tabs font-orbitron text-sm border-0 border-b-[1px] border-opacity-50 border-sky-400" :data-group="group">
		<slot />
	</nav>
</template>

<style lang="scss">
.sheet-tabs .active {
	font-weight: bold;
}
</style>
