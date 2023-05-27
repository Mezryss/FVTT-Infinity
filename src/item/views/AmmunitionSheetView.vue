<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { AmmunitionCategory } from '../data/AmmunitionDataModel';
import { AmmunitionSheetContext } from '../sheets/AmmunitionSheet';

const context = inject<AmmunitionSheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const editable = computed(() => context.editable);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="ammunition" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff">
				<span class="flex gap-1">
					<strong>Category:</strong>
					<span>{{ system.category }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Category:</strong>
			<select :value="system.category" name="system.category" class="col-span-4 px-2">
				<option v-for="category in AmmunitionCategory.all" :key="category" :value="category">
					<Localized :label="`Infinity.Items.Ammunition.Category.${category}`" />
				</option>
			</select>

			<ItemQualitiesInput class="col-span-5" :qualities="system.qualities" :editable="editable" />

			<strong>Restriction</strong>
			<Field class="col-span-3" :value="system.restriction.value" name="system.restriction.value" :editable="editable" />
			<!-- TODO: Label Concilium checkboxes -->
			<input class="justify-self-center" type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />

			<strong class="whitespace-nowrap">Reload Cost</strong>
			<Field class="col-span-4" :value="system.cost" name="system.cost" :editable="editable" />

			<strong>Tariff</strong>
			<Field class="col-span-4" :value="system.tariff" name="system.tariff" :editable="editable" />
		</div>
	</ItemSheet>
</template>
