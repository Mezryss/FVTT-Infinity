<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import Attribute from '@/data/Attributes';
import { LHostSheetContext } from '../sheets/LHostSheet';

const context = inject<LHostSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<div class="flex items-center gap-2">
			<img :src="img" data-edit="img" class="aspect-square w-12 h-12" />
			<input type="text" name="name" :value="name" placeholder="Item Name" />
		</div>

		<hr class="w-full" />

		<div class="grid gap-x-2 gap-y-1 grid-cols-7 items-center">
			<div class="w-full text-center text-base font-semibold" v-for="attribute in Attribute.all" :key="attribute">
				<Localized :label="`Infinity.Attributes.Abbreviations.${attribute}`" />
			</div>

			<input type="number" class="w-full text-center" v-for="attribute in Attribute.all" :key="attribute" :value="system.attributes[attribute]" :name="`system.attributes.${attribute}`" />
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
			<strong class="whitespace-nowrap" data-tooltip="Only applicable during Character Creation">Life Point Cost</strong>
			<input type="text" :value="system.lpCost" name="system.lpCost" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Tariff</strong>
			<input type="text" class="w-full" :value="system.tariff" name="system.tariff" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Maintenance</strong>
			<input type="text" class="w-full" :value="system.maintenance" name="system.maintenance" />
		</div>

		<div v-if="system.specialAbilities.length > 0" class="flex flex-col gap-2">
			<h3>Special Abilities</h3>
			<div class="flex items-center gap-2" v-for="(ability, index) in system.specialAbilities" :key="ability.uuid">
				<img class="w-6 h-6" :src="ability.img" />
				<a class="w-full" @click="actions.openAbility(index)">{{ ability.name }}</a>
				<a class="px-1" @click="actions.removeAbility(index)">X</a>
			</div>
		</div>

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
