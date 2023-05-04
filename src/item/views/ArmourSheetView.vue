<script lang="ts" setup>
import { RootContext } from '@/VueSheet';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import ArmourType from '@/data/ArmourType';
import { computed, inject } from 'vue';
import { ArmourSheetContext } from '../sheets/ArmourSheet';

const context = inject<ArmourSheetContext>(RootContext)!;

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
				<option v-for="armourType in ArmourType.all" :key="armourType" :value="armourType">
					<Localized :label="`Infinity.Items.Armour.Type.${armourType}`" />
				</option>
			</select>
		</div>

		<!-- Human Armours -->
		<div v-if="system.type !== ArmourType.Symbiont" class="flex flex-col gap-1">
			<h3>Armour Soak</h3>

			<div class="flex gap-1 items-center">
				<strong>Head</strong>
				<input type="number" name="system.soak.head" :value="system.soak.head" :min="0" />
			</div>
			<div class="flex gap-1 items-center">
				<strong>Torso</strong>
				<input type="number" name="system.soak.torso" :value="system.soak.torso" :min="0" />
			</div>
			<div class="flex gap-1 items-center">
				<strong>Arm</strong>
				<input type="number" name="system.soak.arm" :value="system.soak.arm" :min="0" />
			</div>
			<div class="flex gap-1 items-center">
				<strong>Leg</strong>
				<input type="number" name="system.soak.leg" :value="system.soak.leg" :min="0" />
			</div>

			<hr class="w-full" />

			<div class="flex gap-1 items-center">
				<strong>BTS</strong>
				<input type="number" name="system.bts" :value="system.bts" />
			</div>
		</div>

		<!-- Symbiont Armour -->
		<!-- TODO: Symbionts have a few changes in the Tohaa sourcebook so this will eventually need to be readdressed. -->
		<div v-else class="flex flex-col gap-1 whitespace-nowrap">
			<div class="flex gap-1 items-center">
				<strong>Armour Soak</strong>
				<input type="number" name="system.soak.symbiont" :value="system.soak.symbiont" />
			</div>

			<div class="flex gap-1 items-center">
				<strong>BTS</strong>
				<input type="number" name="system.bts" :value="system.bts" />
			</div>

			<div class="flex gap-1 items-center">
				<strong>Vigour</strong>
				<input type="number" name="system.symbiont.vigour" :value="system.symbiont.vigour" />
			</div>

			<div class="flex gap-1 items-center">
				<strong>Wounds</strong>
				<input type="number" name="system.symbiont.wounds.value" :value="system.symbiont.wounds.value" />
				<input type="number" name="system.symbiont.wounds.max" :value="system.symbiont.wounds.max" />
			</div>
		</div>

		<em>TODO: Item Qualities</em>

		<div class="flex items-center gap-2">
			<strong>Restriction:</strong>
			<input type="number" :min="0" :value="system.restriction.value" name="system.restriction.value" />
			<input type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />
			<input type="text" class="w-full" :value="system.restriction.notes" name="system.restriction.notes" />
		</div>

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Cost</strong>
			<input type="number" :min="0" :value="system.cost.static" name="system.cost.static" />
			<input type="number" :value="system.cost.rolled" name="system.cost.rolled" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Tariff</strong>
			<input type="number" :min="0" :value="system.tariff.value" name="system.tariff.value" />
			<input type="text" class="w-full" :value="system.tariff.notes" name="system.tariff.notes" />
		</div>
	</InfinitySheet>
</template>
