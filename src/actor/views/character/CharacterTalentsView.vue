<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, toRaw } from 'vue';

import CharacterDataModel from '@/actor/data/CharacterDataModel';
import ContextMenu from '@/components/ContextMenu.vue';
import Enriched from '@/components/Enriched.vue';
import Localized from '@/components/Localized.vue';
import MenuItem from '@/components/MenuItem.vue';
import Skill from '@/data/Skill';
import InfinityItem from '@/item/InfinityItem';
import TalentDataModel from '@/item/data/TalentDataModel';
import { useActorStore } from '@/stores/actorStore';

const actorStore = useActorStore<CharacterDataModel>();
const { items } = storeToRefs(actorStore);

const allTalents = computed(() => items.value.filter(i => i.type === 'talent') as InfinityItem<TalentDataModel>[]);
const skillsWithTalents = computed(() => new Set(allTalents.value.map(t => t.system.skill).sort()));
const talentsBySkill = computed(() => {
	const talentContainer = {} as Record<Skill, InfinityItem<TalentDataModel>[]>;

	skillsWithTalents.value.forEach(skill => {
		talentContainer[skill] = allTalents.value.filter(t => t.system.skill === skill)
	});

	return talentContainer;
});

function localizeSkillName(skill: string) {
	return game.i18n.localize(`Infinity.Skill.${ skill }`);
}

async function openItem(item: InfinityItem) {
	await toRaw(item).sheet?.render(true);
}

async function deleteItem(item: InfinityItem) {
	await toRaw(item).delete();
}

async function sendTalentToChat(talent: InfinityItem<TalentDataModel>) {
	const chatTemplate = await renderTemplate('systems/infinity/templates/chat/talent.hbs', { name: talent.name, img: talent.img, system: talent.system });

	await ChatMessage.create({
		user: game.userId,
		speaker: {
			actor: game.user.character?.id,
		},
		content: chatTemplate,
		type: CONST.CHAT_MESSAGE_TYPES.OOC,
	});
}
</script>

<template>
	<div class="flex flex-col gap-2">
		<span v-if="allTalents.length === 0" class="p-1 oblique">
			<Localized label="Infinity.Actors.Character.NoTalents" />
		</span>

		<div
			v-for="(talents, skill) in talentsBySkill"
			:key="skill"
			class="flex flex-col"
		>
			<div class="flex items-center whitespace-nowrap bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
				<span>
					<Localized label="Infinity.Actors.Character.TalentsSkillLabel" :format-args="{ 'skill': localizeSkillName(skill) }" />
				</span>
				<span class="w-full" />
				<span class="text-xs">
					<Localized label="Infinity.Actors.Character.TalentCount" :format-args="{
						talents: talents.length,
						ranks: talents.reduce((total, talent) => (talent.system.isRanked ? total + talent.system.rank.current : total + 1), 0)
					}"
					/>
				</span>
			</div>

			<div class="flex flex-col border-[1px] border-t-0 border-solid border-sky-300">
				<div
					v-for="talent in talents"
					:key="talent.id"
					class="flex-col items-start gap-1 p-1"
				>
					<span class="font-orbitron flex items-center gap-4">
						<ContextMenu orientation="left">
							<template #menu-items>
								<MenuItem @click="sendTalentToChat(talent)">
									<template #icon><i class="fas fa-message" /></template>
									Send To Chat
								</MenuItem>

								<MenuItem @click="openItem(talent)">
									<template #icon><i class="fas fa-edit" /></template>
									Edit Talent
								</MenuItem>

								<MenuItem @click="deleteItem(talent)">
									<template #icon><i class="fas fa-trash" /></template>
									Delete Talent
								</MenuItem>
							</template>

							<a @click="openItem(talent)" class="font-semibold">{{ talent.name }}</a>
						</ContextMenu>
						<template v-if="talent.system.isRanked">
							<span class="text-sky-700 text-sm">
								<Localized label="Infinity.Actors.Character.TalentRank" :format-args="talent.system.rank" />
							</span>
						</template>
					</span>

					<Enriched v-if="talent.system.description" :value="talent.system.description" class="border-0 border-t-1 border-sky-300 border-solid" />
				</div>
			</div>
		</div>
	</div>
</template>
