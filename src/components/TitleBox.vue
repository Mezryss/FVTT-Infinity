<!--
	Container box for Titles making use of the Orbitron font and the TitleBox 9-slice border image.
-->
<script lang="ts" setup>
withDefaults(
	defineProps<{
		backgroundClass?: string;
	}>(),
	{
		backgroundClass: 'bg-blue-950',
	},
);
</script>

<template>
	<div class="font-orbitron bg-sky-300 relative p-0.5">
		<div :class="`flex items-center gap-2 ${backgroundClass} py-0.5 px-1 text-white`">
			<slot />
		</div>
	</div>
</template>
