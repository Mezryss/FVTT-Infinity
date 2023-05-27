<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { ExplosiveCategory } from '../data/ExplosiveDataModel';
import { ItemSize } from '../data/templates/HasGearData';
import { ExplosiveSheetContext } from '../sheets/ExplosiveSheet';

const context = inject<ExplosiveSheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="explosive" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff">
				<span class="flex gap-1">
					<strong>Category:</strong>
					<span>{{ system.category }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Category</strong>
			<select :value="system.category" name="system.category" class="w-full col-span-4">
				<option v-for="category in ExplosiveCategory.all" :key="category" :value="category">
					<Localized :label="`Infinity.Items.Explosive.Category.${category}`" />
				</option>
			</select>

			<strong>Damage</strong>
			<input type="text" :value="system.damage" name="system.damage" class="col-span-4 text-center" />

			<strong>Size</strong>
			<select :value="system.size" name="system.size" class="w-full col-span-4">
				<option v-for="itemSize in ItemSize.all" :key="itemSize" :value="itemSize">
					{{ itemSize }}
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
		</div>
	</ItemSheet>
</template>
