<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Editor from '@/components/Editor.vue';
import Enriched from '@/components/Enriched.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import Attribute from '@/data/Attributes';
import { WeaponType } from '@/item/data/WeaponDataModel';
import { AdversaryType } from '../data/AdversaryDataModel';
import { AdversarySheetContext } from '../sheets/AdversarySheet';

const context = inject<AdversarySheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const attacks = computed(() => context.attacks);
const abilities = computed(() => context.abilities);

const isRemote = computed(() => context.actorType === 'remote');
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<div class="flex items-center gap-2">
			<img :src="img" data-edit="img" class="aspect-square w-12 h-12" />
			<input type="text" name="name" :value="name" placeholder="Item Name" />
		</div>

		<hr class="w-full" />

		<select class="w-full" :value="system.type" name="system.type">
			<option v-for="adversaryType in AdversaryType.all" :key="adversaryType" :value="adversaryType">
				<Localized :label="`Infinity.Actors.Adversary.Category.${adversaryType}`" />
			</option>
		</select>

		<h3>Attributes</h3>
		<div class="grid grid-cols-7 gap-x-2 gap-y-1">
			<span v-for="attribute in Attribute.all" :key="attribute" class="text-base w-full text-center">
				<Localized :label="`Infinity.Attributes.Abbreviations.${attribute}`" />
			</span>

			<input v-for="attribute in Attribute.all" :key="attribute" type="number" class="text-base w-full text-center" :value="system.attributes[attribute]" :min="0" :name="`system.attributes.${attribute}`" />
		</div>

		<h3>Fields of Expertise</h3>
		<div class="grid grid-cols-3 whitespace-nowrap">
			<div class="flex flex-nowrap items-center gap-1 justify-self-center">
				<strong>Combat</strong>
				<input type="number" :min="0" :value="system.fieldsOfExpertise.combat.expertise" name="system.fieldsOfExpertise.combat.expertise" class="w-10" />
				<input type="number" :min="0" :value="system.fieldsOfExpertise.combat.focus" name="system.fieldsOfExpertise.combat.focus" class="w-10" />
			</div>

			<div class="flex flex-nowrap items-center gap-1 justify-self-center">
				<strong>Movement</strong>
				<input type="number" :min="0" :value="system.fieldsOfExpertise.movement.expertise" name="system.fieldsOfExpertise.movement.expertise" class="w-10" />
				<input type="number" :min="0" :value="system.fieldsOfExpertise.movement.focus" name="system.fieldsOfExpertise.movement.focus" class="w-10" />
			</div>

			<div class="flex flex-nowrap items-center gap-1 justify-self-center">
				<strong>Social</strong>
				<input type="number" :min="0" :value="system.fieldsOfExpertise.social.expertise" name="system.fieldsOfExpertise.social.expertise" class="w-10" />
				<input type="number" :min="0" :value="system.fieldsOfExpertise.social.focus" name="system.fieldsOfExpertise.social.focus" class="w-10" />
			</div>

			<div class="flex flex-nowrap items-center gap-1 justify-self-center">
				<strong>Fortitude</strong>
				<input type="number" :min="0" :value="system.fieldsOfExpertise.fortitude.expertise" name="system.fieldsOfExpertise.fortitude.expertise" class="w-10" />
				<input type="number" :min="0" :value="system.fieldsOfExpertise.fortitude.focus" name="system.fieldsOfExpertise.fortitude.focus" class="w-10" />
			</div>

			<div class="flex flex-nowrap items-center gap-1 justify-self-center">
				<strong>Senses</strong>
				<input type="number" :min="0" :value="system.fieldsOfExpertise.senses.expertise" name="system.fieldsOfExpertise.senses.expertise" class="w-10" />
				<input type="number" :min="0" :value="system.fieldsOfExpertise.senses.focus" name="system.fieldsOfExpertise.senses.focus" class="w-10" />
			</div>

			<div class="flex flex-nowrap items-center gap-1 justify-self-center">
				<strong>Technical</strong>
				<input type="number" :min="0" :value="system.fieldsOfExpertise.technical.expertise" name="system.fieldsOfExpertise.technical.expertise" class="w-10" />
				<input type="number" :min="0" :value="system.fieldsOfExpertise.technical.focus" name="system.fieldsOfExpertise.technical.focus" class="w-10" />
			</div>
		</div>

		<div v-if="system.type === AdversaryType.Nemesis" class="flex flex-nowrap whitespace-nowrap gap-2">
			<strong>Infinity Points</strong>
			<input type="number" :min="0" :value="system.infinityPoints" name="system.infinityPoints" />
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
				<strong>{{ isRemote ? 'Vigour' : 'Structure' }}</strong>
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
					<strong class="w-full">{{ isRemote ? 'Wounds' : 'Faults' }} ({{ system.harms.wounds.value }}/{{ system.harms.wounds.max }})</strong>
					<a @click="actions.addHarm('wounds')" class="text-xl">&plus;</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1" v-for="(wound, index) in system.harms.wounds.effects" :key="index">
					<input type="text" class="flex flex-nowrap items-center w-full" :value="wound" :name="`system.harms.wounds.effects.${index}`" />
					<a class="text-xl" @click="actions.removeHarm('wounds', index)">&times;</a>
				</div>
			</div>
		</div>

		<h3>Attacks</h3>
		<ul>
			<li v-for="attack in attacks" :key="attack.uuid" class="flex flex-row flex-wrap items-center gap-1">
				<a class="-my-4 text-xl" @click="actions.removeAttack(attack.uuid)">&times;</a>
				<strong>{{ attack.name }}:</strong>
				<span v-if="attack.system.type === WeaponType.Ranged">Range {{ attack.system.range }},</span>
				<span>{{ attack.system.damage }} damage,</span>
				<span v-if="attack.system.type === WeaponType.Ranged">Burst {{ attack.system.burst }},</span>
				<span>{{ attack.system.size }},</span>
				<span v-for="quality in attack.system.qualities" :key="quality.uuid" class="after:content-[','] last:after:content-['']">{{ quality.name }}</span>
			</li>
		</ul>

		<h3>Special Abilities</h3>
		<ul>
			<li v-for="ability in abilities" :key="ability.uuid" class="flex flex-row flex-wrap items-center gap-1">
				<a class="-my-4 text-xl" @click="actions.removeAbility(ability.uuid)">&times;</a>
				<strong>{{ ability.name }}:</strong>
				<Enriched :value="ability.system.description" />
			</li>
		</ul>

		<hr class="w-full" />

		<div class="flex flex-col items-start gap-2 min-h-[10em] h-full">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="system.description" button />
		</div>
	</InfinitySheet>
</template>
