<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { ExplosiveCategory } from '../data/ExplosiveDataModel';
import { ItemSize } from '../data/templates/HasGearData';
import { ExplosiveSheetContext } from '../sheets/ExplosiveSheet';

const context = inject<ExplosiveSheetContext>(RootContext)!;

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
				<option v-for="category in ExplosiveCategory.all" :key="category" :value="category">
					<Localized :label="`Infinity.Items.Explosive.Category.${category}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Damage:</strong>
			<input type="text" :value="system.damage" name="system.damage" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Size:</strong>
			<select :value="system.size" name="system.size" class="w-full">
				<option v-for="itemSize in ItemSize.all" :key="itemSize" :value="itemSize">
					{{ itemSize }}
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
			<strong class="whitespace-nowrap">Cost (Per 3)</strong>
			<input type="text" :value="system.cost" name="system.cost" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Tariff</strong>
			<input type="text" class="w-full" :value="system.tariff" name="system.tariff" />
		</div>
	</ItemSheet>
</template>
