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

		return {
			document,
			editable,
		};
	})();
}
