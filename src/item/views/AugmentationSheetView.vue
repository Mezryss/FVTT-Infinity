<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import { AugmentationCategory, AugmentationType } from '../data/AugmentationDataModel';
import { AugmentationSheetContext } from '../sheets/AugmentationSheet';

const context = inject<AugmentationSheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="Augmentation" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
				<span class="flex gap-1">
					<strong>Category:</strong>
					<span>{{ system.category }}</span>
				</span>

				<span class="flex gap-1">
					<strong>Type:</strong>
					<span>{{ system.type }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Category</strong>
			<select :value="system.category" name="system.category" class="w-full col-span-4">
				<option v-for="augCategory in AugmentationCategory.all" :key="augCategory" :value="augCategory">
					{{ augCategory }}
				</option>
			</select>

			<strong>Type</strong>
			<select :value="system.type" name="system.type" class="w-full col-span-4">
				<option v-for="augType in AugmentationType.all" :key="augType" :value="augType">
					{{ augType }}
				</option>
			</select>

			<ItemQualitiesInput :qualities="system.qualities" :editable="context.editable" class="col-span-5" />

			<strong>Restriction</strong>
			<input type="text" class="col-span-3 text-center" :value="system.restriction.value" name="system.restriction.value" />
			<!-- TODO: Label Concilium checkboxes -->
			<input class="justify-self-center" type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />

			<strong class="whitespace-nowrap">Cost</strong>
			<input type="text" class="col-span-4 text-center" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<input type="text" class="col-span-4 text-center" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<input type="text" class="col-span-4 text-center" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
