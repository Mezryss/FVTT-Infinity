<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import Attribute from '@/data/Attributes';
import { LHostSheetContext } from '../sheets/LHostSheet';

const context = inject<LHostSheetContext>(RootContext)!;

const actions = computed(() => context.actions!);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
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

				<input type="number" class="w-full text-center" v-for="attribute in Attribute.all" :key="attribute" :value="system.attributes[attribute]" :name="`system.attributes.${attribute}`" />
			</div>

			<strong class="whitespace-nowrap" data-tooltip="Only applicable during Character Creation">LP Cost</strong>
			<input type="number" :value="system.lpCost" name="system.lpCost" class="col-span-4" />

			<strong>Restriction</strong>
			<input type="text" class="col-span-3 text-center" :value="system.restriction.value" name="system.restriction.value" />
			<!-- TODO: Label Concilium checkboxes -->
			<input class="justify-self-center" type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />

			<strong class="whitespace-nowrap">Cost</strong>
			<input type="text" class="col-span-4 text-center" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<input type="text" class="col-span-4 text-center" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<input type="text" class="col-span-4 text-center" :value="system.maintenance" name="system.maintenance" />

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
