<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { ProgramType } from '../data/ProgramDataModel';
import { ProgramSheetContext } from '../sheets/ProgramSheet';

const context = inject<ProgramSheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="Program" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff">
				<span class="flex gap-1">
					<strong>Type:</strong>
					<span>{{ system.type }}</span>
				</span>

				<span class="flex gap-1">
					<strong>Rating:</strong>
					<span>{{ system.rating }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Type</strong>
			<select :value="system.type" name="system.type" class="col-span-4">
				<option v-for="programType in ProgramType.all" :key="programType" :value="programType">
					<Localized :label="`Infinity.Items.Program.Type.${programType}`" />
				</option>
			</select>

			<strong>Rating</strong>
			<input type="text" :value="system.rating" name="system.rating" class="col-span-4 text-center" />

			<strong>Damage</strong>
			<input type="text" :value="system.damage" name="system.damage" class="col-span-4 text-center" />

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
