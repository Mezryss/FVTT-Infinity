<!--
	Provides styling for items within a ContextMenu
-->

<template>
	<a class="flex flex-nowrap items-center gap-0.5 px-0.5 whitespace-nowrap">
		<div class="min-w-[1.25em]">
			<slot name="icon">
				<i class="fas fa-caret-right"></i>
			</slot>
		</div>

		<div class="menu-label">
			<slot>Unlabeled</slot>
		</div>
	</a>
</template>
