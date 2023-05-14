<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import ItemSheet from '@/components/ItemSheet.vue';
import { ItemQualitySheetContext } from '../sheets/ItemQualitySheet';

const context = inject<ItemQualitySheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<div class="flex items-center gap-2">
			<strong>Ranked:</strong>
			<input type="checkbox" :checked="system.isRanked" name="system.isRanked" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Specialized:</strong>
			<input type="checkbox" :checked="system.isSpecialized" name="system.isSpecialized" />
			<input v-if="system.isSpecialized" type="text" :value="system.specializationPlaceholder" name="system.specializationPlaceholder" placeholder="Specialization Placeholder" />
		</div>
	</ItemSheet>
</template>
