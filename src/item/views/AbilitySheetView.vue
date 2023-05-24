<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import ItemSheet from '@/components/ItemSheet.vue';
import SidebarLabel from '@/components/SidebarLabel.vue';
import { AbilitySheetContext } from '../sheets/AbilitySheet';

const context = inject<AbilitySheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const owned = computed(() => context.owned);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<SidebarLabel>Ability Summary</SidebarLabel>

			<span class="flex gap-1">
				<strong>Ranked:</strong>
				<span>{{ system.isRanked ? 'Yes' : 'No' }}</span>
			</span>

			<span v-if="system.isRanked && owned" class="flex gap-1">
				<strong>Rank:</strong>
				<span>{{ system.rank }}</span>
			</span>
		</template>

		<div class="flex items-center gap-2">
			<strong>Ranked:</strong>
			<input type="checkbox" :checked="system.isRanked" name="system.isRanked" />
			<input v-if="system.isRanked && owned" type="number" :value="system.rank" name="system.rank" placeholder="Current Rank" />
		</div>
	</ItemSheet>
</template>
