<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import HackingDeviceProgram from '@/components/items/HackingDeviceProgram.vue';
import { useItemStore } from '@/stores/itemStore';

import InfinityItem from '../InfinityItem';
import HackingDeviceDataModel from '../data/HackingDeviceDataModel';
import ProgramDataModel, { ProgramType } from '../data/ProgramDataModel';

const itemStore = useItemStore<HackingDeviceDataModel>();
const { name, img, system: storeSystem, editable } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);

const programs = computed(() =>
	system.value.programs.filter((program) => {
		const programItem = fromUuidSync(program.uuid) as InfinityItem<ProgramDataModel>;

		return programItem && programItem.system.type !== ProgramType.Upgrade;
	}),
);
const upgrades = computed(() =>
	system.value.programs.filter((program) => {
		const programItem = fromUuidSync(program.uuid) as InfinityItem<ProgramDataModel>;

		return programItem && programItem.system.type === ProgramType.Upgrade;
	}),
);

async function removeProgram(uuid: string) {
	await itemStore.update({
		'system.programs': system.value.programs.filter((p) => p.uuid !== uuid),
	});
}
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="hackingDevice" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff">
				<span class="flex flex-wrap gap-1">
					<span>CLAW-{{ system.claw }},</span>
					<span>SWORD-{{ system.sword }},</span>
					<span>SHIELD-{{ system.shield }},</span>
					<span>GADGET-{{ system.gadget }},</span>
					<span>IC-{{ system.ic }}{{ upgrades.length > 0 ? ',' : null }}</span>
					<span v-if="upgrades.length > 0">UPGRADE-{{ upgrades.map((p) => p.name).join(', ') }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>CLAW</strong>
			<Field type="number" :min="0" :value="system.claw" name="system.claw" class="col-span-4" />

			<strong>SWORD</strong>
			<Field type="number" :min="0" :value="system.sword" name="system.sword" class="col-span-4" />

			<strong>SHIELD</strong>
			<Field type="number" :min="0" :value="system.shield" name="system.shield" class="col-span-4" />

			<strong>GADGET</strong>
			<Field type="number" :min="0" :value="system.gadget" name="system.gadget" class="col-span-4" />

			<strong>IC</strong>
			<Field type="number" :min="0" :value="system.ic" name="system.ic" class="col-span-4" />

			<strong>Restriction</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.restriction" name="system.restriction" :editable="editable" />

			<strong class="whitespace-nowrap">Cost</strong>
			<Field type="text" class="col-span-4" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<Field type="text" class="col-span-4" :value="system.tariff" name="system.tariff" />

			<span class="text-lg font-orbitron font-semibold col-span-5">Upgrades</span>
			<em v-if="upgrades.length === 0" class="ml-4 col-span-5">No Upgrades</em>
			<HackingDeviceProgram v-for="program in upgrades" :key="program.uuid" :uuid="program.uuid" :editable="editable" @delete="removeProgram(program.uuid)" />

			<span class="text-lg font-orbitron font-semibold col-span-5">Installed Programs</span>
			<em v-if="programs.length === 0" class="ml-4 col-span-5">No Programs Installed</em>
			<HackingDeviceProgram v-for="program in programs" :key="program.uuid" :uuid="program.uuid" :editable="editable" @delete="removeProgram(program.uuid)" />
		</div>
	</ItemSheet>
</template>
