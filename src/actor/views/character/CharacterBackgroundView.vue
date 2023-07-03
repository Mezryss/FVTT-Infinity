<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, toRaw } from 'vue';

import CharacterDataModel from '@/actor/data/CharacterDataModel';
import Editor from '@/components/Editor.vue';
import Field from '@/components/Field.vue';
import LinkableTextField from '@/components/LinkableTextField.vue';
import Localized from '@/components/Localized.vue';
import { useActorStore } from '@/stores/actorStore';

const actorStore = useActorStore<CharacterDataModel>();
const { editable, system: storeSystem } = storeToRefs(actorStore);
const system = computed(() => storeSystem.value!);

async function addCareer() {
	await actorStore.update({
		'system.lifePath.careers': [...system.value.lifePath.careers, 'New Career'],
	});
}

async function removeCareer(index: number) {
	const careers = [...system.value.lifePath.careers];

	careers.splice(index, 1);

	await actorStore.update({
		'system.lifePath.careers': careers,
	});
}

async function addFaction() {
	await actorStore.update({
		'system.lifePath.previousFactions': [...system.value.lifePath.previousFactions, 'New Faction'],
	});
}

async function removeFaction(index: number) {
	const factions = [...system.value.lifePath.previousFactions];

	factions.splice(index, 1);

	await actorStore.update({
		'system.lifePath.previousFactions': factions,
	});
}

async function addFakeId() {
	await actorStore.update({
		'system.background.fakeIds': [
			...system.value.background.fakeIds,
			{
				name: 'New Fake ID',
				rating: 0,
			},
		],
	});
}
async function removeFakeId(index: number) {
	const fakeIds = [...system.value.background.fakeIds];

	fakeIds.splice(index, 1);

	await actorStore.update({
		'system.background.fakeIds': fakeIds,
	});
}

async function addContact() {
	await actorStore.update({
		'system.background.contacts': [...system.value.background.contacts, 'New Contact'],
	});
}
async function removeContact(index: number) {
	const contacts = [...system.value.background.contacts];

	contacts.splice(index, 1);

	await actorStore.update({
		'system.background.contacts': contacts,
	});
}
</script>

<template>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col">
			<div class="bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
				<Localized label="Infinity.Actors.Character.Background.Background" />
			</div>

			<div class="grid grid-cols-4 border-1 border-t-0 border-solid border-sky-300 items-baseline">
				<label class="bg-sky-200 text-blue-950 font-orbitron py-0.5 px-1 h-full font-semibold">
					<Localized label="Infinity.Actors.Character.Background.Faction" />
				</label>
				<LinkableTextField name="system.meta.faction" :value="system.meta.faction" class="bg-white" input-classes="border-none !bg-white rounded-none" />

				<label class="bg-sky-200 text-blue-950 font-orbitron py-0.5 px-1 h-full font-semibold">
					<Localized label="Infinity.Actors.Character.Background.Heritage" />
				</label>
				<LinkableTextField name="system.meta.heritage" :value="system.meta.heritage" class="bg-white" input-classes="border-none !bg-white rounded-none" />

				<div class="col-span-4 h-[1px] bg-sky-300" />

				<label class="bg-sky-200 text-blue-950 font-orbitron py-0.5 px-1 h-full font-semibold">
					<Localized label="Infinity.Actors.Character.Background.Homeworld" />
				</label>
				<LinkableTextField name="system.meta.homeworld" :value="system.meta.homeworld" class="bg-white" input-classes="border-none !bg-white rounded-none" />

				<label class="bg-sky-200 text-blue-950 font-orbitron py-0.5 px-1 h-full font-semibold">
					<Localized label="Infinity.Actors.Character.Background.SocialStatus" />
				</label>
				<LinkableTextField name="system.meta.socialStatus" :value="system.meta.socialStatus" class="bg-white" input-classes="border-none !bg-white rounded-none" />

				<div class="col-span-4 h-[1px] bg-sky-300" />

				<label class="bg-sky-200 text-blue-950 font-orbitron py-0.5 px-1 h-full font-semibold">
					<Localized label="Infinity.Actors.Character.Background.Pronouns" />
				</label>
				<Field type="text" name="system.background.gender" :value="system.background.gender" class="border-none !bg-white rounded-none" />

				<label class="bg-sky-200 text-blue-950 font-orbitron py-0.5 px-1 h-full font-semibold">
					<Localized label="Infinity.Actors.Character.Background.Age" />
				</label>
				<Field type="text" name="system.background.age" :value="system.background.age" class="border-none !bg-white rounded-none" />

				<div class="col-span-4 h-[1px] bg-sky-300" />

				<label class="bg-sky-200 text-blue-950 font-orbitron py-0.5 px-1 h-full border-0 border-l-[1px] border-solid border-sky-300 font-semibold">
					<Localized label="Infinity.Actors.Character.Background.Languages" />
				</label>

				<Field type="text" name="system.background.languages" :value="system.background.languages" class="col-span-3 border-0 border-l-[1px] border-solid border-sky-300 !bg-white rounded-none" />
			</div>
		</div>

		<div class="grid grid-cols-2 gap-1">
			<div class="flex flex-col border-[1px] border-solid border-sky-300 bg-white bg-opacity-50">
				<div class="bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
					<Localized label="Infinity.Actors.Character.FakeIDs" />
				</div>

				<div v-if="system.background.fakeIds.length > 0" class="flex flex-col items-center gap-1">
					<div v-for="(fakeId, index) in system.background.fakeIds" :key="index" class="flex gap-1 w-full items-center px-1">
						<span class="min-w-[30px] font-orbitron font-bold p-1 text-center">{{ index + 1 }}.</span>
						<LinkableTextField
							name="system.background.fakeIds"
							:value="fakeId.name"
							input-classes="rounded-none border-0 !bg-white !bg-opacity-0 border-b-[1px] border-sky-300"
							is-array
							:array-index="index"
							:array-value="[...toRaw(system.background.fakeIds)]"
							array-key="name"
						/>
						<Field type="number" :name="`system.background.fakeIds.${index}.rating`" :value="fakeId.rating" class="rounded-none border-0 !bg-white !bg-opacity-0 border-b-[1px] border-sky-300 w-20 text-center" />
						<a v-if="editable" @click="removeFakeId(index)" class="text-center min-w-[20px]">
							<i class="fas fa-trash" />
						</a>
					</div>
				</div>

				<div v-if="editable" class="w-full text-right px-1 py-0.5 font-orbitron text-sm">
					<a @click="addFakeId" class="flex items-baseline justify-end gap-1">
						<i class="fas fa-plus" />
						<Localized label="Infinity.Actors.Character.AddFakeID" />
					</a>
				</div>
			</div>

			<div class="flex flex-col border-[1px] border-solid border-sky-300 bg-white bg-opacity-50">
				<div class="bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
					<Localized label="Infinity.Actors.Character.Contacts" />
				</div>

				<div v-if="system.background.contacts.length > 0" class="flex flex-col items-center gap-1">
					<div v-for="(contact, index) in system.background.contacts" :key="index" class="flex gap-1 w-full items-center px-1">
						<span class="min-w-[30px] font-orbitron font-bold p-1 text-center">{{ index + 1 }}.</span>
						<LinkableTextField
							name="system.background.contacts"
							:value="contact"
							input-classes="rounded-none border-0 !bg-white !bg-opacity-0 border-b-[1px] border-sky-300"
							is-array
							:array-index="index"
							:array-value="[...toRaw(system.background.contacts)]"
						/>
						<a v-if="editable" @click="removeContact(index)" class="text-center min-w-[20px]">
							<i class="fas fa-trash" />
						</a>
					</div>
				</div>

				<div v-if="editable" class="w-full text-right px-1 py-0.5 font-orbitron text-sm">
					<a @click="addContact" class="flex items-baseline justify-end gap-1">
						<i class="fas fa-plus" />
						<Localized label="Infinity.Actors.Character.AddContact" />
					</a>
				</div>
			</div>
		</div>

		<div class="flex flex-col">
			<div class="bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
				<Localized label="Infinity.Actors.Character.Lifepath.Label" />
			</div>

			<div class="grid grid-cols-4 border-1 border-t-0 border-solid border-sky-300 items-baseline whitespace-nowrap">
				<label class="bg-sky-200 text-blue-950 font-semibold font-orbitron py-0.5 px-1 h-full">
					<Localized label="Infinity.Actors.Character.Lifepath.FamilySocialStatus" />
				</label>
				<Field type="text" name="system.lifePath.familySocialStatus" :value="system.lifePath.familySocialStatus" class="col-span-3 border-none !bg-white rounded-none" />

				<div class="col-span-4 h-[1px] bg-sky-300" />

				<label class="bg-sky-200 text-blue-950 font-semibold font-orbitron py-0.5 px-1 h-full">
					<Localized label="Infinity.Actors.Character.Lifepath.HomeEnvironment" />
				</label>
				<Field type="text" name="system.lifePath.homeEnvironment" :value="system.lifePath.homeEnvironment" class="col-span-3 border-none !bg-white rounded-none" />

				<div class="col-span-4 h-[1px] bg-sky-300" />

				<label class="bg-sky-200 text-blue-950 font-semibold font-orbitron py-0.5 px-1 h-full">
					<Localized label="Infinity.Actors.Character.Lifepath.YouthEvent" />
				</label>
				<Field type="text" name="system.lifePath.youthEvent" :value="system.lifePath.youthEvent" class="col-span-3 border-none !bg-white rounded-none" />

				<div class="col-span-4 h-[1px] bg-sky-300" />

				<label class="bg-sky-200 text-blue-950 font-semibold font-orbitron py-0.5 px-1 h-full">
					<Localized label="Infinity.Actors.Character.Lifepath.Education" />
				</label>
				<Field type="text" name="system.lifePath.education" :value="system.lifePath.education" class="col-span-3 border-none !bg-white rounded-none" />

				<div class="col-span-4 h-[1px] bg-sky-300" />

				<label class="bg-sky-200 text-blue-950 font-semibold font-orbitron py-0.5 px-1 h-full">
					<Localized label="Infinity.Actors.Character.Lifepath.AdolescentEvent" />
				</label>
				<Field type="text" name="system.lifePath.adolescentEvent" :value="system.lifePath.adolescentEvent" class="col-span-3 border-none !bg-white rounded-none" />
			</div>
		</div>

		<div class="grid grid-cols-2 gap-1">
			<div class="flex flex-col border-[1px] border-solid border-sky-300 bg-white bg-opacity-50">
				<div class="bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
					<Localized label="Infinity.Actors.Character.Careers" />
				</div>

				<div v-if="system.lifePath.careers.length > 0" class="flex flex-col items-center gap-1">
					<div v-for="(career, index) in system.lifePath.careers" :key="index" class="flex gap-1 w-full items-center px-1">
						<span class="min-w-[30px] font-orbitron font-bold p-1 text-center">{{ index + 1 }}.</span>
						<LinkableTextField
							name="system.lifePath.careers"
							:value="career"
							input-classes="rounded-none border-0 !bg-white !bg-opacity-0 border-b-[1px] border-sky-300"
							is-array
							:array-index="index"
							:array-value="[...toRaw(system.lifePath.careers)]"
						/>
						<a v-if="editable" @click="removeCareer(index)" class="text-center min-w-[20px]">
							<i class="fas fa-trash" />
						</a>
					</div>
				</div>

				<div v-if="editable" class="w-full text-right px-1 py-0.5 font-orbitron text-sm">
					<a @click="addCareer" class="flex items-baseline justify-end gap-1">
						<i class="fas fa-plus" />
						<Localized label="Infinity.Actors.Character.AddCareer" />
					</a>
				</div>
			</div>

			<div class="flex flex-col border-[1px] border-solid border-sky-300 bg-white bg-opacity-50">
				<div class="bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
					<Localized label="Infinity.Actors.Character.PreviousFactions" />
				</div>

				<div v-if="system.lifePath.previousFactions.length > 0" class="flex flex-col items-center gap-1">
					<div v-for="(previousFaction, index) in system.lifePath.previousFactions" :key="index" class="flex gap-1 w-full items-center px-1">
						<span class="min-w-[30px] font-orbitron font-bold p-1 text-center">{{ index + 1 }}.</span>
						<LinkableTextField
							name="system.lifePath.previousFactions"
							:value="previousFaction"
							input-classes="rounded-none border-0 !bg-white !bg-opacity-0 border-b-[1px] border-sky-300"
							is-array
							:array-index="index"
							:array-value="[...toRaw(system.lifePath.previousFactions)]"
						/>
						<a v-if="editable" @click="removeFaction(index)" class="text-center min-w-[20px]">
							<i class="fas fa-trash" />
						</a>
					</div>
				</div>

				<div v-if="editable" class="w-full text-right px-1 py-0.5 font-orbitron text-sm">
					<a @click="addFaction" class="flex items-baseline justify-end gap-1">
						<i class="fas fa-plus" />
						<Localized label="Infinity.Actors.Character.AddFaction" />
					</a>
				</div>
			</div>
		</div>

		<div class="flex flex-col border-[1px] border-solid border-sky-300 bg-white bg-opacity-50">
			<div class="bg-blue-950 border-[1px] border-solid border-sky-300 text-white font-orbitron p-1 uppercase font-bold">
				<Localized label="Infinity.Actors.Character.Lifepath.Notes" />
			</div>

			<div class="flex flex-col items-start gap-2 h-full min-h-[10em] w-full p-2">
				<Editor name="system.lifePath.notes" :content="system.lifePath.notes" button />
			</div>
		</div>
	</div>
</template>
