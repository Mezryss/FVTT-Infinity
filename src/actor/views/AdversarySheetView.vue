<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ContextMenu from '@/components/ContextMenu.vue';
import Editor from '@/components/Editor.vue';
import Enriched from '@/components/Enriched.vue';
import Field from '@/components/Field.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import MenuItem from '@/components/MenuItem.vue';
import NPCBlock from '@/components/NPCBlock.vue';
import TitleBox from '@/components/TitleBox.vue';
import NPCHarms from '@/components/actors/NPCHarms.vue';
import SheetBody from '@/components/tabs/SheetBody.vue';
import TabBar from '@/components/tabs/TabBar.vue';
import TabContent from '@/components/tabs/TabContent.vue';
import TabLink from '@/components/tabs/TabLink.vue';
import Attribute from '@/data/Attributes';
import InfinityItem from '@/item/InfinityItem';
import AbilityDataModel from '@/item/data/AbilityDataModel';
import WeaponDataModel, { WeaponType } from '@/item/data/WeaponDataModel';
import { useActorStore } from '@/stores/actorStore';

import AdversaryDataModel, { AdversaryType } from '../data/AdversaryDataModel';

const actorStore = useActorStore<AdversaryDataModel>();
const { name, img, system: storeSystem, type, items } = storeToRefs(actorStore);
const system = computed(() => storeSystem.value!);

const attacks = computed(() => items.value.filter(i => i.type === 'weapon') as InfinityItem<WeaponDataModel>[]);
const abilities = computed(() => items.value.filter(i => i.type === 'ability') as InfinityItem<AbilityDataModel>[]);
const gear = computed(() => items.value.filter(i => !['ability', 'itemQuality', 'talent', 'weapon'].includes(i.type)));

const isRemote = computed(() => type.value === 'remote');

async function openItem(uuid: string) {
	const item = await fromUuid(uuid);
	await item?.sheet?.render(true);
}

async function deleteItem(uuid: string) {
	const item = await fromUuid(uuid);
	await item?.delete();
}
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<TitleBox class="-m-0.5">
			<img :src="img" data-edit="img" class="aspect-square h-14 border-none bg-sky-300 bg-opacity-75 hover:cursor-pointer rounded-md" />
			<div class="flex flex-col gap-1 w-full font-orbitron">
				<div class="flex">
					<select class="h-6 text-sm font-semibold border-0 text-sky-100" :value="system.type" name="system.type">
						<option v-for="adversaryType in AdversaryType.all" :key="adversaryType" :value="adversaryType" class="text-black bg-sky-200">
							<Localized :label="`Infinity.Actors.Adversary.Category.${adversaryType}`" />
						</option>
					</select>
					<span class="w-full" />
				</div>

				<input type="text" name="name" :value="name" placeholder="Item Name" class="text-sky-100 font-semibold p-1 text-lg border-0" />
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
							<div class="grid grid-cols-7 gap-0.5 max-w-5xl">
								<span v-for="attribute in Attribute.all" :key="attribute" class="w-full text-center bg-sky-200 uppercase p-0.5 font-roboto-flex font-semibold text-blue-950 flex items-center gap-1 justify-center">
									<Localized :label="`Infinity.Attributes.Abbreviations.${attribute}`" />
									<span v-if="system.attributes[attribute].superhuman > 0" class="cursor-help" :data-tooltip="`Superhuman ${attribute}`">(+{{ system.attributes[attribute].superhuman }})</span>
								</span>

								<input
									v-for="attribute in Attribute.all"
									:key="attribute"
									type="number"
									class="w-full text-center bg-white border-0 rounded-none"
									:value="system.attributes[attribute].value"
									:min="0"
									:name="`system.attributes.${attribute}.value`"
								/>
							</div>
						</NPCBlock>

						<NPCBlock label="Fields of Expertise">
							<div class="grid grid-cols-12 grid-rows-2 items-center gap-0.5 max-w-5xl">
								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">
									<a>Combat</a>
								</span>
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.combat.expertise" name="system.fieldsOfExpertise.combat.expertise" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.combat.focus" name="system.fieldsOfExpertise.combat.focus" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">
									<a>Movement</a>
								</span>
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.movement.expertise" name="system.fieldsOfExpertise.movement.expertise" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.movement.focus" name="system.fieldsOfExpertise.movement.focus" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">
									<a>Social</a>
								</span>
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.social.expertise" name="system.fieldsOfExpertise.social.expertise" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.social.focus" name="system.fieldsOfExpertise.social.focus" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">
									<a>Fortitude</a>
								</span>
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.fortitude.expertise" name="system.fieldsOfExpertise.fortitude.expertise" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.fortitude.focus" name="system.fieldsOfExpertise.fortitude.focus" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">
									<a>Senses</a>
								</span>
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.senses.expertise" name="system.fieldsOfExpertise.senses.expertise" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.senses.focus" name="system.fieldsOfExpertise.senses.focus" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">
									<a>Technical</a>
								</span>
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.technical.expertise" name="system.fieldsOfExpertise.technical.expertise" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.fieldsOfExpertise.technical.focus" name="system.fieldsOfExpertise.technical.focus" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
							</div>
						</NPCBlock>

						<NPCBlock label="Defences">
							<div class="grid grid-cols-12 grid-rows-2 items-center gap-0.5 max-w-5xl">
								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Firewall</span>
								<Field type="number" :min="0" :value="system.stress.firewall.value" name="system.stress.firewall.value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.stress.firewall.max" name="system.stress.firewall.max" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" readonly />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Resolve</span>
								<Field type="number" :min="0" :value="system.stress.resolve.value" name="system.stress.resolve.value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.stress.resolve.max" name="system.stress.resolve.max" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" readonly />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">{{ isRemote ? 'Structure' : 'Vigour' }}</span>
								<Field type="number" :min="0" :value="system.stress.vigour.value" name="system.stress.vigour.value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.stress.vigour.max" name="system.stress.vigour.max" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" readonly />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Security</span>
								<Field type="number" :min="0" :value="system.defences.security" name="system.defences.security" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none col-span-2" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Morale</span>
								<Field type="number" :min="0" :value="system.defences.morale" name="system.defences.morale" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none col-span-2" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Armour</span>
								<Field type="number" :min="0" :value="system.defences.armour" name="system.defences.armour" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none col-span-2" />
							</div>
						</NPCBlock>

						<NPCHarms />

						<div class="flex flex-col bg-sky-600 bg-opacity-40 -my-2 p-2 rounded-br-3xl gap-0.5">
							<span v-if="system.type === AdversaryType.Nemesis" class="font-orbitron text-lg font-bold uppercase flex gap-2 whitespace-nowrap">
								<!-- TODO: Replace with a shared Infinity Points component in the future. -->
								<span data-tooltip="Will be replaced with a proper, shared control in the future.">Infinity Points:</span>
								<Field type="number" :min="0" :value="system.infinityPoints" name="system.infinityPoints" class="border-0 bg-white bg-opacity-50 text-center" />
							</span>

							<span class="font-orbitron text-lg font-bold uppercase">Attacks</span>
							<ul v-if="attacks.length > 0" class="-mt-1 list-disc">
								<li v-for="attack in attacks" :key="attack.uuid" class="mb-2 last:mb-0">
									<span class="flex flex-wrap items-center font-roboto-flex gap-x-1">
										<ContextMenu orientation="left">
											<template #menu-items>
												<MenuItem @click="openItem(attack.uuid)">
													<template #icon><i class="fas fa-edit" /></template>
													Edit Item
												</MenuItem>

												<MenuItem @click="deleteItem(attack.uuid)">
													<template #icon><i class="fas fa-trash" /></template>
													Delete Item
												</MenuItem>
											</template>
											<a class="font-semibold" @click="openItem(attack.uuid)">{{ attack.name }}:</a>
										</ContextMenu>
										<span>{{ attack.system.type }},</span>
										<span v-if="attack.system.type === WeaponType.Ranged">Range {{ attack.system.range }},</span>
										<a class="after:content-[','] after:-ml-1 last:after:content-none flex flex-nowrap gap-1">
											<span class="font-infinity-icon">{{ attack.system.damage }}</span>
											<span>damage</span>
										</a>
										<span v-if="attack.system.type === WeaponType.Ranged" class="after:content-[','] last:after:content-none">Burst {{ attack.system.burst }}</span>
										<a v-for="quality in attack.system.qualities" :key="quality.uuid" class="after:-ml-1 after:content-[','] last:after:content-none flex flex-nowrap items-center gap-1" @click="openItem(quality.uuid)">
											<span>{{ quality.name }}</span>
											<span v-if="quality.specialization">({{ quality.specialization }})</span>
											<span v-if="quality.rank > 0">{{ quality.rank }}</span>
										</a>
									</span>
								</li>
							</ul>
							<em class="pl-2" v-else>Drag & drop Weapon items to add Attacks</em>

							<span class="font-orbitron text-lg font-bold uppercase">Gear</span>
							<span class="pl-3 flex flex-wrap gap-1">
								<ContextMenu v-for="item in gear" :key="item.uuid" class="after:content-[','] last:after:content-none" orientation="left">
									<template #menu-items>
										<MenuItem @click="openItem(item.uuid)">
											<template #icon><i class="fas fa-edit" /></template>
											Edit Item
										</MenuItem>

										<MenuItem @click="deleteItem(item.uuid)">
											<template #icon><i class="fas fa-trash" /></template>
											Delete Item
										</MenuItem>
									</template>

									<a @click="openItem(item.uuid)">{{ item.name }}</a>
								</ContextMenu>
								<em v-if="gear.length === 0">Drag & drop items to add Gear</em>
							</span>

							<span class="font-orbitron text-lg font-bold uppercase">Special Abilities</span>
							<ul v-if="abilities.length > 0" class="-mt-1 list-disc">
								<li v-for="ability in abilities" :key="ability.uuid" class="mb-2 last:mb-0">
									<span class="flex flex-wrap items-center font-roboto-flex gap-x-1">
										<ContextMenu orientation="left">
											<template #menu-items>
												<MenuItem @click="openItem(ability.uuid)">
													<template #icon><i class="fas fa-edit" /></template>
													Edit Item
												</MenuItem>

												<MenuItem @click="deleteItem(ability.uuid)">
													<template #icon><i class="fas fa-trash" /></template>
													Delete Item
												</MenuItem>
											</template>

											<a class="font-semibold" @click="openItem(ability.uuid)">{{ ability.name }}:</a>
										</ContextMenu>
										<Enriched :value="ability.system.description" />
									</span>
								</li>
							</ul>
							<em class="pl-2" v-else>Drag & drop Special Ability items to add Abilities</em>
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
	</InfinitySheet>
</template>
