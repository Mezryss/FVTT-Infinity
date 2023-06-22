<!--
	Component providing base styling (namely, background & padding) for system sheets.
-->
<script lang="ts" setup>
withDefaults(
	defineProps<{
		/**
		 * Whether to use the Dark Background.
		 */
		dark?: boolean;
	}>(),
	{
		dark: false,
	},
);
</script>

<template>
	<div
		class="w-full h-full p-1 bg-4kp"
		:class="{
			'bg-light-hexes': !dark,
			'bg-dark-hexes': dark,
		}"
	>
		<slot />
	</div>
</template>
