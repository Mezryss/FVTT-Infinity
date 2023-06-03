<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { useItemStore } from '@/stores/itemStore';

import AmmunitionDataModel, { AmmunitionCategory } from '../data/AmmunitionDataModel';

const itemStore = useItemStore<AmmunitionDataModel>();

const { name, img, system: storeSystem, editable } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);
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
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.restriction" name="system.restriction" :editable="editable" />

			<strong class="whitespace-nowrap">Reload Cost</strong>
			<Field class="col-span-4" :value="system.cost" name="system.cost" :editable="editable" />

			<strong>Tariff</strong>
			<Field class="col-span-4" :value="system.tariff" name="system.tariff" :editable="editable" />
		</div>
	</ItemSheet>
</template>
