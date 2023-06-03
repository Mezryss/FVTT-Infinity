<!--
	Wraps the default slot with a stylized context menu.
-->

<script lang="ts" setup>
import { ref } from 'vue';

const props = withDefaults(
	defineProps<{
		disableMenu?: boolean;
		usePrimaryClick?: boolean;
		orientation?: 'left' | 'right';
		position?: 'above' | 'below';
	}>(),
	{
		disableMenu: false,
		usePrimaryClick: false,
		orientation: 'right',
		position: 'below',
	},
);

const showMenu = ref(false);

function showContextMenu(event: Event) {
	if (props.disableMenu) {
		return;
	}

	event.stopImmediatePropagation();
	event.preventDefault();

	showMenu.value = true;

	document.addEventListener('click', closeContextMenu, { capture: true });
	document.addEventListener('contextmenu', closeContextMenu, { capture: true });
}

function closeContextMenu(event: Event) {
	event.preventDefault();
	showMenu.value = false;

	document.removeEventListener('click', closeContextMenu, { capture: true });
	document.removeEventListener('contextmenu', closeContextMenu, { capture: true });
}
</script>

<template>
	<div class="relative" @contextmenu="!usePrimaryClick && showContextMenu($event)" @click="usePrimaryClick && showContextMenu($event)">
		<div
			v-if="showMenu"
			class="flex flex-col flex-nowrap gap-0.5 absolute min-w-[100px] border-1 bg-sky-200 border-solid border-sky-700 rounded-md p-0.5 z-10 font-roboto-flex text-base text-black"
			:class="{
				'left-0': orientation === 'left',
				'right-0': orientation === 'right',
				'bottom-[100%]': position === 'above',
				'top-[100%]': position === 'below',
			}"
		>
			<slot name="menu-items">IMPROPERLY-CONFIGURED MENU: NO MENU ITEMS DEFINED</slot>
		</div>
		<slot></slot>
	</div>
</template>
