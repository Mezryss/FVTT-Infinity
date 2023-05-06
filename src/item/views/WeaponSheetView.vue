<script lang="ts" setup>
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import { computed, inject } from 'vue';
import { WeaponType } from '../data/WeaponDataModel';
import { ItemSize } from '../data/templates/GearItemDataModel';
import { WeaponSheetContext } from '../sheets/WeaponSheet';

const context = inject<WeaponSheetContext>(RootContext)!;

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
			<select class="w-full" :value="system.type" name="system.type">
				<option v-for="weaponType in WeaponType.all" :key="weaponType" :value="weaponType">
					<Localized :label="`Infinity.Items.Weapon.Type.${weaponType}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Damage:</strong>
			<input type="text" :value="system.damage" name="system.damage" />
		</div>

		<div v-if="system.type === WeaponType.Ranged" class="flex items-center gap-2">
			<strong>Burst:</strong>
			<input type="text" :value="system.burst" name="system.burst" />
		</div>

		<div class="flex items-center gap-2">
			<strong>Size:</strong>
			<select class="w-full" :value="system.size" name="system.size">
				<option v-for="size in ItemSize.all" :key="size" :value="size">
					{{ size }}
				</option>
			</select>
		</div>

		<div v-if="system.type === WeaponType.Ranged" class="flex items-center gap-2">
			<strong>Ammo:</strong>
			<input type="text" :value="system.ammo.allowed" name="system.ammo.allowed" />
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
