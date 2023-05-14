<!--
	A shared base template for all Item sheets.
-->

<script lang="ts" setup>
import Editor from './Editor.vue';
import InfinitySheet from './InfinitySheet.vue';
import LinkableTextField from './LinkableTextField.vue';
import TitleBox from './TitleBox.vue';

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
</script>

<template>
	<InfinitySheet class="flex flex-col flex-nowrap gap-1 p-2">
		<TitleBox class="-m-1 mb-0.5">
			<img :src="img" data-edit="img" class="aspect-square h-12 border-none bg-sky-300 bg-opacity-75 hover:cursor-pointer rounded-md" />
			<div class="flex flex-col flex-nowrap gap-0.5 w-full">
				<input type="text" name="name" :value="name" placeholder="Item Name" class="text-sky-50 text-xl border-none appearance-none focus:outline-none focus:shadow-none focus:bg-white focus:bg-opacity-5 font-bold" />
				<div v-if="source !== undefined" class="flex gap-1 text-xs items-center">
					<strong>Source:</strong>
					<LinkableTextField name="system.source" :value="source" input-classes="border-none appearance-none focus:outline-none focus:shadow-none focus:bg-white focus:bg-opacity-5" />
				</div>
			</div>
		</TitleBox>

		<slot />

		<div v-if="description !== undefined" class="flex flex-col items-start gap-2 h-full min-h-[10em]">
			<h3 class="w-full">Description</h3>
			<Editor name="system.description" :content="description" button />
		</div>
	</InfinitySheet>
</template>
