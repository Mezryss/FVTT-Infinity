<script lang="ts" setup>
import { computed, inject } from 'vue';

import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';

import { ProgramType } from '../data/ProgramDataModel';
import { ProgramSheetContext } from '../sheets/ProgramSheet';

const context = inject<ProgramSheetContext>(RootContext)!;

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

		<div class="flex items-center gap-2">
			<strong>Type:</strong>
			<select :value="system.type" name="system.type">
				<option v-for="programType in ProgramType.all" :key="programType" :value="programType">
					<Localized :label="`Infinity.Items.Program.Type.${programType}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Rating:</strong>
			<input type="text" :value="system.rating" name="system.rating" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Damage:</strong>
			<input type="text" :value="system.damage" name="system.damage" />
		</div>

		<em>TODO: Item Qualities</em>

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

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
