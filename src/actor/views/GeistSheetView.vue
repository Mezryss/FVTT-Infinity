<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import Enriched from '@/components/Enriched.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import Attribute from '@/data/Attributes';
import Skill from '@/data/Skill';
import { GeistSheetContext } from '../sheets/GeistSheet';

const context = inject<GeistSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const newSkillSelect = ref(Skill.Acrobatics);
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<div class="flex items-center gap-2">
			<img :src="img" data-edit="img" class="aspect-square w-12 h-12" />
			<input type="text" name="name" :value="name" placeholder="Item Name" />
		</div>

		<hr class="w-full" />

		<em>In the future, Geists should be linked to another Character. This linked character will determine their Firewall value</em>

		<h3>Attributes</h3>
		<div class="grid grid-cols-7 gap-x-2 gap-y-1">
			<span v-for="attribute in Attribute.all" :key="attribute" class="text-base w-full text-center">
				<Localized :label="`Infinity.Attributes.Abbreviations.${attribute}`" />
			</span>

			<input v-for="attribute in Attribute.all" :key="attribute" type="number" class="text-base w-full text-center" :value="system.attributes[attribute].value" :min="0" :name="`system.attributes.${attribute}.value`" />
		</div>

		<h3>Stress</h3>
		<div class="grid grid-cols-3 whitespace-nowrap">
			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-center">
				<strong>Firewall</strong>
				<div class="grid grid-cols-2">
					<input type="number" :min="0" :value="system.stress.firewall.value" name="system.stress.firewall.value" class="w-10 text-center" />
					<input type="number" :min="0" :value="system.stress.firewall.max" class="w-10 text-center" disabled />
				</div>
			</div>

			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-center">
				<strong>Resolve</strong>
				<div class="grid grid-cols-2">
					<input type="number" :min="0" :value="system.stress.resolve.value" name="system.stress.resolve.value" class="w-10 text-center" />
					<input type="number" :min="0" :value="system.stress.resolve.max" class="w-10 text-center" disabled />
				</div>
			</div>

			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-center">
				<strong>Structure</strong>
				<div class="grid grid-cols-2">
					<input type="number" :min="0" :value="system.stress.vigour.value" name="system.stress.vigour.value" class="w-10 text-center" />
					<input type="number" :min="0" :value="system.stress.vigour.max" class="w-10 text-center" disabled />
				</div>
			</div>
		</div>

		<h3>Defences</h3>
		<div class="grid grid-cols-3 whitespace-nowrap">
			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-center">
				<strong>Security</strong>
				<input type="number" :min="0" :value="system.defences.security" name="system.defences.security" class="w-10 text-center" />
			</div>

			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-center">
				<strong>Morale</strong>
				<input type="number" :min="0" :value="system.defences.morale" name="system.defences.morale" class="w-10 text-center" />
			</div>

			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-center">
				<strong>Armour</strong>
				<input type="number" :min="0" :value="system.defences.armour" name="system.defences.armour" class="w-10 text-center" />
			</div>
		</div>

		<h3>Harms</h3>
		<div class="grid grid-cols-3 whitespace-nowrap gap-3">
			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-start w-full">
				<div class="flex flex-nowrap items-center w-full">
					<strong class="w-full">Breaches ({{ system.harms.breaches.value }}/{{ system.harms.breaches.max }})</strong>
					<a @click="actions.addHarm('breaches')" class="text-xl">&plus;</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1" v-for="(breach, index) in system.harms.breaches.effects" :key="index">
					<input type="text" class="flex flex-nowrap items-center w-full" :value="breach" :name="`system.harms.breaches.effects.${index}`" />
					<a class="text-xl" @click="actions.removeHarm('breaches', index)">&times;</a>
				</div>
			</div>

			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-start w-full">
				<div class="flex flex-nowrap items-center w-full">
					<strong class="w-full">Metanoia ({{ system.harms.metanoia.value }}/{{ system.harms.metanoia.max }})</strong>
					<a @click="actions.addHarm('metanoia')" class="text-xl">&plus;</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1" v-for="(metanoia, index) in system.harms.metanoia.effects" :key="index">
					<input type="text" class="flex flex-nowrap items-center w-full" :value="metanoia" :name="`system.harms.metanoia.effects.${index}`" />
					<a class="text-xl" @click="actions.removeHarm('metanoia', index)">&times;</a>
				</div>
			</div>

			<div class="flex flex-nowrap flex-col items-center gap-1 justify-self-start w-full">
				<div class="flex flex-nowrap items-center w-full">
					<strong class="w-full">Faults ({{ system.harms.wounds.value }}/{{ system.harms.wounds.max }})</strong>
					<a @click="actions.addHarm('wounds')" class="text-xl">&plus;</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1" v-for="(wound, index) in system.harms.wounds.effects" :key="index">
					<input type="text" class="flex flex-nowrap items-center w-full" :value="wound" :name="`system.harms.wounds.effects.${index}`" />
					<a class="text-xl" @click="actions.removeHarm('wounds', index)">&times;</a>
				</div>
			</div>
		</div>

		<h3 class="flex flex-nowrap gap-1">
			<span class="w-full">Skills</span>
			<select v-model="newSkillSelect" class="text-xs">
				<option v-for="skill in Skill.all" :key="skill" :value="skill">
					<Localized :label="`Infinity.Skill.${skill}`" />
				</option>
			</select>
			<a @click="actions.addSkill(newSkillSelect)">&plus;</a>
		</h3>
		<div class="flex flex-col flex-nowrap gap-1 whitespace-nowrap">
			<div v-for="(skill, index) in system.skills" :key="skill.skill" class="flex flex-nowrap gap-1 bg-slate-400 bg-opacity-50 rounded-sm p-1 items-center">
				<span class="w-full">
					<Localized :label="`Infinity.Skill.${skill.skill}`" />
				</span>
				<input type="hidden" :name="`system.skills.${index}.skill`" :value="skill.skill" />
				<input type="number" :min="0" class="w-14 text-center" :value="skill.expertise" :name="`system.skills.${index}.expertise`" />
				<input type="number" :min="0" class="w-14 text-center" :value="skill.focus" :name="`system.skills.${index}.focus`" />
				<a @click="actions.removeSkill(skill.skill)" class="text-xl -my-2">&times;</a>
			</div>
		</div>

		<h3 class="flex flex-nowrap">
			<span class="w-full">Traits</span>
			<a @click="actions.addTrait">&plus;</a>
		</h3>
		<div class="flex flex-col flex-nowrap gap-1">
			<div v-for="(trait, index) in system.traits" :key="index" class="flex flex-nowrap gap-1 items-center">
				<input :value="trait" :name="`system.traits.${index}`" type="text" class="w-full" />
				<a @click="actions.removeTrait(index)" class="text-xl -my-1">&times;</a>
			</div>
		</div>

		<h3>Talents</h3>
		<div class="flex flex-col flex-nowrap gap-1">
			<div v-for="talent in context.talents" :key="talent.uuid" class="flex items-center gap-1">
				<a @click="actions.removeItem(talent.uuid)" class="text-lg -my-2">&times;</a><strong class="float-left">{{ talent.name }}:</strong> <Enriched :value="talent.system.description" />
			</div>
		</div>

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
