<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
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
		<div class="flex items-center gap-2">
			<strong>Type:</strong>
			<select class="w-full" :value="system.type" name="system.type">
				<option v-for="gearType in GearType.all" :key="gearType" :value="gearType">
					<Localized :label="`Infinity.Items.Gear.Type.${gearType}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Size:</strong>
			<select class="w-full" :value="system.size" name="system.size">
				<option v-for="size in ItemSize.all" :key="size" :value="size">
					{{ size }}
				</option>
			</select>
		</div>

		<ItemQualitiesInput :qualities="system.qualities" :editable="context.editable" @rank-changed="rankChanged" @specialization-changed="specializationChanged" @remove="actions.removeQuality" />

		<div class="flex items-center gap-2">
			<strong>Restriction:</strong>
			<input type="text" :value="system.restriction.value" name="system.restriction.value" />
			<input type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap"> Cost <span v-if="system.type === GearType.Resource">Per 3</span> </strong>
			<input type="text" :value="system.cost" name="system.cost" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Tariff</strong>
			<input type="text" class="w-full" :value="system.tariff" name="system.tariff" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Maintenance</strong>
			<input type="text" class="w-full" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
