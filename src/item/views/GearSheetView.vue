<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import ItemQualitiesInput from '@/components/itemQualities/ItemQualitiesInput.vue';
import { useItemStore } from '@/stores/itemStore';

import GearDataModel, { GearType } from '../data/GearDataModel';
import { ItemSize } from '../data/templates/HasGearData';

const itemStore = useItemStore<GearDataModel>();
const { name, img, system: storeSystem, editable } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="gear" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
				<span class="flex gap-1">
					<strong>Size:</strong>
					<span><Localized :label="`Infinity.Items.Size.${system.size}`" /></span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Type</strong>
			<select class="w-full col-span-4" :value="system.type" name="system.type">
				<option v-for="gearType in GearType.all" :key="gearType" :value="gearType">
					<Localized :label="`Infinity.Items.Gear.Type.${gearType}`" />
				</option>
			</select>

			<strong>Size</strong>
			<select class="w-full col-span-4" :value="system.size" name="system.size">
				<option v-for="size in ItemSize.all" :key="size" :value="size">
					<Localized :label="`Infinity.Items.Size.${size}`" />
				</option>
			</select>

			<ItemQualitiesInput :qualities="system.qualities" :editable="editable" class="col-span-5" />

			<strong>Restriction</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.restriction" name="system.restriction" :editable="editable" />

			<strong class="whitespace-nowrap">Cost</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<Field type="text" class="col-span-4" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
