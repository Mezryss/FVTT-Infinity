<!--
	Wrapper for Foundry's ProseMirror Editor.
-->

<script lang="ts" setup>
import { inject, onMounted, onUpdated, ref, toRaw } from 'vue';
import { RootContext } from '@/VueSheet';
import InfinityActor from '@/actor/InfinityActor';
import InfinityItem from '@/item/InfinityItem';

const props = withDefaults(
	defineProps<{
		/**
		 * Name of the property path on the sheet's document that is being modified.
		 */
		name: string;

		/**
		 * Current content of the field.
		 */
		content: string;

		/**
		 * Whether to show the Edit button on the sheet. Note that the sheet must still be editable by the user.
		 */
		button?: boolean;

		/**
		 * Whether to use a Collaborative editor view.
		 */
		collaborate?: boolean;
	}>(),
	{
		button: true,
		collaborate: false,
	},
);

/**
 * A reference to the root div of the component, used to calculate expected height for the editor.
 */
const rootDiv = ref<HTMLDivElement | null>(null);
/**
 * A reference to the div that will ultimately contain the ProseMirror editor instance, so that we can dynamically add/remove fields (since ProseMirror closing is destructive).
 */
const editorContainer = ref<HTMLDivElement | null>(null);

/**
 * ProseMirror editor instance held by this component.
 *
 * Typing data for ProseMirror is extraordinarily bare-bones, so just using `any` for now.
 */
let editorInstance: any | null = null;

/**
 * Because of the complicated nature of this (we're wrapping a non-Vue component), it's helpful to have a reference type to our base content.
 */
const baseContent = ref(props.content);

/**
 * A reference to the enriched-HTML version of {@link baseContent}, which is wrapped in order to handle asynchronous `TextEditor.enrichHTML`.
 */
const enrichedContent = ref('');

/**
 * Whether we're currently in an editing mode.
 */
let editing = ref(false);

/**
 * Get the root Vue App context, so we can access the document being modified.
 */
const rootContext = inject<{
	document: InfinityItem | InfinityActor;
	editable?: boolean;
}>(RootContext)!;

/**
 * Ensure the base content is enriched on mount.
 */
onMounted(enrichContent);

/**
 * When we're updated, we need to update the base content. This is a little more complex than simply calling enrichContent,
 * since we need to fetch the field name from the document object.
 *
 * Part of this is a workaround to the slightly hacky way we're wrangling Foundry to support Vue's reactive rendering functionality.
 */
onUpdated(async () => {
	// Name should be a path split by '.' - such as system.notes.value
	const splitName = props.name.split('.');
	let obj: any = rootContext.document;
	for (let key of splitName) {
		// If we've still got a key to find, but it isn't present, something's messed up.
		if (obj[key] === undefined) {
			console.warn(`Attempting to update ${rootContext.document.name} editor field but '${props.name}' is undefined!`);
			obj = undefined;
			break;
		}

		obj = obj[key];
	}

	// Update our base content tracking.
	baseContent.value = obj as string;

	await enrichContent();
});

/**
 * Asynchronously updates the enriched HTML wrapper.
 */
async function enrichContent() {
	enrichedContent.value = await TextEditor.enrichHTML(baseContent.value, {
		async: true,
	});
}

/**
 * Activate the ProseMirror editor.
 */
async function activate() {
	// This should never happen, unless someone is messing with this component.
	if (!editorContainer.value) {
		console.error('No container to insert into!');
		return;
	}

	// Again, this shouldn't happen - but just in case.
	if (editing.value) {
		console.error(`Attempted to activate an editor for ${props.name} in ${rootContext.document.name}, but the editor is already active!`);
		return;
	}

	// Create a div element to contain the ProseMirror editor.
	const editorDiv = document.createElement('div');
	editorContainer.value.appendChild(editorDiv);

	// Prose options. For the most part, these are identical to Foundry v10, except we change our save callback and only allow ProseMirror.
	const options = {
		target: editorDiv,
		fieldName: props.name,
		save_onsavecallback: save,
		engine: 'prosemirror',
		collaborate: props.collaborate,
		document: props.collaborate ? rootContext.document : undefined,
		height: rootDiv.value!.offsetHeight,
		plugins: {
			menu: ProseMirror.ProseMirrorMenu.build(ProseMirror.defaultSchema, {
				destroyOnSave: props.button,
				onSave: save,
			}),
			keyMaps: ProseMirror.ProseMirrorKeyMaps.build(ProseMirror.defaultSchema, {
				onSave: save,
			}),
		},
		initial: baseContent.value,
	};

	editorInstance = await TextEditor.create(options, baseContent.value);
	editing.value = true;
}

/**
 * Callback handling the ProseMirror editor's saving behavior.
 */
async function save() {
	if (!editorContainer.value) {
		return;
	}

	// Get a string value for the ProseMirror document structure
	baseContent.value = ProseMirror.dom.serializeString(editorInstance.view.state.doc.content);
	await toRaw(rootContext.document).update({
		[props.name]: baseContent.value,
	});

	// Enrich the base content so our non-editor view displays the updated data.
	await enrichContent();

	// Destroy our existing editor instance and empty the containing div.
	editorInstance?.destroy();
	editorInstance = null;
	editorContainer.value.innerText = '';

	editing.value = false;
}
</script>

<template>
	<div class="w-full h-full editor prosemirror text-base font-roboto-flex" ref="rootDiv">
		<a v-if="button && rootContext.editable && !editing" @click="activate" class="editor-edit"><i class="fas fa-edit"></i></a>
		<div v-if="!editing" class="editor-content" v-html="enrichedContent"></div>
		<div class="w-full h-full contents editor-content" v-show="editing" ref="editorContainer"></div>
	</div>
</template>

<style lang="scss">
.editor-content {
	.editor-container {
		height: 100%;
		margin: 0 0 1em;

		.ProseMirror {
			height: 100%;
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
	}
}
</style>
