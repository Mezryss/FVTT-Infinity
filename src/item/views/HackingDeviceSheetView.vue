<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import ItemSheet from '@/components/ItemSheet.vue';
import { HackingDeviceSheetContext } from '../sheets/HackingDeviceSheet';

const context = inject<HackingDeviceSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const programs = computed(() => context.system.programs);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<div class="flex items-center gap-2">
			<strong>CLAW:</strong>
			<input type="number" :min="0" :value="system.claw" name="system.claw" />
		</div>

		<div class="flex items-center gap-2">
			<strong>SWORD:</strong>
			<input type="number" :min="0" :value="system.sword" name="system.sword" />
		</div>

		<div class="flex items-center gap-2">
			<strong>SHIELD:</strong>
			<input type="number" :min="0" :value="system.shield" name="system.shield" />
		</div>

		<div class="flex items-center gap-2">
			<strong>GADGET:</strong>
			<input type="number" :min="0" :value="system.gadget" name="system.gadget" />
		</div>

		<div class="flex items-center gap-2">
			<strong>IC:</strong>
			<input type="number" :min="0" :value="system.ic" name="system.ic" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Restriction:</strong>
			<input type="text" :value="system.restriction.value" name="system.restriction.value" />
			<input type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Cost</strong>
			<input type="text" :value="system.cost" name="system.cost" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Tariff</strong>
			<input type="text" class="w-full" :value="system.tariff" name="system.tariff" />
		</div>

		<div class="flex flex-col gap-2">
			<h3>Programs</h3>
			<em v-if="programs.length === 0">No Programs Installed</em>
			<div class="flex items-center gap-2" v-for="(program, index) in programs" :key="program.uuid">
				<img class="w-6 h-6" :src="program.img" />
				<a class="w-full" @click="actions.openProgram(index)">{{ program.name }}</a>
				<a class="px-1" @click="actions.removeProgram(index)">X</a>
			</div>
		</div>
	</ItemSheet>
</template>
