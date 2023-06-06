<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import InfinitySheet from '@/components/InfinitySheet.vue';
import { useActorStore } from '@/stores/actorStore';

import CharacterDataModel from '../data/CharacterDataModel';

const actorStore = useActorStore<CharacterDataModel>();
const { name, img, system: storeSystem } = storeToRefs(actorStore);
const system = computed(() => storeSystem.value!);
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<img :src="img" data-edit="img" class="w-12 h-12 mx-auto" />

		<div class="grid grid-cols-4 items-center">
			<strong class="w-full text-center">Name</strong>
			<input type="text" name="name" :value="name" class="col-span-3" />

			<strong class="w-full text-center">Faction</strong>
			<input type="text" name="system.meta.faction" :value="system.meta.faction" />

			<strong class="w-full text-center">Heritage</strong>
			<input type="text" name="system.meta.heritage" :value="system.meta.heritage" />

			<strong class="w-full text-center">Homeworld</strong>
			<input type="text" name="system.meta.homeworld" :value="system.meta.homeworld" />

			<strong class="w-full text-center">Social Status</strong>
			<input type="text" name="system.meta.socialStatus" :value="system.meta.socialStatus" />
		</div>
	</InfinitySheet>
</template>
