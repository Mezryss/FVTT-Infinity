<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, inject } from 'vue';

import { RootContext } from '@/VueSheet';
import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import Attribute from '@/data/Attributes';
import { useItemStore } from '@/stores/itemStore';

import LHostDataModel from '../data/LHostDataModel';
import { LHostSheetContext } from '../sheets/LHostSheet';

const itemStore = useItemStore<LHostDataModel>();
const { name, img, system: storeSystem, editable } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);

const context = inject<LHostSheetContext>(RootContext)!;
const actions = computed(() => context.actions!);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="lhost" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
				<span class="flex gap-1">
					<strong>Life Point Cost:</strong>
					<span>{{ system.lpCost }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<span class="text-lg font-orbitron font-semibold col-span-5">Attribute Modifiers</span>

			<div class="grid gap-x-2 gap-y-1 grid-cols-7 items-center col-span-5">
				<div class="w-full text-center text-base font-semibold" v-for="attribute in Attribute.all" :key="attribute">
					<Localized :label="`Infinity.Attributes.Abbreviations.${attribute}`" />
				</div>

				<Field type="number" class="w-full" v-for="attribute in Attribute.all" :key="attribute" :value="system.attributes[attribute]" :name="`system.attributes.${attribute}`" />
			</div>

			<strong class="whitespace-nowrap" data-tooltip="Only applicable during Character Creation">LP Cost</strong>
			<Field type="number" :value="system.lpCost" name="system.lpCost" class="col-span-4" />

			<strong>Restriction</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.restriction" name="system.restriction" :editable="editable" />

			<strong class="whitespace-nowrap">Cost</strong>
			<Field type="text" class="col-span-4" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<Field type="text" class="col-span-4" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<Field type="text" class="col-span-4" :value="system.maintenance" name="system.maintenance" />

			<template v-if="system.specialAbilities.length > 0">
				<span class="text-lg font-orbitron font-semibold col-span-5">Special Abilities</span>
				<div class="flex items-center gap-2 col-span-5 ml-4" v-for="(ability, index) in system.specialAbilities" :key="ability.uuid">
					<img class="w-6 h-6" :src="ability.img" />
					<a class="w-full" @click="actions.openAbility(index)">{{ ability.name }}</a>
					<a class="px-1" @click="actions.removeAbility(index)"><i class="fas fa-trash" /></a>
				</div>
			</template>
		</div>
	</ItemSheet>
</template>
