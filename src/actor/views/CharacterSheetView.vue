<script lang="ts" setup>
import { computed, inject } from 'vue';
import { RootContext } from '@/VueSheet';
import Enriched from '@/components/Enriched.vue';
import InfinitySheet from '@/components/InfinitySheet.vue';
import Localized from '@/components/Localized.vue';
import Attribute from '@/data/Attributes';
import Skill from '@/data/Skill';
import { CharacterSheetContext } from '../sheets/CharacterSheet';

const context = inject<CharacterSheetContext>(RootContext)!;

const actions = computed(() => context.actions);
const name = computed(() => context.name);
const img = computed(() => context.img);
const system = computed(() => context.system);

const abilities = computed(() => context.abilities);
const inventory = computed(() => context.inventory);
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<img :src="img" data-edit="img" class="w-12 h-12 mx-auto" />

		<div class="grid grid-cols-4 items-center">
			<strong class="w-full text-center">Name</strong>
			<input type="text" name="name" :value="name" class="col-span-3" />

			<strong class="w-full text-center">Faction</strong>
			<input type="text" name="system.meta.faction" :value="system.meta.faction" />

			<strong class="w-full text-center">Heritage</strong>
			<input type="text" name="system.meta.heritage" :value="system.meta.heritage" />

			<strong class="w-full text-center">Homeworld</strong>
			<input type="text" name="system.meta.homeworld" :value="system.meta.homeworld" />

			<strong class="w-full text-center">Social Status</strong>
			<input type="text" name="system.meta.socialStatus" :value="system.meta.socialStatus" />
		</div>

		<hr class="w-full" />

		<div class="grid grid-cols-2 gap-2">
			<div class="flex flex-col">
				<strong class="text-center w-full">Infinity Points</strong>
				<input type="number" name="system.infinityPoints.value" :value="system.infinityPoints.value" class="text-center" />
			</div>

			<div class="flex flex-col">
				<strong class="text-center w-full">Refresh</strong>
				<input type="number" name="system.infinityPoints.refresh" :value="system.infinityPoints.refresh" class="text-center" />
			</div>
		</div>

		<div class="grid grid-cols-3 gap-2">
			<div class="flex flex-col col-span-2">
				<strong class="text-center w-full">Damage Bonus</strong>
				<div class="grid grid-cols-4 gap-1 justify-items-center">
					<strong>Infowar</strong>
					<strong>Psywar</strong>
					<strong>Melee</strong>
					<strong>Ranged</strong>

					<span>TODO</span>
					<span>TODO</span>
					<span>TODO</span>
					<span>TODO</span>
				</div>
			</div>

			<div class="flex flex-col">
				<strong class="text-center w-full">XP</strong>

				<div class="grid grid-cols-2 gap-1 justify-items-center">
					<strong>Total</strong>
					<strong>Spent</strong>

					<input type="number" :min="0" :value="system.xp.total" name="system.xp.total" class="text-center" />
					<input type="number" :min="0" :value="system.xp.spent" name="system.xp.spent" class="text-center" />
				</div>
			</div>
		</div>

		<hr class="w-full" />

		<h3>Damage</h3>
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
				<strong>Vigour</strong>
				<div class="grid grid-cols-2">
					<input type="number" :min="0" :value="system.stress.vigour.value" name="system.stress.vigour.value" class="w-10 text-center" />
					<input type="number" :min="0" :value="system.stress.vigour.max" class="w-10 text-center" disabled />
				</div>
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
					<strong class="w-full">Wounds ({{ system.harms.wounds.value }}/{{ system.harms.wounds.max }})</strong>
					<a @click="actions.addHarm('wounds')" class="text-xl">&plus;</a>
				</div>

				<div class="flex flex-nowrap items-center w-full gap-1" v-for="(wound, index) in system.harms.wounds.effects" :key="index">
					<input type="text" class="flex flex-nowrap items-center w-full" :value="wound" :name="`system.harms.wounds.effects.${index}`" />
					<a class="text-xl" @click="actions.removeHarm('wounds', index)">&times;</a>
				</div>
			</div>
		</div>

		<h3>Defences</h3>
		<div class="grid grid-cols-3 gap-x-2">
			<strong class="w-full text-center">Security</strong>
			<strong class="w-full text-center">Morale</strong>
			<strong class="w-full text-center">BTS</strong>

			<input type="number" :min="0" :value="system.defences.security" name="system.defences.security" class="text-center" />
			<input type="number" :min="0" :value="system.defences.morale" name="system.defences.morale" class="text-center" />
			<input type="number" :min="0" :value="system.defences.bts" name="system.defences.bts" class="text-center" />
		</div>

		<h4>Armour</h4>
		<div class="flex flex-col gap-1">
			<span>
				<strong>Head (1-2):</strong>
				<span>TODO</span>
			</span>

			<span>
				<strong>Right Arm (3-5):</strong>
				<span>TODO</span>
			</span>

			<span>
				<strong>Left Arm (6-8):</strong>
				<span>TODO</span>
			</span>

			<span>
				<strong>Torso (9-14):</strong>
				<span>TODO</span>
			</span>

			<span>
				<strong>Right Leg (15-17):</strong>
				<span>TODO</span>
			</span>

			<span>
				<strong>Left Leg (18-20):</strong>
				<span>TODO</span>
			</span>

			<span>
				<strong>Equipped:</strong>
				<span>(Equipped Armour)</span>
				<span>(Qualities)</span>
			</span>
		</div>

		<h3>Attributes & Skills</h3>
		<div class="grid grid-cols-7 whitespace-nowrap justify-items-center mx-4 mb-4" v-for="attribute in Attribute.all" :key="attribute">
			<span class="col-span-6 justify-self-start text-lg">
				<Localized :label="`Infinity.Attributes.${attribute}`" />
			</span>
			<input type="number" class="w-20 text-center text-lg" :value="system.attributes[attribute].value" :name="`system.attributes.${attribute}.value`" />

			<strong class="col-span-2 justify-self-start">Skill</strong>
			<strong class="col-span-2">Signature</strong>
			<strong>EXP</strong>
			<strong>FOC</strong>
			<strong>TN</strong>

			<template v-for="skill in Skill.BY_ATTRIBUTE[attribute]" :key="skill">
				<strong class="col-span-2 justify-self-start">
					<Localized :label="`Infinity.Skill.${skill}`" />
				</strong>
				<input class="col-span-2" type="checkbox" :checked="system.skills[skill].signature" :name="`system.skills.${skill}.signature`" />

				<input type="number" :value="system.skills[skill].expertise" :name="`system.skills.${skill}.expertise`" class="text-center" />
				<input type="number" :value="system.skills[skill].focus" :name="`system.skills.${skill}.focus`" class="text-center" />
				<input type="number" :value="system.attributes[attribute].value + system.skills[skill].expertise" class="text-center" readonly />
			</template>
		</div>

		<hr class="w-full" />

		<h3>Traits <a @click="actions.addTrait()">&plus;</a></h3>
		<div class="flex flex-col flex-nowrap gap-1">
			<div class="flex flex-nowrap gap-1 items-center" v-for="(trait, index) in system.traits" :key="index">
				<input type="text" :value="trait" :name="`system.traits.${index}`" />
				<a class="text-lg -my-2" @click="actions.removeTrait(index)">&times;</a>
			</div>
		</div>

		<h3>Faction Handler</h3>
		<div class="grid grid-cols-6 items-center">
			<strong>Identity</strong>
			<input type="text" :value="system.factionHandler.identity" name="system.factionHandler.identity" class="col-span-5" />

			<strong>Faction</strong>
			<input type="text" :value="system.factionHandler.faction" name="system.factionHandler.faction" class="col-span-5" />

			<strong>Contact Protocol</strong>
			<input type="text" :value="system.factionHandler.contactProtocol" name="system.factionHandler.contactProtocol" class="col-span-5" />

			<strong class="col-span-6 text-center">Covert Objective</strong>
			<textarea class="col-span-6" :value="system.factionHandler.covertObjective" name="system.factionHandler.covertObjective"></textarea>
		</div>

		<h3>Talents &amp; Abilities</h3>
		<ul>
			<li v-for="ability in abilities" :key="ability.uuid" class="flex flex-row flex-wrap items-center gap-1">
				<a class="-my-4 text-xl" @click="actions.removeItem(ability.uuid)">&times;</a>
				<strong>{{ ability.name }}:</strong>
				<Enriched :value="ability.system.description" />
			</li>
		</ul>

		<h3>Host</h3>
		<em>TODO: Implement Active Host selection</em>

		<h3>Inventory</h3>
		<div class="flex flex-wrap gap-1">
			<div v-for="item in inventory" :key="item.uuid">{{ item.name }} <a @click="actions.removeItem(item.uuid)" class="text-lg -my-2">&times;</a></div>
		</div>

		<hr class="w-full" />

		<h3>Background</h3>
		<div class="grid grid-cols-7">
			<strong>Age</strong>
			<input type="text" :value="system.background.age" name="system.background.age" class="col-span-6 text-center" />

			<strong>Gender</strong>
			<input type="text" :value="system.background.gender" name="system.background.gender" class="col-span-6 text-center" />
		</div>

		<h3>Lifepath</h3>

		<h3>Lifestyles</h3>

		<h3>Fake IDs</h3>

		<h3>Contacts</h3>
	</InfinitySheet>
</template>
