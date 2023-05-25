<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
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

const owned = computed(() => context.owned);

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
		<template #sidebar>
			<GearSidebar item-type="Armour" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
				<span class="flex gap-1">
					<strong>Type:</strong>
					<span>{{ system.type }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Type:</strong>
			<select :value="system.type" name="system.type" class="col-span-4">
				<option v-for="armourType in ArmourType.all" :key="armourType" :value="armourType">
					<Localized :label="`Infinity.Items.Armour.Type.${armourType}`" />
				</option>
			</select>

			<strong>BTS</strong>
			<input type="number" name="system.bts" :value="system.bts" class="col-span-4 text-center" />

			<!-- Human Armour -->
			<template v-if="system.type !== ArmourType.Symbiont">
				<span class="text-lg font-orbitron font-semibold col-span-5">Armour Soak</span>

				<strong>Head</strong>
				<input type="number" name="system.soak.head" :value="system.soak.head" :min="0" class="col-span-4 text-center" />

				<strong>Torso</strong>
				<input type="number" name="system.soak.torso" :value="system.soak.torso" :min="0" class="col-span-4 text-center" />

				<strong>Arms</strong>
				<input type="number" name="system.soak.arm" :value="system.soak.arm" :min="0" class="col-span-4 text-center" />

				<strong>Legs</strong>
				<input type="number" name="system.soak.leg" :value="system.soak.leg" :min="0" class="col-span-4 text-center" />
			</template>

			<!-- Symbiont Armour -->
			<!-- TODO: Symbionts have a few changes in the Tohaa sourcebook so this will eventually need to be readdressed. -->
			<template v-else>
				<strong>Armour Soak</strong>
				<input type="number" name="system.soak.symbiont" :value="system.soak.symbiont" class="col-span-4 text-center" />

				<strong>Vigour</strong>
				<input type="number" name="system.symbiont.vigour" :value="system.symbiont.vigour" class="col-span-4 text-center" />

				<strong>Wounds</strong>
				<input v-if="owned" type="number" name="system.symbiont.wounds.value" :value="system.symbiont.wounds.value" class="col-span-2 text-center" />
				<input
					type="number"
					name="system.symbiont.wounds.max"
					:value="system.symbiont.wounds.max"
					class="text-center col-span-2"
					:class="{
						'col-span-4': !owned,
					}"
				/>
			</template>

			<ItemQualitiesInput :qualities="system.qualities" :editable="context.editable" @rank-changed="rankChanged" @specialization-changed="specializationChanged" @remove="actions.removeQuality" class="col-span-5" />

			<span class="text-lg font-orbitron font-semibold col-span-5">Loadout</span>
			<em v-if="system.loadout.length === 0" class="col-span-5 ml-4">No Installed Equipment</em>
			<div
				v-for="(item, index) in system.loadout"
				:key="item.uuid"
				class="flex flex-nowrap items-center gap-2 bg-slate-400 hover:bg-slate-300 rounded-md p-1 text-white hover:text-black whitespace-nowrap border-[1px] border-solid border-slate-900 group/item col-span-5 ml-4"
			>
				<img :src="item.img" class="w-6 h-6 aspect-square border-0" />
				<a @click="openItem(item.uuid)">{{ item.name }}</a>
				<input v-if="context.editable" type="number" :value="item.quantity" :min="0" class="text-center w-10" @change="loadoutQuantityChanged(index, +($event.target as HTMLInputElement).value)" />
				<span v-else>({{ item.quantity }})</span>
				<div class="w-full" />
				<a v-if="context.editable" class="hidden group-hover/item:block text-xl -my-4 px-1" @click="actions.removeLoadoutItem(index)">&times;</a>
			</div>

			<strong>Restriction</strong>
			<input type="text" class="col-span-3 text-center" :value="system.restriction.value" name="system.restriction.value" />
			<!-- TODO: Label Concilium checkboxes -->
			<input class="justify-self-center" type="checkbox" :checked="system.restriction.concilium" name="system.restriction.concilium" />

			<strong class="whitespace-nowrap">Cost</strong>
			<input type="text" class="col-span-4 text-center" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<input type="text" class="col-span-4 text-center" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<input type="text" class="col-span-4 text-center" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
