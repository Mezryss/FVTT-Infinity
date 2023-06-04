import { defineStore } from 'pinia';
import { computed, inject, readonly, ref } from 'vue';

import { DocumentUuid } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';

export function useItemStore<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel>(uuid?: string) {
	if (!uuid) {
		uuid = inject<string>(DocumentUuid);

		if (!uuid) {
			throw new Error('Attempted to use injected Document UUID, but could not find one!');
		}
	}

	return defineStore(`ItemStore-${uuid}`, () => {
		const exists = ref(false);
		const name = ref('');
		const img = ref('');
		const sort = ref(0);
		const type = ref('invalid');
		const system = ref<DataModelType>();

		const isEmbedded = ref(false);
		const isOwned = ref(false);
		const isOwner = ref(false);

		const limited = ref(true);
		const visible = ref(false);

		const editable = computed(() => visible.value && !limited.value && isOwner.value);

		function setItem(item: InfinityItem<DataModelType> | null) {
			exists.value = item !== null;
			name.value = item?.name ?? '';
			img.value = item?.img ?? '';
			sort.value = item?.sort ?? 0;
			type.value = item?.type ?? 'invalid';
			system.value = item?.system ?? undefined;

			isEmbedded.value = item?.isEmbedded ?? false;
			isOwned.value = item?.isOwned ?? false;
			isOwner.value = item?.isOwner ?? false;

			limited.value = item?.limited ?? true;
			visible.value = item?.visible ?? false;
		}

		async function openSheet() {
			const item = await fromUuid(uuid!);
			await item?.sheet?.render(true);
		}

		async function update(values: Record<string, any>) {
			const item = await fromUuid(uuid!);
			await item?.update(values);
		}

		async function deleteItem() {
			const item = await fromUuid(uuid!);
			await item?.delete();
		}

		if (!exists.value) {
			setItem(fromUuidSync(uuid!) as InfinityItem<DataModelType>);
		}

		return {
			uuid,

			exists: readonly(exists),
			name: readonly(name),
			img: readonly(img),
			sort: readonly(sort),
			type: readonly(type),
			system: readonly(system),

			isEmbedded: readonly(isEmbedded),
			isOwned: readonly(isOwned),
			isOwner: readonly(isOwner),

			limited: readonly(limited),
			visible: readonly(visible),
			editable,

			openSheet,
			deleteItem,
			update,

			setItem,
		};
	})();
}
