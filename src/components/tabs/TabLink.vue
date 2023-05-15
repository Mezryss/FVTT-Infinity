<!--
	An individual link within a <TabBar> specifying which <TabContent> content to display.
-->

<script lang="ts" setup>
import Localized from '../Localized.vue';

defineProps<{
	/**
	 * Optional localization label to use if slotted content is not provided.
	 */
	label?: string;

	/**
	 * Identifier for the tab to associate this content with.
	 */
	tab: string;
}>();
</script>

<template>
	<a class="item" :data-tab="tab">
		<slot>
			<Localized v-if="label" :label="label" />
			<template v-else>[ERR: Unlabeled]</template>
		</slot>
	</a>
</template>
