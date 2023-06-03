import { defineStore } from 'pinia';
import { computed, inject, readonly, ref } from 'vue';

import { DocumentUuid } from '@/VueSheet';
import InfinityActor from '@/actor/InfinityActor';

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

			isEmbedded.value = actor?.isEmbedded ?? false;
			isOwner.value = actor?.isOwner ?? false;
			isToken.value = actor?.isToken ?? false;

			limited.value = actor?.limited ?? true;
			visible.value = actor?.visible ?? false;
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

			isEmbedded: readonly(isEmbedded),
			isOwner: readonly(isOwner),
			isToken: readonly(isToken),

			limited: readonly(limited),
			visible: readonly(visible),
			editable,

			setActor,
		};
	})();
}
