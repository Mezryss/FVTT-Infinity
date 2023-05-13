import { VueSheet } from '@/VueSheet';
import Skill from '@/data/Skill';
import InfinityItem from '@/item/InfinityItem';
import TalentDataModel from '@/item/data/TalentDataModel';
import InfinityActor from '../InfinityActor';
import InfinityActorSheet from '../InfinityActorSheet';
import GeistDataModel from '../data/GeistDataModel';
import GeistSheetView from '../views/GeistSheetView.vue';

type HarmCategory = 'breaches' | 'metanoia' | 'wounds';

/**
 * Vue sheet actions
 */
type GeistSheetActions = {
	/**
	 * Add the specified Skill to the Geist's skill list.
	 *
	 * @param skill Skill to add to the sheet.
	 */
	addSkill: (skill: Skill) => Promise<void>;

	/**
	 * Removes the specified skill from the Geist's skill list.
	 *
	 * @param skill Skill to be removed.
	 */
	removeSkill: (skill: Skill) => Promise<void>;

	/**
	 * Add a new Trait to the Geist.
	 */
	addTrait: () => Promise<void>;

	/**
	 * Remove the specified trait from the Geist.
	 */
	removeTrait: (index: number) => Promise<void>;

	/**
	 * Adds a Harm Effect to the Geist.
	 *
	 * @param category What type of Harm Effect is being added
	 */
	addHarm: (category: HarmCategory) => Promise<void>;

	/**
	 * Removes a Harm Effect from the Geist.
	 *
	 * @param category What type of Harm Effect is being removed
	 * @param index Index of the effect to remove
	 */
	removeHarm: (category: HarmCategory, index: number) => Promise<void>;

	/**
	 * Removes an Item from the Geist.
	 *
	 * @param uuid UUID of the item to remove.
	 */
	removeItem: (uuid: string) => Promise<void>;
};

/**
 * Vue Context for Geist Sheets
 */
export type GeistSheetContext = {
	/**
	 * Vue sheet actions
	 */
	actions: GeistSheetActions;

	/**
	 * A link to the document. This should not be used by the Vue sheets directly, but is required for the Editor component.
	 *
	 * @private
	 */
	document: InfinityActor<GeistDataModel>;

	/**
	 * Whether or not the sheet is editable.
	 */
	editable: boolean;

	/**
	 * Actor icon.
	 */
	img: string;

	/**
	 * Actor name.
	 */
	name: string;

	/**
	 * System data for the actor.
	 */
	system: GeistDataModel;

	/**
	 * Talent items on the actor.
	 */
	talents: InfinityItem<TalentDataModel>[];
};

export default class GeistSheet extends VueSheet(InfinityActorSheet<GeistDataModel>) {
	/**
	 * View action bindings
	 */
	private actions: GeistSheetActions = {
		addSkill: this.addSkill.bind(this),
		removeSkill: this.removeSkill.bind(this),

		addTrait: this.addTrait.bind(this),
		removeTrait: this.removeTrait.bind(this),

		addHarm: this.addHarm.bind(this),
		removeHarm: this.removeHarm.bind(this),

		removeItem: this.removeItem.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return GeistSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<GeistSheetContext> {
		return {
			actions: this.actions,
			document: this.actor,
			editable: this.isEditable,
			img: this.actor.img,
			name: this.actor.name,
			system: this.actor.system,
			talents: this.actor.items.filter((i) => i.type === 'talent') as InfinityItem<TalentDataModel>[],
		};
	}

	async addSkill(skill: Skill) {
		const skills = this.actor.system.skills;
		if (skills.find((s) => s.skill === skill)) {
			return;
		}

		await this.actor.update({
			'system.skills': [
				...skills,
				{
					skill,
					expertise: 0,
					focus: 0,
				},
			],
		});
	}

	async removeSkill(skill: Skill) {
		const skills = this.actor.system.skills;

		await this.actor.update({
			'system.skills': skills.filter((s) => s.skill !== skill),
		});
	}

	async addTrait() {
		await this.actor.update({
			'system.traits': [...this.actor.system.traits, 'New Trait'],
		});
	}
	async removeTrait(index: number) {
		const traits = this.actor.system.traits;
		if (index >= traits.length) {
			return;
		}

		const traitsCopy = [...traits];
		traitsCopy.splice(index, 1);

		await this.actor.update({
			'system.traits': traitsCopy,
		});
	}

	async addHarm(category: HarmCategory) {
		const harmEffects = this.actor.system.harms[category].effects;

		await this.actor.update({
			[`system.harms.${category}.effects`]: [...harmEffects, `New ${category.capitalize()}`],
		});
	}

	async removeHarm(category: HarmCategory, index: number) {
		const harmEffects = this.actor.system.harms[category].effects;

		if (index >= harmEffects.length) {
			return;
		}

		const effectsCopy = [...harmEffects];
		effectsCopy.splice(index, 1);

		await this.actor.update({
			[`system.harms.${category}.effects`]: effectsCopy,
		});
	}

	async removeItem(uuid: string) {
		await this.actor.items.find((i) => i.uuid === uuid)?.delete();
	}
}