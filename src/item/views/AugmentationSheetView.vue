<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import { AugmentationCategory, AugmentationType } from '../data/AugmentationDataModel';
import { AugmentationSheetContext } from '../sheets/AugmentationSheet';

const context = inject<AugmentationSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

async function rankChanged(index: number, newRank: number) {
	await actions.value.updateQuality(index, {
		...system.value.qualities[index],
		rank: newRank,
	});
}

async function specializationChanged(index: number, newSpec: string) {
	await actions.value.updateQuality(index, {
		...system.value.qualities[index],
		specialization: newSpec,
	});
}
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
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

		<ItemQualitiesInput :qualities="system.qualities" :editable="context.editable" @rank-changed="rankChanged" @specialization-changed="specializationChanged" @remove="actions.removeQuality" />

		<div class="flex items-center gap-2">
			<strong>Restriction:</strong>
			<input type="text" :value="system.restriction.value" name="system.restriction.value" />
			<input type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Cost</strong>
			<input type="text" :value="system.cost" name="system.cost" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Tariff</strong>
			<input type="text" class="w-full" :value="system.tariff" name="system.tariff" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Maintenance</strong>
			<input type="number" :min="0" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
