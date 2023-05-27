<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import InfinityItem from '../InfinityItem';
import ProgramDataModel, { ProgramType } from '../data/ProgramDataModel';
import { HackingDeviceSheetContext } from '../sheets/HackingDeviceSheet';

const context = inject<HackingDeviceSheetContext>(RootContext)!;

const actions = computed(() => context.actions!);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const editable = computed(() => context.editable);

const programs = computed(() =>
	context.system.programs.filter((program) => {
		const programItem = fromUuidSync(program.uuid) as InfinityItem<ProgramDataModel>;

		return programItem && programItem.system.type !== ProgramType.Upgrade;
	}),
);
const upgrades = computed(() =>
	context.system.programs.filter((program) => {
		const programItem = fromUuidSync(program.uuid) as InfinityItem<ProgramDataModel>;

		return programItem && programItem.system.type === ProgramType.Upgrade;
	}),
);

async function openProgram(uuid: string) {
	const item = await fromUuid(uuid);
	await item?.sheet?.render(true);
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
			<div v-for="program in upgrades" :key="program.uuid" class="flex flex-nowrap items-center gap-2 p-1 col-span-5 ml-4 rounded-md border-1 border-solid border-slate-900 bg-slate-900 bg-opacity-10 hover:bg-opacity-20">
				<img class="w-6 h-6" :src="program.img" />
				<a class="w-full" @click="openProgram(program.uuid)">{{ program.name }}</a>
				<a class="px-1" @click="actions.removeProgram(program.uuid)"><i class="fas fa-trash" /></a>
			</div>

			<span class="text-lg font-orbitron font-semibold col-span-5">Installed Programs</span>
			<em v-if="programs.length === 0" class="ml-4 col-span-5">No Programs Installed</em>
			<div v-for="program in programs" :key="program.uuid" class="flex flex-nowrap items-center gap-2 p-1 col-span-5 ml-4 rounded-md border-1 border-solid border-slate-900 bg-slate-900 bg-opacity-10 hover:bg-opacity-20">
				<img class="w-6 h-6" :src="program.img" />
				<a class="w-full" @click="openProgram(program.uuid)">{{ program.name }}</a>
				<a class="px-1" @click="actions.removeProgram(program.uuid)"><i class="fas fa-trash" /></a>
			</div>
		</div>
	</ItemSheet>
</template>
