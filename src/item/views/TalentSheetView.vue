<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import Enriched from '@/components/Enriched.vue';
import Field from '@/components/Field.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import SidebarLabel from '@/components/SidebarLabel.vue';
import Skill from '@/data/Skill';
import { useItemStore } from '@/stores/itemStore';

import InfinityItem from '../InfinityItem';
import TalentDataModel, { TalentPrerequisite } from '../data/TalentDataModel';

const itemStore = useItemStore<TalentDataModel>();
const { name, img, system: storeSystem, isOwned } = storeToRefs(itemStore);
const system = computed(() => storeSystem.value!);

/**
 * All of the non-talent (Skill Expertise, Skill Focus, and Misc.) prerequisites for display first.
 */
const nonTalentPreReqs = computed(() => system.value.prerequisites.filter((p) => p.type !== TalentPrerequisite.Type.Talent));

/**
 * Fetches the full tree of talent prerequisites required to take this talent.
 */
const talentPreReqs = computed(() => {
	const talents = system.value.prerequisites.filter((p) => p.type === TalentPrerequisite.Type.Talent);

	return recurseTalentPrerequisites(talents.map((t) => t.value as string));
});

/**
 * Recursively fetches a full tree of UUIDs for talent prerequisites.
 */
function recurseTalentPrerequisites(uuids: string[]): string[] {
	return uuids.flatMap((uuid) => {
		const itemUuid = /^@UUID\[(?<uuid>.*)\]{.*}$/i.exec(uuid)?.groups?.uuid;
		if (!itemUuid) {
			return [uuid];
		}

		const item = fromUuidSync(itemUuid) as InfinityItem<TalentDataModel>;
		if (!item || !(item instanceof InfinityItem) || item.type !== 'talent') {
			return [uuid];
		}

		const itemTalents = item.system.prerequisites.filter((p) => p.type === TalentPrerequisite.Type.Talent).map((t) => t.value as string);

		return [uuid, ...recurseTalentPrerequisites(itemTalents)];
	});
}

/**
 * Updates the value of the prerequisite at a given index.
 *
 * @param index Index for the prerequisite to update.
 * @param value New value for the prereq.
 */
async function updatePrerequisite(index: number, newValue: Partial<TalentPrerequisite>) {
	const prereqCopy = [...system.value.prerequisites];

	prereqCopy[index] = {
		...prereqCopy[index],
		...newValue,
	};

	await itemStore.update({
		'system.prerequisites': prereqCopy,
	});
}

async function addPrerequisite() {
	await itemStore.update({
		'system.prerequisites': [
			...system.value.prerequisites,
			{
				type: TalentPrerequisite.Type.SkillExpertise,
				value: 1,
			} as TalentPrerequisite,
		],
	});
}

async function removePrerequisite(index: number) {
	const prereqCopy = [...system.value.prerequisites];

	prereqCopy.splice(index, 1);

	await itemStore.update({
		'system.prerequisites': prereqCopy,
	});
}
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<SidebarLabel label="TYPES.Item.talent" />

			<span class="flex gap-1">
				<strong>Skill:</strong>
				<Localized :label="`Infinity.Skill.${system.skill}`" />
			</span>

			<span v-if="system.isRanked" class="flex gap-1">
				<template v-if="isOwned">
					<strong>Rank:</strong>
					<span>{{ system.rank.current }}/{{ system.rank.max }}</span>
				</template>
				<template v-else>
					<strong>Max Ranks:</strong>
					<span>{{ system.rank.max }}</span>
				</template>
			</span>

			<template v-if="system.prerequisites.length > 0">
				<strong>Prerequisites:</strong>
				<span v-for="(prereq, index) in nonTalentPreReqs" :key="index" class="pl-2 after:inline after:content-[','] last-of-type:after:content-none">
					<template v-if="[TalentPrerequisite.Type.SkillExpertise, TalentPrerequisite.Type.SkillFocus].includes(prereq.type)">
						<Localized :label="`Infinity.Skill.${system.skill}`" /> {{ prereq.type === TalentPrerequisite.Type.SkillExpertise ? 'Expertise' : 'Focus' }} {{ prereq.value }}
					</template>
					<template v-else>{{ prereq.value }}</template>
				</span>

				<span v-for="talent in talentPreReqs" :key="talent" class="pl-2">
					<Enriched :value="talent" />
				</span>
			</template>
		</template>

		<div class="flex flex-col flex-nowrap gap-2 whitespace-nowrap">
			<div class="flex items-center gap-2">
				<strong>Skill:</strong>
				<select :value="system.skill" name="system.skill" class="w-full px-2">
					<option v-for="skill in Skill.all" :key="skill" :value="skill">
						<Localized :label="`Infinity.Skill.${skill}`" />
					</option>
				</select>
			</div>

			<div class="flex items-center gap-1">
				<strong>Ranked:</strong>
				<input type="checkbox" :checked="system.isRanked" name="system.isRanked" />

				<template v-if="system.isRanked">
					<strong v-if="isOwned">Rank:</strong>
					<strong v-else>Max Rank:</strong>
					<div class="w-full grid grid-cols-2 gap-1">
						<Field v-if="isOwned" type="number" :value="system.rank.current" name="system.rank.current" placeholder="Current Rank" />
						<Field
							:class="{
								'col-span-2': !isOwned,
							}"
							type="number"
							:value="system.rank.max"
							name="system.rank.max"
							placeholder="Max Rank"
						/>
					</div>
				</template>
			</div>

			<div class="flex flex-col items-start gap-2">
				<div class="flex gap-2 w-full items-center border-0 border-sky-400 border-opacity-50 border-solid border-b-[1px]">
					<span class="w-full font-orbitron font-semibold">Prerequisites</span>
					<a class="text-sm" @click="addPrerequisite"><i class="fas fa-plus" /></a>
				</div>

				<div v-for="(prereq, index) in system.prerequisites" :key="index" class="flex gap-2 w-full items-center">
					<select @change="updatePrerequisite(index, { type: ($event.target as HTMLSelectElement).value as TalentPrerequisite.Type })" :value="prereq.type" :disabled="prereq.type === TalentPrerequisite.Type.Talent" class="px-2">
						<option :value="TalentPrerequisite.Type.SkillExpertise"><Localized :label="`Infinity.Skill.${system.skill}`" /> Expertise</option>
						<option :value="TalentPrerequisite.Type.SkillFocus"><Localized :label="`Infinity.Skill.${system.skill}`" /> Focus</option>
						<option :value="TalentPrerequisite.Type.Other">Other</option>
						<option :value="TalentPrerequisite.Type.Talent" class="hidden" disabled>Talent</option>
					</select>

					<!-- Another Talent -->
					<Enriched v-if="prereq.type === TalentPrerequisite.Type.Talent" class="w-full text-center" :value="prereq.value.toString()" />

					<!-- Skill Value -->
					<Field v-else-if="TalentPrerequisite.Type.numeric.includes(prereq.type)" class="w-full" type="number" :value="+prereq.value" :min="0" @change="updatePrerequisite(index, { value: +$event })" />

					<!-- Catch-All -->
					<Field v-else class="w-full" type="text" :value="prereq.value" @change="updatePrerequisite(index, { value: $event })" />

					<a class="text-sm" @click="removePrerequisite(index)"><i class="fas fa-trash" /></a>
				</div>
			</div>
		</div>
	</ItemSheet>
</template>
