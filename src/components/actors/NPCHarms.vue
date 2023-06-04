<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { HasHarmsData } from '@/actor/data/templates/HasStress';
import { useActorStore } from '@/stores/actorStore';

import Field from '../Field.vue';
import NPCBlock from '../NPCBlock.vue';

withDefaults(
	defineProps<{
		/**
		 * Whether to completely hide the Faults/Wounds column
		 */
		hideWounds?: boolean;

		/**
		 * Whether to show Faults instead of Wounds.
		 */
		showFaults?: boolean;
	}>(),
	{
		hideWounds: false,
		showFaults: false,
	},
);

const actorStore = useActorStore();
const { system: storeSystem } = storeToRefs(actorStore);

const system = computed(() => storeSystem.value as unknown as HasHarmsData);

type HarmCategory = 'breaches' | 'metanoia' | 'wounds';

async function addHarm(category: HarmCategory) {
	const harmEffects = system.value.harms[category].effects;

	await actorStore.update({
		[`system.harms.${category}.effects`]: [...harmEffects, `New ${category.capitalize()}`],
	});
}

async function removeHarm(category: HarmCategory, index: number) {
	const harmEffects = [...system.value.harms[category].effects];
	harmEffects.splice(index, 1);

	await actorStore.update({
		[`system.harms.${category}.effects`]: harmEffects,
	});
}
</script>

<template>
	<NPCBlock label="Harm Effects">
		<div
			class="grid whitespace-nowrap w-full bg-sky-100"
			:class="{
				'grid-cols-2': hideWounds,
				'grid-cols-3': !hideWounds,
			}"
		>
			<div class="flex flex-col flex-nowrap">
				<div class="flex flex-nowrap justify-center gap-1 items-center w-full text-center font-orbitron text-sm font-semibold bg-sky-200 px-1">
					<strong>Breaches ({{ system.harms.breaches.value }}/{{ system.harms.breaches.max }})</strong>
					<a @click="addHarm('breaches')">
						<i class="fas fa-plus" />
					</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1 p-0.5" v-for="(breach, index) in system.harms.breaches.effects" :key="index">
					<Field type="text" class="flex flex-nowrap items-center w-full" :value="breach" :name="`system.harms.breaches.effects.${index}`" />
					<a @click="removeHarm('breaches', index)">
						<i class="fas fa-trash" />
					</a>
				</div>
			</div>

			<div class="flex flex-col flex-nowrap">
				<div class="flex flex-nowrap justify-center gap-1 items-center w-full text-center font-orbitron text-sm font-semibold bg-sky-200 px-1">
					<strong>Metanoia ({{ system.harms.metanoia.value }}/{{ system.harms.metanoia.max }})</strong>
					<a @click="addHarm('metanoia')">
						<i class="fas fa-plus" />
					</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1 p-0.5" v-for="(breach, index) in system.harms.metanoia.effects" :key="index">
					<Field type="text" class="flex flex-nowrap items-center w-full" :value="breach" :name="`system.harms.metanoia.effects.${index}`" />
					<a @click="removeHarm('metanoia', index)">
						<i class="fas fa-trash" />
					</a>
				</div>
			</div>

			<div class="flex flex-col flex-nowrap" v-if="!hideWounds">
				<div class="flex flex-nowrap justify-center gap-1 items-center w-full text-center font-orbitron text-sm font-semibold bg-sky-200 px-1">
					<strong>{{ showFaults ? 'Faults' : 'Wounds' }} ({{ system.harms.wounds.value }}/{{ system.harms.wounds.max }})</strong>
					<a @click="addHarm('wounds')">
						<i class="fas fa-plus" />
					</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1 p-0.5" v-for="(breach, index) in system.harms.wounds.effects" :key="index">
					<Field type="text" class="flex flex-nowrap items-center w-full" :value="breach" :name="`system.harms.wounds.effects.${index}`" />
					<a @click="removeHarm('wounds', index)">
						<i class="fas fa-trash" />
					</a>
				</div>
			</div>
		</div>
	</NPCBlock>
</template>
