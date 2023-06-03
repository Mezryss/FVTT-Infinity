<!--
	Provides sidebar fields common to gear items.
-->

<script lang="ts" setup>
import { ItemSize } from '@/item/data/templates/HasGearData';

import SidebarLabel from './SidebarLabel.vue';

defineProps<{
	itemType: string;

	size?: ItemSize;
	restriction?: string;
	cost?: string;
	maintenance?: string;
	tariff?: string;
}>();
</script>

<template>
	<SidebarLabel class="whitespace-nowrap" :label="`TYPES.Item.${itemType}`" />

	<slot />

	<span v-if="size" class="flex gap-1">
		<strong>Size:</strong>
		<span>{{ size }}</span>
	</span>

	<span v-if="restriction" class="flex gap-1">
		<strong>Restriction:</strong>
		<span class="font-infinity-icon">{{ restriction }}</span>
	</span>

	<span v-if="cost" class="flex gap-1">
		<strong>Cost:</strong>
		<span class="font-infinity-icon">{{ cost }}</span>
	</span>

	<span v-if="maintenance" class="flex gap-1">
		<strong>Maintenance:</strong>
		<span class="font-infinity-icon">{{ maintenance }}</span>
	</span>

	<span v-if="tariff" class="flex gap-1">
		<strong>Tariff:</strong>
		<span>{{ tariff }}</span>
	</span>
</template>
