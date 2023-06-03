<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import SidebarLabel from '@/components/SidebarLabel.vue';
import { useItemStore } from '@/stores/itemStore';

import AbilityDataModel from '../data/AbilityDataModel';

const itemStore = useItemStore<AbilityDataModel>();
const { name, img, system: storeSystem, isOwned } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<SidebarLabel label="TYPES.Item.ability" />

			<span class="flex gap-1">
				<strong>Ranked:</strong>
				<span>{{ system.isRanked ? 'Yes' : 'No' }}</span>
			</span>

			<span v-if="system.isRanked && isOwned" class="flex gap-1">
				<strong>Rank:</strong>
				<span>{{ system.rank }}</span>
			</span>
		</template>

		<div class="flex items-center gap-2">
			<strong>Ranked:</strong>
			<input type="checkbox" :checked="system.isRanked" name="system.isRanked" />
			<Field v-if="system.isRanked && isOwned" type="number" :value="system.rank" name="system.rank" placeholder="Current Rank" />
		</div>
	</ItemSheet>
</template>
