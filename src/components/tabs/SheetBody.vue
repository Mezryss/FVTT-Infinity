<!--
	Main body of a sheet, which contains <TabContent> elements.

	The main purpose of this is to serve as a wrapper for the sheet-body class, which is used by
	Foundry to select tabs.
-->

<template>
	<section class="sheet-body w-full h-full @container/body">
		<slot />
	</section>
</template>
