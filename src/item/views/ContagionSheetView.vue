<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { ContagionCategory, ContagionTerm, ContagionType } from '../data/ContagionDataModel';
import { ContagionSheetContext } from '../sheets/ContagionSheet';

const context = inject<ContagionSheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="Contagion" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff">
				<span>{{ system.vector }}, {{ system.category }}, {{ system.type.value }} {{ system.type.difficulty }} ({{ system.type.momentum }} Momentum), {{ system.term }}, {{ system.damage }} damage</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Category</strong>
			<select :value="system.category" name="system.category" class="w-full col-span-4">
				<option v-for="category in ContagionCategory.all" :key="category" :value="category">
					<Localized :label="`Infinity.Items.Contagion.Category.${category}`" />
				</option>
			</select>

			<strong>Type</strong>
			<select :value="system.type.value" name="system.type.value" class="w-full col-span-2">
				<option v-for="contagionType in ContagionType.all" :key="contagionType" :value="contagionType">
					<Localized :label="`Infinity.Items.Contagion.Type.${contagionType}`" />
				</option>
			</select>
			<input type="number" :min="0" :value="system.type.difficulty" name="system.type.difficulty" class="text-center" />
			<input type="number" :min="0" :value="system.type.momentum" name="system.type.momentum" class="text-center" />

			<strong>Term</strong>
			<select :value="system.term" name="system.term" class="w-full col-span-4">
				<option v-for="term in ContagionTerm.all" :key="term" :value="term">
					<Localized :label="`Infinity.Items.Contagion.Term.${term}`" />
				</option>
			</select>

			<strong>Vector</strong>
			<input type="text" :value="system.vector" name="system.vector" class="col-span-4 text-center" />

			<strong>Damage</strong>
			<input type="text" :value="system.damage" name="system.damage" class="col-span-4 text-center" />

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
