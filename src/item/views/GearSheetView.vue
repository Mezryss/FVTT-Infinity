<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { GearType } from '../data/GearDataModel';
import { ItemSize } from '../data/templates/HasGearData';
import { GearSheetContext } from '../sheets/GearSheet';

const context = inject<GearSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

async function rankChanged(index: number, newRank: number) {
	await actions.value.updateQuality(index, {
		...system.value.qualities[index],
		rank: newRank,
	});
}

async function specializationChanged(index: number, newSpec: string) {
	await actions.value.updateQuality(index, {
		...system.value.qualities[index],
		specialization: newSpec,
	});
}
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="Gear" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
				<span class="flex gap-1">
					<strong>Size:</strong>
					<span>{{ system.size }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-5 items-center gap-1">
			<strong>Type</strong>
			<select class="w-full col-span-4" :value="system.type" name="system.type">
				<option v-for="gearType in GearType.all" :key="gearType" :value="gearType">
					<Localized :label="`Infinity.Items.Gear.Type.${gearType}`" />
				</option>
			</select>

			<strong>Size</strong>
			<select class="w-full col-span-4" :value="system.size" name="system.size">
				<option v-for="size in ItemSize.all" :key="size" :value="size">
					{{ size }}
				</option>
			</select>

			<ItemQualitiesInput :qualities="system.qualities" :editable="context.editable" @rank-changed="rankChanged" @specialization-changed="specializationChanged" @remove="actions.removeQuality" class="col-span-5" />

			<strong>Restriction:</strong>
			<input type="text" class="col-span-3 text-center" :value="system.restriction.value" name="system.restriction.value" />
			<!-- TODO: Label Concilium checkboxes -->
			<input class="justify-self-center" type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />

			<strong class="whitespace-nowrap">Cost</strong>
			<input type="text" class="col-span-4 text-center" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<input type="text" class="col-span-4 text-center" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<input type="text" class="col-span-4 text-center" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
