<!--
	A shared base template for all Item sheets.
-->

<script lang="ts" setup>
import { useSlots } from 'vue';
import Editor from './Editor.vue';
import InfinitySheet from './InfinitySheet.vue';
import LinkableTextField from './LinkableTextField.vue';
import TitleBox from './TitleBox.vue';
import SheetBody from './tabs/SheetBody.vue';
import TabBar from './tabs/TabBar.vue';
import TabContent from './tabs/TabContent.vue';
import TabLink from './tabs/TabLink.vue';

withDefaults(
	defineProps<{
		/**
		 * Item's document name.
		 */
		name: string;

		/**
		 * Item's icon path.
		 */
		img: string;

		/**
		 * Item's current description value.
		 */
		description?: string;

		/**
		 * Item's source value.
		 */
		source?: string;

		/**
		 * Whether or not the ActiveEffects tab should be shown for this item sheet.
		 */
		showActiveEffects?: boolean;
	}>(),
	{
		showActiveEffects: false,
	},
);

const slots = useSlots();
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-2 p-2 text-base">
		<TitleBox class="-m-1">
			<img :src="img" data-edit="img" class="aspect-square h-14 border-none bg-sky-300 bg-opacity-75 hover:cursor-pointer rounded-md" />
			<div class="flex flex-col flex-nowrap gap-0.5 w-full">
				<input type="text" name="name" :value="name" placeholder="Item Name" class="text-sky-50 text-lg border-none appearance-none focus:outline-none focus:shadow-none focus:bg-white focus:bg-opacity-5 font-bold" />
				<div v-if="source !== undefined" class="flex gap-1 text-sm items-center">
					<strong>Source:</strong>
					<LinkableTextField name="system.source" :value="source" input-classes="border-none appearance-none focus:outline-none focus:shadow-none focus:bg-white focus:bg-opacity-5" />
				</div>
			</div>
		</TitleBox>

		<div class="flex flex-nowrap h-full w-full gap-2">
			<!-- TODO: Make the sidebar responsive to container (window) width. -->
			<div v-if="slots.sidebar" class="h-full w-48 flex-shrink-0 bg-sky-400 bg-opacity-20 rounded-md p-1">
				<div class="flex flex-col flex-nowrap w-full h-full gap-1">
					<slot name="sidebar" />
				</div>
			</div>
			<div class="w-full h-full flex flex-col flex-nowrap">
				<TabBar>
					<TabLink v-if="description !== undefined" tab="description">Description</TabLink>
					<TabLink tab="detail">Details</TabLink>
					<TabLink v-if="showActiveEffects" tab="effects">Effects</TabLink>
				</TabBar>

				<SheetBody>
					<TabContent tab="detail">
						<slot />
					</TabContent>

					<TabContent v-if="description !== undefined" tab="description">
						<div class="flex flex-col items-start gap-2 h-full min-h-[10em] w-full">
							<Editor name="system.description" :content="description" button />
						</div>
					</TabContent>
				</SheetBody>
			</div>
		</div>
	</InfinitySheet>
</template>
