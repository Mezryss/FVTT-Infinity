<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { useItemStore } from '@/stores/itemStore';

import ExplosiveDataModel, { ExplosiveCategory } from '../data/ExplosiveDataModel';
import { ItemSize } from '../data/templates/HasGearData';

const itemStore = useItemStore<ExplosiveDataModel>();
const { name, img, system: storeSystem, editable } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="explosive" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff">
				<span class="flex gap-1">
					<strong>Category:</strong>
					<span>{{ system.category }}</span>
				</span>

				<span class="flex gap-1">
					<strong>Size:</strong>
					<span><Localized :label="`Infinity.Items.Size.${system.size}`" /></span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Category</strong>
			<select :value="system.category" name="system.category" class="w-full col-span-4 px-2">
				<option v-for="category in ExplosiveCategory.all" :key="category" :value="category">
					<Localized :label="`Infinity.Items.Explosive.Category.${category}`" />
				</option>
			</select>

			<strong>Damage</strong>
			<Field type="text" :value="system.damage" name="system.damage" class="col-span-4" />

			<strong>Size</strong>
			<select :value="system.size" name="system.size" class="w-full col-span-4 px-2">
				<option v-for="itemSize in ItemSize.all" :key="itemSize" :value="itemSize">
					<Localized :label="`Infinity.Items.Size.${itemSize}`" />
				</option>
			</select>

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
