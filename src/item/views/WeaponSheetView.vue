<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import GearSidebar from '@/components/GearSidebar.vue';
import ItemQualitiesInput from '@/components/ItemQualitiesInput.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import { WeaponType } from '../data/WeaponDataModel';
import { ItemSize } from '../data/templates/HasGearData';
import { WeaponSheetContext } from '../sheets/WeaponSheet';

const context = inject<WeaponSheetContext>(RootContext)!;

const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<GearSidebar item-type="weapon" :restriction="system.restriction" :cost="system.cost" :tariff="system.tariff" :maintenance="system.maintenance">
				<span class="flex gap-1">
					<strong>Range:</strong>
					<span>{{ system.range }}</span>
				</span>

				<span class="flex gap-1">
					<strong>Damage:</strong>
					<span>{{ system.damage }}</span>
				</span>

				<span class="flex gap-1">
					<strong>Burst:</strong>
					<span>{{ system.burst }}</span>
				</span>

				<span class="flex gap-1">
					<strong>Size:</strong>
					<span><Localized :label="`Infinity.Items.Size.${system.size}`" /></span>
				</span>
			</GearSidebar>
		</template>

		<div class="w-full grid grid-cols-2 @md:grid-cols-5 items-center gap-1">
			<strong>Type</strong>
			<select class="w-full col-span-4" :value="system.type" name="system.type">
				<option v-for="weaponType in WeaponType.all" :key="weaponType" :value="weaponType">
					<Localized :label="`Infinity.Items.Weapon.Type.${weaponType}`" />
				</option>
			</select>

			<strong>Damage</strong>
			<input type="text" :value="system.damage" name="system.damage" class="col-span-4 text-center" />

			<strong>Burst</strong>
			<input type="text" :value="system.burst" name="system.burst" class="col-span-4 text-center" />

			<template v-if="system.type === WeaponType.Ranged">
				<strong>Range</strong>
				<input type="text" :value="system.range" name="system.range" class="col-span-4 text-center" />
			</template>

			<strong>Size</strong>
			<select class="col-span-4" :value="system.size" name="system.size">
				<option v-for="size in ItemSize.all" :key="size" :value="size">
					<Localized :label="`Infinity.Items.Size.${size}`" />
				</option>
			</select>

			<strong>Ammo</strong>
			<input type="text" :value="system.ammo.allowed" name="system.ammo.allowed" class="col-span-4 text-center" />

			<ItemQualitiesInput :qualities="system.qualities" :editable="context.editable" class="col-span-5" />

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
