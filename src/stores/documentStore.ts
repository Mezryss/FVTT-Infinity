import { defineStore } from 'pinia';
import { inject, ref } from 'vue';

import { DocumentUuid } from '@/VueSheet';

export function useDocumentStore(uuid?: string) {
	if (!uuid) {
		uuid = inject<string>(DocumentUuid);

		if (!uuid) {
			throw new Error('Attempted to use injected Document UUID, but could not find one!');
		}
	}

	return defineStore(`DocumentStore-${uuid}`, () => {
		const document = ref<foundry.abstract.Document>();
		const editable = ref(false);
		const name = ref('');

		function setDocument(value: foundry.abstract.Document) {
			document.value = value;
			name.value = value.name;
		}

		async function openSheet() {
			const document = await fromUuid(uuid!);
			await document?.sheet?.render(true);
		}

		async function update(values: Record<string, any>) {
			const document = await fromUuid(uuid!);
			await document?.update(values);
		}

		async function deleteDocument() {
			const document = await fromUuid(uuid!);
			await document?.delete();
		}

		return {
			document,
			editable,
			name,

			openSheet,
			update,
			deleteDocument,

			setDocument,
		};
	})();
}
