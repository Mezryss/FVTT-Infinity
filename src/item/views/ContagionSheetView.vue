<script lang="ts" setup>
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import { computed, inject } from 'vue';
import { ContagionCategory, ContagionTerm, ContagionType } from '../data/ContagionDataModel';
import { ContagionSheetContext } from '../sheets/ContagionSheet';
import DamageType from '@/data/DamageType';

const context = inject<ContagionSheetContext>(RootContext)!;

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
				<option v-for="category in ContagionCategory.all" :key="category" :value="category">
					<Localized :label="`Infinity.Items.Contagion.Category.${category}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Type:</strong>
			<select :value="system.type.value" name="system.type.value" class="w-full">
				<option v-for="contagionType in ContagionType.all" :key="contagionType" :value="contagionType">
					<Localized :label="`Infinity.Items.Contagion.Type.${contagionType}`" />
				</option>
			</select>
			<input type="number" :min="0" :value="system.type.difficulty" name="system.type.difficulty" />
			<input type="number" :min="0" :value="system.type.momentum" name="system.type.momentum" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Term:</strong>
			<select :value="system.term" name="system.term" class="w-full">
				<option v-for="term in ContagionTerm.all" :key="term" :value="term">
					<Localized :label="`Infinity.Items.Contagion.Term.${term}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Vector:</strong>
			<input type="text" :value="system.vector" name="system.vector" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Damage:</strong>
			<input type="number" :value="system.damage.static" name="system.damage.static" />
			<input type="number" :value="system.damage.rolled" name="system.damage.rolled" />
			<select :value="system.damage.type" name="system.damage.type">
				<option v-for="damageType in DamageType.all" :key="damageType" :value="damageType">
					{{ damageType }}
				</option>
			</select>
		</div>

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
