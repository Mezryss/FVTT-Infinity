import { defineStore } from 'pinia';
import { computed, inject, readonly, ref } from 'vue';

import { DocumentUuid } from '@/VueSheet';
import InfinityActor from '@/actor/InfinityActor';
import InfinityItem from '@/item/InfinityItem';

export function useActorStore<DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel>(uuid?: string) {
	if (!uuid) {
		uuid = inject<string>(DocumentUuid);

		if (!uuid) {
			throw new Error('Attempted to use injected Document UUID, but could not find one!');
		}
	}

	return defineStore(`ActorStore-${uuid}`, () => {
		const exists = ref(false);
		const name = ref('');
		const img = ref('');
		const type = ref('invalid');
		const system = ref<DataModelType>();
		const items = ref<InfinityItem[]>([]);

		const isEmbedded = ref(false);
		const isOwner = ref(false);
		const isToken = ref(false);

		const limited = ref(true);
		const visible = ref(false);

		const editable = computed(() => visible.value && !limited.value && isOwner.value);

		function setActor(actor: InfinityActor<DataModelType> | null) {
			exists.value = actor !== null;
			name.value = actor?.name ?? '';
			img.value = actor?.img ?? '';
			type.value = actor?.type ?? 'invalid';
			system.value = actor?.system ?? undefined;

			items.value = [...(actor?.items?.values?.() ?? [])] as InfinityItem[];

			isEmbedded.value = actor?.isEmbedded ?? false;
			isOwner.value = actor?.isOwner ?? false;
			isToken.value = actor?.isToken ?? false;

			limited.value = actor?.limited ?? true;
			visible.value = actor?.visible ?? false;
		}

		async function openSheet() {
			const actor = await fromUuid(uuid!);
			await actor?.sheet?.render(true);
		}

		async function update(values: Record<string, any>) {
			const actor = await fromUuid(uuid!);
			await actor?.update(values);
		}

		async function deleteActor() {
			const actor = await fromUuid(uuid!);
			await actor?.delete();
		}

		if (!exists.value) {
			setActor(fromUuidSync(uuid!) as InfinityActor<DataModelType>);
		}

		return {
			uuid,

			exists: readonly(exists),
			name: readonly(name),
			img: readonly(img),
			type: readonly(type),
			system: readonly(system),
			items: readonly(items),

			isEmbedded: readonly(isEmbedded),
			isOwner: readonly(isOwner),
			isToken: readonly(isToken),

			limited: readonly(limited),
			visible: readonly(visible),
			editable,

			openSheet,
			deleteActor,
			update,

			setActor,
		};
	})();
}
