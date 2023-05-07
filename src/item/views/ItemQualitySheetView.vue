<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import { ItemQualitySheetContext } from '../sheets/ItemQualitySheet';

const context = inject<ItemQualitySheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<div class="flex items-center gap-2">
			<img :src="img" data-edit="img" class="aspect-square w-12 h-12" />
			<input type="text" name="name" :value="name" placeholder="Item Name" />
		</div>

		<hr class="w-full" />

		<div class="flex items-center gap-2">
			<strong>Ranked:</strong>
			<input type="checkbox" :checked="system.isRanked" name="system.isRanked" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Specialized:</strong>
			<input type="checkbox" :checked="system.isSpecialized" name="system.isSpecialized" />
			<input v-if="system.isSpecialized" type="text" :value="system.specializationPlaceholder" name="system.specializationPlaceholder" placeholder="Specialization Placeholder" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Source:</strong>
			<input type="text" name="system.source" :value="system.source" />
		</div>

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
