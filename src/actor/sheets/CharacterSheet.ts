import { VueSheet } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';
import TalentDataModel from '@/item/data/TalentDataModel';
import InfinityActor from '../InfinityActor';
import InfinityActorSheet from '../InfinityActorSheet';
import CharacterSheetView from '../views/CharacterSheetView.vue';

/**
 * Function Callbacks
 */
type CharacterSheetActions = {
	/**
	 * (EXPERIMENTATION PURPOSES) Updates the rank of a talent.
	 */
	updateTalentRank: (id: string, multiplier?: number) => Promise<void>;
};

/**
 * Vue context for Character sheets.
 */
export type CharacterSheetContext = {
	/**
	 * Collection of actions the sheet view can call.
	 */
	actions: CharacterSheetActions;

	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityActor;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Character icon.
	 */
	img: string;

	/**
	 * Character name.
	 */
	name: string;

	/**
	 * Character talents.
	 */
	talents: {
		/**
		 * Document UUID
		 */
		id: string;

		/**
		 * Talent Name
		 */
		name: string;

		/**
		 * Talent Icon
		 */
		img: string;

		/**
		 * Talent System
		 */
		system: TalentDataModel;
	}[];
};

/**
 * Player Character sheet controller.
 */
export class CharacterSheet extends VueSheet(InfinityActorSheet) {
	/**
	 * Sheet action bindings.
	 */
	private actions: CharacterSheetActions = {
		updateTalentRank: this.updateTalentRank.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return CharacterSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<CharacterSheetContext> {
		return {
			actions: this.actions,
			document: this.actor,
			editable: this.isEditable,
			img: this.actor.img,
			name: this.actor.name,

			talents: this.actor.items
				.filter((i) => i.type === 'talent')
				.map((talent) => ({
					id: talent.id,
					name: talent.name,
					img: talent.img,
					system: talent.system,
				})),
		};
	}

	/**
	 * (EXPERIMENTATION PURPOSES) Updates the rank of a talent.
	 */
	async updateTalentRank(id: string, multiplier: number = 1) {
		const item = this.actor.items.find((i) => i.id === id) as
			| InfinityItem<TalentDataModel>
			| undefined;
		if (!item || item.type !== 'talent' || !item.system.isRanked) {
			return;
		}

		await item.update({
			'system.rank.current': Math.clamped(
				item.system.rank.current + multiplier,
				1,
				item.system.rank.max,
			),
		});
	}
}
