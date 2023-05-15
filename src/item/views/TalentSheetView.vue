<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Enriched from '@/components/Enriched.vue';
import ItemSheet from '@/components/ItemSheet.vue';
import Localized from '@/components/Localized.vue';
import Skill from '@/data/Skill';
import InfinityItem from '../InfinityItem';
import TalentDataModel, { TalentPrerequisite } from '../data/TalentDataModel';
import { TalentSheetContext } from '../sheets/TalentSheet';

const context = inject<TalentSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const owned = computed(() => context.owned);

/**
 * All of the non-talent (Skill Expertise, Skill Focus, and Misc.) prerequisites for display first.
 */
const nonTalentPreReqs = computed(() => context.system.prerequisites.filter((p) => p.type !== TalentPrerequisite.Type.Talent));

/**
 * Fetches the full tree of talent prerequisites required to take this talent.
 */
const talentPreReqs = computed(() => {
	const talents = context.system.prerequisites.filter((p) => p.type === TalentPrerequisite.Type.Talent);

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
 * Updates the type of the prerequisite at a given index.
 *
 * @param index Index for the prerequisite to update.
 * @param event Raw HTML Event to fetch the new value from.
 */
async function updatePrereqType(index: number, event: Event) {
	const newType = (event.target as HTMLSelectElement).value as TalentPrerequisite.Type;

	let value = system.value.prerequisites[index].value;

	if (TalentPrerequisite.Type.numeric.includes(newType)) {
		value = +value;

		if (isNaN(value)) {
			value = 0;
		}
	}

	await actions.value.updatePrerequisite(index, {
		type: newType,
		value,
	});
}

/**
 * Updates the value of the prerequisite at a given index.
 *
 * @param index Index for the prerequisite to update.
 * @param event Raw HTML event to fetch the new value from.
 */
async function updatePrereqValue(index: number, event: Event) {
	const value = (event.target as HTMLInputElement).value as string | number;

	await actions.value.updatePrerequisite(index, {
		type: system.value.prerequisites[index].type,
		value,
	});

	return 0;
}
</script>

<template>
	<ItemSheet :name="name" :img="img" :description="system.description" :source="system.source">
		<template #sidebar>
			<div class="flex flex-col flex-nowrap w-full h-full text-sm gap-1">
				<span class="font-orbitron font-semibold w-full text-center underline underline-offset-2">Talent Summary</span>

				<span v-if="system.isRanked" class="flex gap-1">
					<strong>Max Ranks:</strong>
					<span>{{ system.rank.max }}</span>
				</span>

				<template v-if="system.prerequisites.length > 0">
					<strong>Prerequisites:</strong>
					<span v-for="(prereq, index) in nonTalentPreReqs" :key="index" class="pl-2 after:inline after:content-[','] last-of-type:after:content-none">
						<template v-if="[TalentPrerequisite.Type.SkillExpertise, TalentPrerequisite.Type.SkillFocus].includes(prereq.type)">
							<Localized :label="`Infinity.Skill.${system.skill}`" /> {{ prereq.type === TalentPrerequisite.Type.SkillExpertise ? 'Expertise' : 'Focus' }} {{ prereq.value }}
						</template>
						<template v-else>{{ prereq.value }}</template>
					</span>

					<Enriched v-for="talent in talentPreReqs" :key="talent" :value="talent" />
				</template>
			</div>
		</template>

		<div class="flex items-center gap-2">
			<strong>Skill:</strong>
			<select :value="system.skill" name="system.skill" class="w-full">
				<option v-for="skill in Skill.all" :key="skill" :value="skill">
					<Localized :label="`Infinity.Skill.${skill}`" />
				</option>
			</select>
		</div>

		<div class="flex items-center gap-2">
			<strong>Ranked:</strong>
			<input type="checkbox" :checked="system.isRanked" name="system.isRanked" />

			<template v-if="system.isRanked">
				<div class="w-full grid grid-cols-2 gap-1">
					<input v-if="owned" type="number" :value="system.rank.current" name="system.rank.current" placeholder="Current Rank" />
					<input
						:class="{
							'col-span-2': !owned,
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
			<div class="flex gap-2 w-full">
				<span class="w-full">
					<h3>Prerequisites</h3>
				</span>
				<a @click="actions.addPrerequisite">+</a>
			</div>

			<div v-for="(prereq, index) in system.prerequisites" :key="index" class="flex gap-2 w-full items-center">
				<select @change="updatePrereqType(index, $event)" :value="prereq.type" :disabled="prereq.type === TalentPrerequisite.Type.Talent">
					<option :value="TalentPrerequisite.Type.SkillExpertise"><Localized :label="`Infinity.Skill.${system.skill}`" /> Expertise</option>
					<option :value="TalentPrerequisite.Type.SkillFocus"><Localized :label="`Infinity.Skill.${system.skill}`" /> Focus</option>
					<option :value="TalentPrerequisite.Type.Other">Other</option>
					<option :value="TalentPrerequisite.Type.Talent" class="hidden" disabled>Talent</option>
				</select>

				<!-- Another Talent -->
				<Enriched v-if="prereq.type === TalentPrerequisite.Type.Talent" class="w-full" :value="prereq.value.toString()" />

				<!-- Skill Value -->
				<input v-else-if="TalentPrerequisite.Type.numeric.includes(prereq.type)" class="w-full" type="number" :value="prereq.value" :min="0" @change="updatePrereqValue(index, $event)" />

				<!-- Catch-All -->
				<input v-else class="w-full" type="text" :value="prereq.value" @change="updatePrereqValue(index, $event)" />

				<a @click="actions.removePrerequisite(index)">x</a>
			</div>
		</div>
	</ItemSheet>
</template>
