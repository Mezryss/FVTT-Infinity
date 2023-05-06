<script lang="ts" setup>
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import { computed, inject } from 'vue';
import { AugmentationCategory, AugmentationType } from '../data/AugmentationDataModel';
import { AugmentationSheetContext } from '../sheets/AugmentationSheet';

const context = inject<AugmentationSheetContext>(RootContext)!;

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
			<strong>Category:</strong>
			<select :value="system.category" name="system.category" class="w-full">
				<option v-for="augCategory in AugmentationCategory.all" :key="augCategory" :value="augCategory">
					{{ augCategory }}
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Type:</strong>
			<select :value="system.type" name="system.type" class="w-full">
				<option v-for="augType in AugmentationType.all" :key="augType" :value="augType">
					{{ augType }}
				</option>
			</select>
		</div>

		<em>TODO: Item Qualities</em>

		<div class="flex items-center gap-2">
			<strong>Restriction:</strong>
			<input type="number" :min="0" :value="system.restriction.value" name="system.restriction.value" />
			<input type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />
			<input type="text" class="w-full" :value="system.restriction.notes" name="system.restriction.notes" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Cost</strong>
			<input type="number" :min="0" :value="system.cost.static" name="system.cost.static" />
			<input type="number" :value="system.cost.rolled" name="system.cost.rolled" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Tariff</strong>
			<input type="number" :min="0" :value="system.tariff.value" name="system.tariff.value" />
			<input type="text" class="w-full" :value="system.tariff.notes" name="system.tariff.notes" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Maintenance</strong>
			<input type="number" :min="0" :value="system.maintenance" name="system.maintenance" />
		</div>

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
