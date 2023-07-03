<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { nextTick, ref } from 'vue';

import Localized from '@/components/Localized.vue';
import { useMomentumStore } from '@/stores/momentumStore';

const momentumStore = useMomentumStore();
const { momentum, heat } = storeToRefs(momentumStore);

const directEditMomentum = ref(false);
const directEditHeat = ref(false);
const directMomentumInput = ref<HTMLInputElement | null>(null);
const directHeatInput = ref<HTMLInputElement | null>(null);

const isGM = game.user.isGM;

async function modifyMomentum(amount: number = 1) {
	directEditMomentum.value = false;

	await momentumStore.setMomentum(Math.max(0, Math.min(6, momentum.value + amount)), true, true);
}

async function modifyHeat(amount: number = 1) {
	directEditHeat.value = false;

	await momentumStore.setHeat(Math.max(0, heat.value + amount));
}

async function toggleEditMomentum() {
	directEditMomentum.value = true;

	await nextTick();

	directMomentumInput.value?.focus();
	directMomentumInput.value?.select();
}

async function toggleEditHeat() {
	directEditHeat.value = true;

	await nextTick();

	directHeatInput.value?.focus();
	directHeatInput.value?.select();
}

async function momentumChanged(event: Event) {
	event.preventDefault();
	event.stopPropagation();

	const target = event.currentTarget as HTMLInputElement;

	const value = +target.value;
	if (!isNaN(value) && value !== momentum.value) {
		await momentumStore.setMomentum(Math.max(0, Math.min(6, value)), true, true);
	}

	directEditMomentum.value = false;
}

async function heatChanged(event: Event) {
	event.preventDefault();
	event.stopPropagation();

	const target = event.currentTarget as HTMLInputElement;

	const value = +target.value;
	if (!isNaN(value) && value !== heat.value) {
		await momentumStore.setHeat(Math.max(0, value), true, true);
	}

	directEditHeat.value = false;
}

async function noopReturn(event: KeyboardEvent, saveHandler: (event: Event, sendChat?: boolean) => Promise<void>) {
	event.preventDefault();
	event.stopPropagation();

	await saveHandler(event);

	return false;
}
</script>

<template>
	<!-- TODO: A little special styling for the Momentum & Heat Trackers would be nice. -->
	<div class="flex flex-col gap-4 absolute -bottom-24 right-96 w-64 h-80">
		<div class="flex flex-col gap-1 items-center bg-blue-300 rounded-lg w-full p-2">
			<span class="text-2xl font-semibold uppercase">
				<Localized label="Infinity.Labels.Momentum" />
			</span>
			<div class="grid grid-cols-5 gap-1 items-center w-full">
				<a @click="modifyMomentum(-1)" class="text-center text-xl font-bold">-</a>
				<input
					v-if="directEditMomentum"
					type="number"
					class="col-span-3 text-4xl font-bold w-full text-center border-none !bg-white bg-opacity-30"
					@keydown.enter="noopReturn($event, momentumChanged)"
					:value="momentum"
					ref="directMomentumInput"
				/>
				<span v-else @click="toggleEditMomentum" class="col-span-3 text-4xl font-bold w-full text-center">{{ momentum }}</span>
				<a @click="modifyMomentum(1)" class="text-center text-xl font-bold">+</a>
			</div>
		</div>

		<div class="flex flex-col gap-1 items-center bg-red-800 rounded-lg w-full p-2">
			<span class="text-2xl text-white font-semibold uppercase">
				<Localized label="Infinity.Labels.Heat" />
			</span>
			<div class="grid grid-cols-5 gap-1 items-center w-full">
				<a v-if="isGM" @click="modifyHeat(-1)" class="text-center text-xl font-bold text-white">-</a>
				<input v-if="isGM && directEditHeat" type="number" class="col-span-3 text-4xl font-bold w-full text-center text-white !bg-white bg-opacity-30" @keydown.enter="noopReturn($event, heatChanged)" :value="heat" ref="directHeatInput" />
				<span
					v-else
					:class="{
						'col-span-3': isGM,
						'col-span-5': !isGM,
					}"
					class="text-4xl text-white font-bold w-full text-center"
					@click="toggleEditHeat"
				>
					{{ heat }}
				</span>
				<a v-if="isGM" @click="modifyHeat(1)" class="text-center text-xl font-bold text-white">+</a>
			</div>
		</div>
	</div>
</template>
