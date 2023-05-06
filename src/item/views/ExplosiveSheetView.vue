<script lang="ts" setup>
import { computed, inject } from 'vue';

import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';

import { ExplosiveCategory } from '../data/ExplosiveDataModel';
import { ItemSize } from '../data/templates/GearItemDataModel';
import { ExplosiveSheetContext } from '../sheets/ExplosiveSheet';

const context = inject<ExplosiveSheetContext>(RootContext)!;

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
			<strong>Category:</strong>
			<select :value="system.category" name="system.category" class="w-full">
				<option v-for="category in ExplosiveCategory.all" :key="category" :value="category">
					<Localized :label="`Infinity.Items.Explosive.Category.${category}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Damage:</strong>
			<input type="text" :value="system.damage" name="system.damage" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Size:</strong>
			<select :value="system.size" name="system.size" class="w-full">
				<option v-for="itemSize in ItemSize.all" :key="itemSize" :value="itemSize">
					{{ itemSize }}
				</option>
			</select>
		</div>

		<em>TODO: Item Qualities</em>

		<div class="flex items-center gap-2">
			<strong>Restriction:</strong>
			<input type="text" :value="system.restriction.value" name="system.restriction.value" />
			<input type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Cost (Per 3)</strong>
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
