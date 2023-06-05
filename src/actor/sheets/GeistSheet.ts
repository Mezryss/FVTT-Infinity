import { VueSheet } from '@/VueSheet';

import InfinityActor from '../InfinityActor';
import InfinityActorSheet from '../InfinityActorSheet';
import CharacterDataModel from '../data/CharacterDataModel';
import GeistDataModel from '../data/GeistDataModel';
import GeistSheetView from '../views/GeistSheetView.vue';

export default class GeistSheet extends VueSheet(InfinityActorSheet<GeistDataModel>) {
	static override get defaultOptions() {
		return {
			...super.defaultOptions,
			tabs: [
				{
					navSelector: '.sheet-tabs',
					contentSelector: '.sheet-body',
					initial: 'details',
				},
			],
		};
	}

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return GeistSheetView;
	}

	protected override async _onDropActor(event: any, data: DropCanvasData<'Actor', InfinityActor<GeistDataModel>>) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		const actor = (await (InfinityActor.implementation as any).fromDropData(data)) as InfinityActor<CharacterDataModel>;
		if (!actor || actor.type !== 'character') {
			return;
		}

		await this.actor.update({
			'system.characterUuid': actor.uuid,
		});
	}
}
