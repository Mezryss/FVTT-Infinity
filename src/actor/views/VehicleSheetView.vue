<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, toRaw } from 'vue';

import ContextMenu from '@/components/ContextMenu.vue';
import Editor from '@/components/Editor.vue';
import Enriched from '@/components/Enriched.vue';
import Field from '@/components/Field.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import MenuItem from '@/components/MenuItem.vue';
import NPCBlock from '@/components/NPCBlock.vue';
import TitleBox from '@/components/TitleBox.vue';
import SheetBody from '@/components/tabs/SheetBody.vue';
import TabBar from '@/components/tabs/TabBar.vue';
import TabContent from '@/components/tabs/TabContent.vue';
import TabLink from '@/components/tabs/TabLink.vue';
import InfinityItem from '@/item/InfinityItem';
import AbilityDataModel from '@/item/data/AbilityDataModel';
import WeaponDataModel, { WeaponType } from '@/item/data/WeaponDataModel';
import { useActorStore } from '@/stores/actorStore';

import VehicleDataModel from '../data/VehicleDataModel';

const actorStore = useActorStore<VehicleDataModel>();
const { name, img, system: storeSystem, items } = storeToRefs(actorStore);
const system = computed(() => storeSystem.value!);

const abilities = computed(() => items.value.filter((i) => i.type === 'ability') as InfinityItem<AbilityDataModel>[]);
const gear = computed(() => items.value.filter((i) => !['ability', 'weapon'].includes(i.type)) as InfinityItem[]);
const weapons = computed(() => items.value.filter((i) => i.type === 'weapon') as InfinityItem<WeaponDataModel>[]);

async function openItem(uuid: string) {
	const item = await fromUuid(uuid);
	item?.sheet?.render(true);
}
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<TitleBox class="-m-0.5">
			<img :src="img" data-edit="img" class="aspect-square h-14 border-none bg-sky-300 bg-opacity-75 hover:cursor-pointer rounded-md" />
			<div class="flex flex-col gap-1 w-full font-orbitron">
				<input type="text" name="name" :value="name" placeholder="Item Name" class="text-sky-100 font-semibold p-1 text-lg border-0" />
				<Field type="text" name="system.types" :value="system.types" placeholder="Vehicle Type(s)" class="text-sky-100 p-1 border-0 placeholder:text-sky-100" />
			</div>
		</TitleBox>

		<div class="w-full h-full flex flex-col flex-nowrap @container">
			<TabBar>
				<TabLink tab="details">Details</TabLink>
				<TabLink tab="description">Description</TabLink>
			</TabBar>

			<SheetBody>
				<TabContent tab="details">
					<div class="flex flex-col gap-2">
						<NPCBlock label="Attributes">
							<div class="grid grid-cols-3 gap-0.5 w-full max-w-5xl">
								<span class="w-full text-center bg-sky-200 uppercase p-0.5 font-roboto-flex font-semibold text-blue-950 flex items-center gap-1 justify-center">Scale</span>
								<span class="w-full text-center bg-sky-200 uppercase p-0.5 font-roboto-flex font-semibold text-blue-950 flex items-center gap-1 justify-center">Speed</span>
								<span class="w-full text-center bg-sky-200 uppercase p-0.5 font-roboto-flex font-semibold text-blue-950 flex items-center gap-1 justify-center">Brawn</span>

								<Field type="number" class="w-full text-center bg-white border-0 rounded-none" :value="system.scale" :min="0" name="system.scale" />
								<Field type="number" class="w-full text-center bg-white border-0 rounded-none" :value="system.speed" :min="0" name="system.speed" />
								<Field type="number" class="w-full text-center bg-white border-0 rounded-none" :value="system.brawn.value" :min="0" name="system.brawn.value" />
							</div>
						</NPCBlock>

						<NPCBlock label="Details">
							<div class="grid grid-cols-2 gap-0.5 w-full max-w-5xl">
								<span class="w-full text-center bg-sky-200 uppercase p-0.5 font-roboto-flex font-semibold text-blue-950 flex items-center gap-1 justify-center">Max. Passengers</span>
								<span class="w-full text-center bg-sky-200 uppercase p-0.5 font-roboto-flex font-semibold text-blue-950 flex items-center gap-1 justify-center">Impact</span>

								<Field type="text" class="w-full text-center bg-white border-0 rounded-none" :value="system.passengers" name="system.passengers" />
								<Field type="text" class="w-full text-center bg-white border-0 rounded-none" :value="system.impact" name="system.impact" />
							</div>
						</NPCBlock>

						<NPCBlock label="Defences">
							<div class="grid grid-cols-8 grid-rows-2 items-center gap-0.5 max-w-5xl">
								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Structure</span>
								<Field type="number" :min="0" :value="system.stress.vigour.value" name="system.stress.vigour.value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.stress.vigour.max" name="system.stress.vigour.max" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Firewall</span>
								<Field type="number" :min="0" :value="system.stress.firewall.value" name="system.stress.firewall.value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.stress.firewall.max" name="system.stress.firewall.max" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Armour</span>
								<Field type="number" :min="0" :value="system.defences.armour" name="system.defences.armour" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none col-span-2" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">BTS</span>
								<Field type="number" :min="0" :value="system.bts" name="system.bts" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none col-span-2" />
							</div>
						</NPCBlock>

						<div class="flex flex-col bg-sky-600 bg-opacity-40 -my-2 p-2 rounded-br-3xl gap-0.5">
							<span class="font-orbitron text-lg font-bold uppercase">Mounted Weapons</span>
							<ul v-if="weapons.length > 0" class="-mt-1 list-disc">
								<li v-for="weapon in weapons" :key="weapon.uuid" class="mb-2 last:mb-0">
									<span class="flex flex-wrap items-center font-roboto-flex gap-x-1">
										<ContextMenu orientation="left">
											<template #menu-items>
												<MenuItem @click="toRaw(weapon).sheet?.render(true)">
													<template #icon><i class="fas fa-edit" /></template>
													Edit Item
												</MenuItem>

												<MenuItem @click="toRaw(weapon).delete()">
													<template #icon><i class="fas fa-trash" /></template>
													Delete Item
												</MenuItem>
											</template>
											<a class="font-semibold" @click="toRaw(weapon).sheet?.render(true)">{{ weapon.name }}:</a>
										</ContextMenu>
										<span>{{ weapon.system.type }},</span>
										<span v-if="weapon.system.type === WeaponType.Ranged">Range {{ weapon.system.range }},</span>
										<a class="after:content-[','] after:-ml-1 last:after:content-none flex flex-nowrap gap-1">
											<span class="font-infinity-icon">{{ weapon.system.damage }}</span>
											<span>damage</span>
										</a>
										<span v-if="weapon.system.type === WeaponType.Ranged" class="after:content-[','] last:after:content-none">Burst {{ weapon.system.burst }}</span>
										<a v-for="quality in weapon.system.qualities" :key="quality.uuid" class="after:-ml-1 after:content-[','] last:after:content-none flex flex-nowrap items-center gap-1" @click="openItem(quality.uuid)">
											<span>{{ quality.name }}</span>
											<span v-if="quality.specialization">({{ quality.specialization }})</span>
											<span v-if="quality.rank > 0">{{ quality.rank }}</span>
										</a>
									</span>
								</li>
							</ul>
							<span class="pl-2 oblique" v-else>Drag & drop Weapon items to add Attacks</span>

							<span class="font-orbitron text-lg font-bold uppercase">Gear</span>
							<span class="pl-3 flex flex-wrap gap-1">
								<ContextMenu v-for="item in gear" :key="item.uuid" class="after:content-[','] last:after:content-none" orientation="left">
									<template #menu-items>
										<MenuItem @click="toRaw(item).sheet?.render(true)">
											<template #icon><i class="fas fa-edit" /></template>
											Edit Item
										</MenuItem>

										<MenuItem @click="toRaw(item).delete()">
											<template #icon><i class="fas fa-trash" /></template>
											Delete Item
										</MenuItem>
									</template>

									<a @click="openItem(item.uuid)">{{ item.name }}</a>
								</ContextMenu>
								<span class="oblique" v-if="gear.length === 0">Drag & drop items to add Gear</span>
							</span>

							<span class="font-orbitron text-lg font-bold uppercase">Special Abilities</span>
							<ul v-if="abilities.length > 0" class="-mt-1 list-disc">
								<li v-for="ability in abilities" :key="ability.uuid" class="mb-2 last:mb-0">
									<span class="flex flex-wrap items-center font-roboto-flex gap-x-1">
										<ContextMenu orientation="left">
											<template #menu-items>
												<MenuItem @click="toRaw(ability).sheet?.render(true)">
													<template #icon><i class="fas fa-edit" /></template>
													Edit Item
												</MenuItem>

												<MenuItem @click="toRaw(ability).delete()">
													<template #icon><i class="fas fa-trash" /></template>
													Delete Item
												</MenuItem>
											</template>

											<a class="font-semibold" @click="toRaw(ability).sheet?.render(true)">{{ ability.name }}:</a>
										</ContextMenu>
										<Enriched :value="ability.system.description" />
									</span>
								</li>
							</ul>
							<span class="pl-2 oblique" v-else>Drag & drop Special Ability items to add Abilities</span>
						</div>
					</div>
				</TabContent>

				<TabContent tab="description">
					<div class="flex flex-col items-start gap-2 h-full min-h-[10em] w-full px-2">
						<Editor name="system.description" :content="system.description" button />
					</div>
				</TabContent>
			</SheetBody>
		</div>

		<!--
		<h3>Defences</h3>
		<div class="grid grid-cols-3 gap-x-2 gap-y-1">
			<span class="text-base w-full text-center">Structure</span>
			<input type="number" class="text-base w-full text-center" :min="0" :max="system.stress.vigour.max" :value="system.stress.vigour.value" name="system.stress.vigour.value" />
			<input type="number" class="text-base w-full text-center" :min="0" :value="system.stress.vigour.max" name="system.stress.vigour.max" />

			<span class="text-base w-full text-center">Firewall</span>
			<input type="number" class="text-base w-full text-center" :min="0" :max="system.stress.firewall.max" :value="system.stress.firewall.value" name="system.stress.firewall.value" />
			<input type="number" class="text-base w-full text-center" :min="0" :value="system.stress.firewall.max" name="system.stress.firewall.max" />

			<span class="text-base w-full text-center">Armour</span>
			<input type="number" class="text-base w-full text-center col-span-2" :min="0" :value="system.defences.armour" name="system.defences.armour" />

			<span class="text-base w-full text-center">BTS</span>
			<input type="number" class="text-base w-full text-center col-span-2" :min="0" :value="system.bts" name="system.bts" />
		</div>

		<h3>Mounted Weapons</h3>
		<ul>
			<li v-for="attack in weapons" :key="attack.uuid" class="flex flex-row flex-wrap items-center gap-1">
				<a class="-my-4 text-xl" @click="toRaw(attack).delete()">&times;</a>
				<strong>{{ attack.name }}:</strong>
				<span v-if="attack.system.type === WeaponType.Ranged">Range {{ attack.system.range }},</span>
				<span>{{ attack.system.damage }} damage,</span>
				<span v-if="attack.system.type === WeaponType.Ranged">Burst {{ attack.system.burst }},</span>
				<span>{{ attack.system.size }},</span>
				<span v-for="quality in attack.system.qualities" :key="quality.uuid" class="after:content-[','] last:after:content-['']">{{ quality.name }}</span>
			</li>
		</ul>

		<h3>Gear</h3>
		<div class="flex flex-wrap gap-1">
			<div v-for="item in gear" :key="item.uuid">{{ item.name }} <a @click="toRaw(item).delete()" class="text-lg -my-2">&times;</a></div>
		</div>

		<h3>Special Abilities</h3>
		<ul>
			<li v-for="ability in abilities" :key="ability.uuid" class="flex flex-row flex-wrap items-center gap-1">
				<a class="-my-4 text-xl" @click="toRaw(ability).delete()">&times;</a>
				<strong>{{ ability.name }}:</strong>
				<Enriched :value="ability.system.description" />
			</li>
		</ul>
		-->
	</InfinitySheet>
</template>
