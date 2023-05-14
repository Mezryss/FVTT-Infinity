<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import ItemSheet from '@/components/ItemSheet.vue';
import { AbilitySheetContext } from '../sheets/AbilitySheet';

const context = inject<AbilitySheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const owned = computed(() => context.owned);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<div class="flex items-center gap-2">
			<strong>Ranked:</strong>
			<input type="checkbox" :checked="system.isRanked" name="system.isRanked" />
			<input v-if="system.isRanked && owned" type="number" :value="system.rank" name="system.rank" placeholder="Current Rank" />
		</div>
	</ItemSheet>
</template>
