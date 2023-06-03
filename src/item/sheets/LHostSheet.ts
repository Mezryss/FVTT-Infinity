import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';

import InfinityItem from '../InfinityItem';
import InfinityItemSheet, { DropData } from '../InfinityItemSheet';
import LHostDataModel, { AbilityItemReference } from '../data/LHostDataModel';
import LHostSheetView from '../views/LHostSheetView.vue';

/**
 * Function callbacks
 */
type LHostSheetActions = {
	/**
	 * Open the Item sheet for the specified Ability.
	 *
	 * @param index Index of the Ability to open.
	 */
	openAbility: (index: number) => Promise<void>;

	/**
	 * Remove an Ability reference from the LHost's list of provided abilities.
	 *
	 * @param index Index of the Ability to remove.
	 */
	removeAbility: (index: number) => Promise<void>;
};

/**
 * Vue context for LHost sheets.
 */
export type LHostSheetContext = IBaseSheetContext<LHostSheetActions>;

/**
 * LHost sheet controller.
 */
export default class LHostSheet extends VueSheet(InfinityItemSheet<LHostDataModel>) {
	/**
	 * Sheet actions callable by the view.
	 */
	actions: LHostSheetActions = {
		openAbility: this.openAbility.bind(this),
		removeAbility: this.removeAbility.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return LHostSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<LHostSheetContext> {
		return IBaseSheetContext.baseContext(this);
	}

	/**
	 * Open the Item sheet for the specified ability.
	 *
	 * @param index Index of the ability to open.
	 */
	async openAbility(index: number) {
		const abilities = this.item.system.specialAbilities;
		if (index >= abilities.length) {
			return;
		}

		const item = (await fromUuid(abilities[index].uuid)) as InfinityItem;
		await item?.sheet?.render(true);
	}

	/**
	 * Remove the specified ability from the item.
	 *
	 * @param index Index of the ability to remove.
	 */
	async removeAbility(index: number) {
		const abilities = this.item.system.specialAbilities;
		if (index >= abilities.length) {
			return;
		}

		const abilitiesCopy = [...abilities];
		abilitiesCopy.splice(index, 1);

		await this.item.update({
			'system.specialAbilities': abilitiesCopy,
		});
	}

	/**
	 * When an Ability is dropped on the sheet, we want to store its UUID as a special ability.
	 *
	 * @inheritdoc
	 */
	protected override async _onDropItem(_event: DragEvent, data: DropData) {
		if (!this.isEditable || !data.uuid) {
			return;
		}

		const droppedItem = (await (InfinityItem.implementation as any).fromDropData(data)) as InfinityItem | undefined;
		if (!droppedItem || droppedItem.type !== 'ability') {
			return;
		}

		await this.item.update({
			'system.specialAbilities': [
				...this.item.system.specialAbilities,
				{
					uuid: droppedItem.uuid,
					name: droppedItem.name,
					img: droppedItem.img,
				},
			] as AbilityItemReference[],
		});
	}
}
