<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { useItemStore } from '@/stores/itemStore';

import ProgramDataModel, { ProgramType } from '../data/ProgramDataModel';

const itemStore = useItemStore<ProgramDataModel>();
const { name, img, system: storeSystem, editable } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="program" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff">
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
			<Field type="text" :value="system.rating" name="system.rating" class="col-span-4" />

			<strong>Damage</strong>
			<Field type="text" :value="system.damage" name="system.damage" class="col-span-4" />

			<ItemQualitiesInput :qualities="system.qualities" :editable="editable" class="col-span-5" />

			<strong>Restriction</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.restriction" name="system.restriction" :editable="editable" />

			<strong class="whitespace-nowrap">Cost</strong>
			<Field type="text" class="col-span-4" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<Field type="text" class="col-span-4" :value="system.tariff" name="system.tariff" />
		</div>
	</ItemSheet>
</template>
