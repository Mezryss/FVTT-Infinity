<!--
	Basic component for the label used for an Item Sidebar
-->

<script lang="ts" setup>
import Localized from './Localized.vue';

defineProps<{
	/**
	 * An optional localization key to use for the label if no slot content is provided.
	 */
	label?: string;
}>();
</script>

<template>
	<span class="font-orbitron font-semibold w-full text-center underline underline-offset-2">
		<slot>
			<Localized v-if="label !== undefined" :label="label" />
		</slot>
	</span>
</template>
