<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import ItemQualitiesInput from '@/components/itemQualities/ItemQualitiesInput.vue';
import { useItemStore } from '@/stores/itemStore';

import AugmentationDataModel, { AugmentationCategory, AugmentationType } from '../data/AugmentationDataModel';

const itemStore = useItemStore<AugmentationDataModel>();
const { name, img, system: storeSystem, editable } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="augmentation" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
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
			<select :value="system.category" name="system.category" class="w-full col-span-4 px-2">
				<option v-for="augCategory in AugmentationCategory.all" :key="augCategory" :value="augCategory">
					{{ augCategory }}
				</option>
			</select>

			<strong>Type</strong>
			<select :value="system.type" name="system.type" class="w-full col-span-4 px-2">
				<option v-for="augType in AugmentationType.all" :key="augType" :value="augType">
					{{ augType }}
				</option>
			</select>

			<ItemQualitiesInput :qualities="system.qualities" :editable="editable" class="col-span-5" />

			<strong>Restriction</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.restriction" name="system.restriction" :editable="editable" />

			<strong class="whitespace-nowrap">Cost</strong>
			<Field type="text" class="col-span-4" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<Field type="text" class="col-span-4" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<Field type="text" class="col-span-4" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
