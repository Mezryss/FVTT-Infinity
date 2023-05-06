<script lang="ts" setup>
import { computed, inject } from 'vue';

import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import Enriched from '@/components/Enriched.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import Skill from '@/data/Skill';

import { TalentPrerequisite } from '../data/TalentDataModel';
import { TalentSheetContext } from '../sheets/TalentSheet';

const context = inject<TalentSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

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
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<div class="flex items-center gap-2">
			<img :src="img" data-edit="img" class="aspect-square w-12 h-12" />
			<input type="text" name="name" :value="name" placeholder="Item Name" />
		</div>

		<hr class="w-full" />

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
					<input type="number" :value="system.rank.current" name="system.rank.current" placeholder="Current Rank" />
					<input type="number" :value="system.rank.max" name="system.rank.max" placeholder="Max Rank" />
				</div>
			</template>
		</div>

		<div class="flex items-center gap-2">
			<strong>Source:</strong>
			<input type="text" name="system.source" :value="system.source" />
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

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
