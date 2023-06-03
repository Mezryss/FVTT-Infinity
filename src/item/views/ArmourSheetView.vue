<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Field from '@/components/Field.vue';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import ItemQualitiesInput from '@/components/itemQualities/ItemQualitiesInput.vue';
import ArmourLoadoutItemView from '@/components/items/ArmourLoadoutItem.vue';
import { useItemStore } from '@/stores/itemStore';

import ArmourDataModel, { ArmourLoadoutItem, ArmourType } from '../data/ArmourDataModel';

const itemStore = useItemStore<ArmourDataModel>();
const { name, img, system: storeSystem, editable, isOwned } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);

async function updateLoadoutItem(uuid: string, newValue: Partial<ArmourLoadoutItem>) {
	const loadoutCopy = [...system.value.loadout];

	const itemIdx = loadoutCopy.findIndex((i) => i.uuid === uuid);
	if (itemIdx < 0) {
		return;
	}

	loadoutCopy[itemIdx] = {
		...loadoutCopy[itemIdx],
		...newValue,
		// Ensure UUID is never accidentally changed.
		uuid,
	};

	await itemStore.update({
		'system.loadout': loadoutCopy,
	});
}

async function removeLoadoutItem(uuid: string) {
	await itemStore.update({
		'system.loadout': system.value.loadout.filter((i) => i.uuid !== uuid),
	});
}
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="armour" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
				<span class="flex gap-1">
					<strong>Type:</strong>
					<span>{{ system.type }}</span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Type:</strong>
			<select :value="system.type" name="system.type" class="col-span-4 px-2">
				<option v-for="armourType in ArmourType.all" :key="armourType" :value="armourType">
					<Localized :label="`Infinity.Items.Armour.Type.${armourType}`" />
				</option>
			</select>

			<strong>BTS</strong>
			<Field type="number" name="system.bts" :value="system.bts" class="col-span-4" />

			<!-- Human Armour -->
			<template v-if="system.type !== ArmourType.Symbiont">
				<span class="text-lg font-orbitron font-semibold col-span-5">Armour Soak</span>

				<strong>Head</strong>
				<Field type="number" name="system.soak.head" :value="system.soak.head" :min="0" class="col-span-4" />

				<strong>Torso</strong>
				<Field type="number" name="system.soak.torso" :value="system.soak.torso" :min="0" class="col-span-4" />

				<strong>Arms</strong>
				<Field type="number" name="system.soak.arm" :value="system.soak.arm" :min="0" class="col-span-4" />

				<strong>Legs</strong>
				<Field type="number" name="system.soak.leg" :value="system.soak.leg" :min="0" class="col-span-4" />
			</template>

			<!-- Symbiont Armour -->
			<!-- TODO: Symbionts have a few changes in the Tohaa sourcebook so this will eventually need to be readdressed. -->
			<template v-else>
				<strong>Armour Soak</strong>
				<Field type="number" name="system.soak.symbiont" :value="system.soak.symbiont" class="col-span-4" />

				<strong>Vigour</strong>
				<Field type="number" name="system.symbiont.vigour" :value="system.symbiont.vigour" class="col-span-4" />

				<strong>Wounds</strong>
				<Field v-if="isOwned" type="number" name="system.symbiont.wounds.value" :value="system.symbiont.wounds.value" class="col-span-2" />
				<Field
					type="number"
					name="system.symbiont.wounds.max"
					:value="system.symbiont.wounds.max"
					class="col-span-2"
					:class="{
						'col-span-4': !isOwned,
					}"
				/>
			</template>

			<ItemQualitiesInput :qualities="system.qualities" :editable="editable" class="col-span-5" />

			<span class="text-lg font-orbitron font-semibold col-span-5">Loadout</span>
			<em v-if="system.loadout.length === 0" class="col-span-5 ml-4">No Installed Equipment</em>
			<ArmourLoadoutItemView
				v-for="item in system.loadout"
				:key="item.uuid"
				:uuid="item.uuid"
				:quantity="item.quantity"
				:editable="editable"
				@delete="removeLoadoutItem(item.uuid)"
				@quantity-changed="updateLoadoutItem(item.uuid, { quantity: $event })"
			/>

			<strong>Restriction</strong>
			<Field type="text" class="col-span-4 font-infinity-icon" :value="system.restriction" name="system.restriction" :editable="editable" />

			<strong class="whitespace-nowrap">Cost</strong>
			<Field type="text" class="col-span-4" :value="system.cost" name="system.cost" />

			<strong>Tariff</strong>
			<Field type="text" class="col-span-4" :value="system.tariff" name="system.tariff" />

			<strong>Maintenance</strong>
			<Field type="text" class="col-span-4" :value="system.maintenance" name="system.maintenance" />
		</div>
	</ItemSheet>
</template>
