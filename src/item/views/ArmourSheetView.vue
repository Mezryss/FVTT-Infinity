<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { ArmourType } from '../data/ArmourDataModel';
import { ArmourSheetContext } from '../sheets/ArmourSheet';

const context = inject<ArmourSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

async function rankChanged(index: number, newRank: number) {
	await actions.value.updateQuality(index, {
		...system.value.qualities[index],
		rank: newRank,
	});
}

async function specializationChanged(index: number, newSpec: string) {
	await actions.value.updateQuality(index, {
		...system.value.qualities[index],
		specialization: newSpec,
	});
}

async function loadoutQuantityChanged(index: number, newQuantity: number) {
	await actions.value.updateLoadoutItem(index, {
		...system.value.loadout[index],
		quantity: newQuantity,
	});
}

async function openItem(uuid: string) {
	(await fromUuid(uuid))?.sheet?.render(true);
}
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
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

		<ItemQualitiesInput :qualities="system.qualities" :editable="context.editable" @rank-changed="rankChanged" @specialization-changed="specializationChanged" @remove="actions.removeQuality" />

		<div class="flex flex-col gap-1">
			<h3>Loadout</h3>
			<em v-if="system.loadout.length === 0">No Installed Equipment</em>
			<div
				v-for="(item, index) in system.loadout"
				:key="item.uuid"
				class="flex flex-nowrap items-center gap-2 bg-slate-400 hover:bg-slate-300 rounded-md p-1 text-white hover:text-black whitespace-nowrap border-[1px] border-solid border-slate-900 group/item"
			>
				<img :src="item.img" class="w-6 h-6 aspect-square border-0" />
				<a @click="openItem(item.uuid)">{{ item.name }}</a>
				<input v-if="context.editable" type="number" :value="item.quantity" :min="0" class="text-center w-10" @change="loadoutQuantityChanged(index, +($event.target as HTMLInputElement).value)" />
				<span v-else>({{ item.quantity }})</span>
				<div class="w-full" />
				<a v-if="context.editable" class="hidden group-hover/item:block text-xl -my-4 px-1" @click="actions.removeLoadoutItem(index)">&times;</a>
			</div>
		</div>

		<hr class="w-full" />

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

		<div class="flex items-center gap-2">
			<strong class="whitespace-nowrap">Maintenance</strong>
			<input type="number" :min="0" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
