<script lang="ts" setup>
defineProps<{
	label: string;
}>();
</script>

<template>
	<div class="bg-blue-950 flex flex-col gap-0.5 items-center p-0.5">
		<span class="text-amber-500 font-orbitron text-xl font-bold uppercase">{{ label }}</span>

		<slot />
	</div>
</template>
