<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import SidebarLabel from '@/components/SidebarLabel.vue';
import { useItemStore } from '@/stores/itemStore';

import ItemQualityDataModel from '../data/ItemQualityDataModel';

const itemStore = useItemStore<ItemQualityDataModel>();
const { name, img, system: storeSystem } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<div class="flex flex-col gap-1">
				<SidebarLabel label="TYPES.Item.itemQuality" />

				<span class="flex gap-1">
					<strong>Ranked:</strong>
					<span>{{ system.isRanked ? 'Yes' : 'No' }}</span>
				</span>

				<span class="flex gap-1">
					<strong>Specialized:</strong>
					<span>{{ system.isSpecialized ? 'Yes' : 'No' }}</span>
				</span>
			</div>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Ranked:</strong>
			<input type="checkbox" :checked="system.isRanked" name="system.isRanked" class="justify-self-center" />
			<span class="col-span-3" />

			<strong>Specialized:</strong>
			<input type="checkbox" :checked="system.isSpecialized" name="system.isSpecialized" class="justify-self-center" />
			<Field v-if="system.isSpecialized" type="text" :value="system.specializationPlaceholder" name="system.specializationPlaceholder" placeholder="Specialization Placeholder" class="col-span-3" />
		</div>
	</ItemSheet>
</template>
