<script lang="ts" setup>
import { RootContext } from '@/VueSheet';
import InfinitySheet from '@/components/InfinitySheet.vue';
import { computed, inject } from 'vue';
import { CharacterSheetContext } from '../sheets/CharacterSheet';

const context = inject<CharacterSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const talents = computed(() => context.talents);
</script>

<template>
	<InfinitySheet class="flex flex-col">
		<h1 class="w-full">Character Sheet</h1>
		<h3 class="w-full">Talents</h3>
		<div v-for="talent in talents" :key="talent.id">
			<div class="flex gap-2 text-base">
				<strong>{{ talent.name }}</strong>

				<div v-if="talent.system.isRanked" class="flex w-full whitespace-nowrap gap-1 items-center">
					<a class="text-lg" @click="actions.updateTalentRank(talent.id, -1)">-</a>
					<span class="whitespace-nowrap">{{ talent.system.rank.current }} / {{ talent.system.rank.max }}</span>
					<a class="text-lg" @click="actions.updateTalentRank(talent.id)">+</a>
				</div>
			</div>
		</div>
	</InfinitySheet>
</template>
