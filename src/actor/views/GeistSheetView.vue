<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, toRaw } from 'vue';

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
import Skill from '@/data/Skill';
import InfinityItem from '@/item/InfinityItem';
import TalentDataModel from '@/item/data/TalentDataModel';
import { useActorStore } from '@/stores/actorStore';

import InfinityActor from '../InfinityActor';
import CharacterDataModel from '../data/CharacterDataModel';
import GeistDataModel from '../data/GeistDataModel';

const actorStore = useActorStore<GeistDataModel>();
const { name, img, system: storeSystem, items } = storeToRefs(actorStore);
const system = computed(() => storeSystem.value!);
const talents = computed(() => items.value.filter((i) => i.type === 'talent') as InfinityItem<TalentDataModel>[]);

const owningCharacter = computed(() => {
	if (system.value.characterUuid) {
		const actor = fromUuidSync(system.value.characterUuid) as InfinityActor<CharacterDataModel>;

		return actor;
	}

	return null;
});

async function addSkill() {
	async function doAddSkill(skill: Skill) {
		const skills = system.value.skills;
		if (skills.find((s) => s.skill === skill)) {
			return;
		}

		await actorStore.update({
			'system.skills': [
				...skills,
				{
					skill,
					expertise: 0,
					focus: 0,
				},
			].sort((a, b) => a.skill.localeCompare(b.skill)),
		});
	}

	const skillDialog = new Dialog({
		title: 'Add Geist Skill',
		content: /*html*/ `
			<form class="w-full mb-1">
				<select class="w-full">
					${Skill.all.map((s) => `<option value="${s}">${game.i18n.localize(`Infinity.Skill.${s}`)}</option>`)}
				</select>
			</form>
		`,
		buttons: {
			cancel: {
				icon: '<i class="fas fa-times"></i>',
				label: 'Cancel',
			},
			confirm: {
				icon: '<i class="fas fa-plus"></i>',
				label: 'Add',
				callback: async (html: JQuery<HTMLElement>) => await doAddSkill(html.find('select').val() as Skill),
			},
		},
		default: 'confirm',
	});

	await skillDialog.render(true);
}

async function removeSkill(skill: Skill) {
	await actorStore.update({
		'system.skills': system.value.skills.filter((s) => s.skill !== skill),
	});
}

async function addTrait() {
	await actorStore.update({
		'system.traits': [...system.value.traits, 'New Trait'],
	});
}

async function removeTrait(index: number) {
	const traits = [...system.value.traits];
	traits.splice(index, 1);

	await actorStore.update({
		'system.traits': traits,
	});
}

async function removeOwner() {
	await actorStore.update({
		'system.characterUuid': '',
	});
}
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<TitleBox class="-m-0.5">
			<img :src="img" data-edit="img" class="aspect-square h-14 border-none bg-sky-300 bg-opacity-75 hover:cursor-pointer rounded-md" />
			<div class="flex flex-col gap-1 w-full font-orbitron">
				<ContextMenu orientation="left" v-if="owningCharacter">
					<template #menu-items>
						<MenuItem @click="owningCharacter.sheet?.render(true)">
							<template #icon><i class="fas fa-sheet-plastic" /></template>
							Open {{ owningCharacter.name }}'s Sheet
						</MenuItem>

						<MenuItem @click="removeOwner">
							<template #icon><i class="fas fa-trash" /></template>
							Remove {{ owningCharacter.name }} As Owner
						</MenuItem>
					</template>

					<span class="text-sm">
						<a @click="owningCharacter.sheet?.render(true)">{{ owningCharacter.name }}</a
						>'s Geist
					</span>
				</ContextMenu>
				<span v-else class="text-sm italic">Drag Player Character onto sheet to set Geist's Owner</span>
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

						<NPCBlock label="Defences">
							<div class="grid grid-cols-8 grid-rows-2 items-center gap-0.5 max-w-5xl">
								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Firewall</span>
								<Field type="number" :min="0" :value="system.stress.firewall.value" name="system.stress.firewall.value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.stress.firewall.max" name="system.stress.firewall.max" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" readonly />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Resolve</span>
								<Field type="number" :min="0" :value="system.stress.resolve.value" name="system.stress.resolve.value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" />
								<Field type="number" :min="0" :value="system.stress.resolve.max" name="system.stress.resolve.max" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" readonly />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Security</span>
								<Field type="number" :min="0" :value="system.defences.security" name="system.defences.security" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none col-span-2" />

								<span class="col-span-2 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">Morale</span>
								<Field type="number" :min="0" :value="system.defences.morale" name="system.defences.morale" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none col-span-2" />
							</div>
						</NPCBlock>

						<NPCHarms hide-wounds />

						<NPCBlock label="Skills">
							<div class="grid grid-cols-12 gap-0.5 w-full whitespace-nowrap items-center max-w-5xl">
								<template v-for="index in 2" :key="index">
									<span class="col-span-3 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1"> SKILL </span>
									<span class="h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center justify-center px-1"> EXP </span>
									<span class="h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center justify-center px-1"> FOC </span>
									<span class="h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center justify-center px-1"> TN </span>
								</template>

								<template v-for="(skill, index) in system.skills" :key="skill.skill">
									<span class="col-span-3 h-full text-center font-roboto-flex font-semibold bg-sky-200 flex items-center px-1">
										<ContextMenu orientation="left">
											<template #menu-items>
												<MenuItem @click="removeSkill(skill.skill)">
													<template #icon><i class="fas fa-trash" /></template>
													Delete <Localized :label="`Infinity.Skill.${skill.skill}`" />
												</MenuItem>
											</template>

											<a>
												<Localized :label="`Infinity.Skill.${skill.skill}`" />
											</a>
										</ContextMenu>
									</span>
									<input type="hidden" :name="`system.skills.${index}.skill`" :value="skill.skill" />
									<Field type="number" :min="0" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" :value="skill.expertise" :name="`system.skills.${index}.expertise`" />
									<Field type="number" :min="0" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" :value="skill.focus" :name="`system.skills.${index}.focus`" />
									<Field type="number" :value="skill.expertise + system.attributes[Skill.attribute(skill.skill)].value" class="bg-white rounded-none w-full h-full text-center p-0.5 m-0 border-none" readonly />
								</template>

								<div class="col-span-12 flex flex-nowrap items-center gap-1 text-sm bg-sky-200 px-1">
									<span class="w-full" />
									<a @click="addSkill"> <i class="fas fa-plus" />Add Skill</a>
								</div>
							</div>
						</NPCBlock>

						<NPCBlock label="Traits">
							<div class="bg-sky-200 w-full grid grid-cols-12 items-center px-1">
								<template v-for="(trait, index) in system.traits" :key="index">
									<span class="text-center font-bold text-lg">{{ index + 1 }}</span>
									<span class="flex flex-nowrap items-center col-span-5 gap-1">
										<Field type="text" class="w-full bg-white rounded-none border-solid border-1 border-black" :value="trait" :name="`system.traits.${index}`" />
										<a @click="removeTrait(index)"><i class="fas fa-trash" /></a>
									</span>
								</template>

								<div class="col-span-12 flex flex-nowrap items-center gap-1 text-sm bg-sky-200 px-1 pt-0.5 whitespace-nowrap">
									<span class="w-full" />
									<a @click="addTrait"><i class="fas fa-plus" /> Add Trait</a>
								</div>
							</div>
						</NPCBlock>

						<NPCBlock label="Talents">
							<div v-for="talent in talents" :key="talent.uuid" class="w-full bg-sky-200 p-1 flex flex-nowrap items-center gap-1">
								<img :src="talent.img" class="w-6 h-6" />
								<ContextMenu orientation="left">
									<template #menu-items>
										<MenuItem @click="toRaw(talent).sheet?.render(true)">
											<template #icon><i class="fas fa-edit" /></template>
											Edit {{ talent.name }}
										</MenuItem>

										<MenuItem @click="toRaw(talent).delete()">
											<template #icon><i class="fas fa-trash" /></template>
											Delete {{ talent.name }}
										</MenuItem>
									</template>

									<a class="font-bold flex items-center gap-0.5" @click="toRaw(talent).sheet?.render(true)">
										<span>{{ talent.name }}</span>
										<span v-if="talent.system.isRanked">{{ talent.system.rank.current }}</span>
										<span> (<Localized :label="`Infinity.Skill.${talent.system.skill}`" />): </span>
									</a>
								</ContextMenu>
								<Enriched :value="talent.system.description" />
							</div>
						</NPCBlock>
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
