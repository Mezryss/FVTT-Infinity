<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import Enriched from '@/components/Enriched.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import { WeaponType } from '@/item/data/WeaponDataModel';
import { VehicleSheetContext } from '../sheets/VehicleSheet';

const context = inject<VehicleSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const abilities = computed(() => context.abilities);
const gear = computed(() => context.gear);
const weapons = computed(() => context.weapons);
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<div class="flex items-center gap-2">
			<img :src="img" data-edit="img" class="aspect-square w-12 h-12" />
			<input type="text" name="name" :value="name" placeholder="Item Name" />
		</div>

		<hr class="w-full" />

		<h3>Types <a @click="actions.addVehicleType()">&plus;</a></h3>
		<div class="flex flex-col flex-nowrap">
			<div class="flex flex-nowrap gap-1 items-center" v-for="(vehicleType, index) in system.types" :key="index">
				<input type="text" :value="vehicleType" :name="`system.types.${index}`" />
				<a class="text-lg -my-2" @click="actions.removeVehicleType(index)">&times;</a>
			</div>
		</div>

		<h3>Attributes</h3>
		<div class="grid grid-cols-3 gap-x-2 gap-y-1">
			<span class="text-base w-full text-center">Scale</span>
			<span class="text-base w-full text-center">Speed</span>
			<span class="text-base w-full text-center">Brawn</span>

			<input type="number" class="text-base w-full text-center" :value="system.scale" :min="0" name="system.scale" />
			<input type="number" class="text-base w-full text-center" :value="system.speed" :min="0" name="system.speed" />
			<input type="number" class="text-base w-full text-center" :value="system.brawn.value" :min="0" name="system.brawn.value" />
		</div>

		<h3>Details</h3>
		<div class="grid grid-cols-2 gap-x-2 gap-y-1">
			<span class="text-base w-full text-center">Max. Passengers</span>
			<span class="text-base w-full text-center">Impact</span>

			<input type="text" class="text-base w-full text-center" :value="system.passengers" name="system.passengers" />
			<input type="text" class="text-base w-full text-center" :value="system.impact" name="system.impact" />
		</div>

		<h3>Defences</h3>
		<div class="grid grid-cols-3 gap-x-2 gap-y-1">
			<span class="text-base w-full text-center">Structure</span>
			<input type="number" class="text-base w-full text-center" :min="0" :max="system.stress.vigour.max" :value="system.stress.vigour.value" name="system.stress.vigour.value" />
			<input type="number" class="text-base w-full text-center" :min="0" :value="system.stress.vigour.max" name="system.stress.vigour.max" />

			<span class="text-base w-full text-center">Firewall</span>
			<input type="number" class="text-base w-full text-center" :min="0" :max="system.stress.firewall.max" :value="system.stress.firewall.value" name="system.stress.firewall.value" />
			<input type="number" class="text-base w-full text-center" :min="0" :value="system.stress.firewall.max" name="system.stress.firewall.max" />

			<span class="text-base w-full text-center">Armour</span>
			<input type="number" class="text-base w-full text-center col-span-2" :min="0" :value="system.defences.armour" name="system.defences.armour" />

			<span class="text-base w-full text-center">BTS</span>
			<input type="number" class="text-base w-full text-center col-span-2" :min="0" :value="system.bts" name="system.bts" />
		</div>

		<h3>Mounted Weapons</h3>
		<ul>
			<li v-for="attack in weapons" :key="attack.uuid" class="flex flex-row flex-wrap items-center gap-1">
				<a class="-my-4 text-xl" @click="actions.removeItem(attack.uuid)">&times;</a>
				<strong>{{ attack.name }}:</strong>
				<span v-if="attack.system.type === WeaponType.Ranged">Range {{ attack.system.range }},</span>
				<span>{{ attack.system.damage }} damage,</span>
				<span v-if="attack.system.type === WeaponType.Ranged">Burst {{ attack.system.burst }},</span>
				<span>{{ attack.system.size }},</span>
				<span v-for="quality in attack.system.qualities" :key="quality.uuid" class="after:content-[','] last:after:content-['']">{{ quality.name }}</span>
			</li>
		</ul>

		<h3>Gear</h3>
		<div class="flex flex-wrap gap-1">
			<div v-for="item in gear" :key="item.uuid">{{ item.name }} <a @click="actions.removeItem(item.uuid)" class="text-lg -my-2">&times;</a></div>
		</div>

		<h3>Special Abilities</h3>
		<ul>
			<li v-for="ability in abilities" :key="ability.uuid" class="flex flex-row flex-wrap items-center gap-1">
				<a class="-my-4 text-xl" @click="actions.removeItem(ability.uuid)">&times;</a>
				<strong>{{ ability.name }}:</strong>
				<Enriched :value="ability.system.description" />
			</li>
		</ul>

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
