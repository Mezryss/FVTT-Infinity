<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import InfinitySheet from '@/components/InfinitySheet.vue';
import TitleBox from '@/components/TitleBox.vue';
import SheetBody from '@/components/tabs/SheetBody.vue';
import TabBar from '@/components/tabs/TabBar.vue';
import TabContent from '@/components/tabs/TabContent.vue';
import TabLink from '@/components/tabs/TabLink.vue';
import { useActorStore } from '@/stores/actorStore';

import CharacterDataModel from '../data/CharacterDataModel';

import CharacterBackgroundView from './character/CharacterBackgroundView.vue';

const actorStore = useActorStore<CharacterDataModel>();
const { name, img } = storeToRefs(actorStore);
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1">
		<TitleBox class="bg-blue-500">
			<img :src="img" data-edit="img" class="aspect-square h-14 border-none bg-sky-300 bg-opacity-75 hover:cursor-pointer rounded-md" />
			<div class="flex flex-col gap-1 w-full font-orbitron">
				<span class="text-sm">Player Character</span>
				<input type="text" name="name" :value="name" placeholder="Item Name" class="text-sky-100 font-semibold p-1 text-lg border-0" />
			</div>
		</TitleBox>

		<div class="w-full h-full flex flex-col flex-nowrap @container">
			<TabBar class="bg-sky-200 rounded-md">
				<TabLink tab="skills">Skills</TabLink>
				<TabLink tab="combat">Combat</TabLink>
				<TabLink tab="talents">Talents</TabLink>
				<TabLink tab="equipment">Equipment</TabLink>
				<TabLink tab="background">Background</TabLink>
			</TabBar>

			<SheetBody>
				<TabContent tab="skills">Skills</TabContent>
				<TabContent tab="combat">Combat</TabContent>
				<TabContent tab="talents">Talents</TabContent>
				<TabContent tab="equipment">Equipment</TabContent>
				<TabContent tab="background"><CharacterBackgroundView /></TabContent>
			</SheetBody>
		</div>
	</InfinitySheet>
</template>
