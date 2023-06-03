import { IBaseSheetContext } from '@/IBaseSheetContext';
import { VueSheet } from '@/VueSheet';
import InfinityItem from '@/item/InfinityItem';
import AbilityDataModel from '@/item/data/AbilityDataModel';
import WeaponDataModel from '@/item/data/WeaponDataModel';

import InfinityActorSheet from '../InfinityActorSheet';
import VehicleDataModel from '../data/VehicleDataModel';
import VehicleSheetView from '../views/VehicleSheetView.vue';

/**
 * Vue sheet actions
 */
type VehicleSheetActions = {
	addVehicleType: () => Promise<void>;
	removeVehicleType: (index: number) => Promise<void>;
	removeItem: (uuid: string) => Promise<void>;
};

/**
 * Vue Context for Vehicle Sheets
 */
export type VehicleSheetContext = IBaseSheetContext<VehicleSheetActions> & {
	/**
	 * Vehicle's Special Abilities.
	 */
	abilities: InfinityItem<AbilityDataModel>[];

	/**
	 * Misc. equipment carried by the vehicle.
	 */
	gear: InfinityItem[];

	/**
	 * Vehicle's mounted weapons.
	 */
	weapons: InfinityItem<WeaponDataModel>[];
};

export default class VehicleSheet extends VueSheet(InfinityActorSheet<VehicleDataModel>) {
	/**
	 * View action bindings
	 */
	private actions: VehicleSheetActions = {
		addVehicleType: this.addVehicleType.bind(this),
		removeVehicleType: this.removeVehicleType.bind(this),
		removeItem: this.removeItem.bind(this),
	};

	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return VehicleSheetView;
	}

	/**
	 * Vue Context
	 */
	override async getVueContext(): Promise<VehicleSheetContext> {
		return {
			...IBaseSheetContext.baseContext(this),

			abilities: this.actor.items.filter((i) => i.type === 'ability') as InfinityItem<AbilityDataModel>[],
			gear: this.actor.items.filter((i) => !['ability', 'weapon'].includes(i.type)) as InfinityItem[],
			weapons: this.actor.items.filter((i) => i.type === 'weapon') as InfinityItem<WeaponDataModel>[],
		};
	}

	async addVehicleType() {
		await this.actor.update({
			'system.types': [...this.actor.system.types, ''],
		});
	}
	async removeVehicleType(index: number) {
		const typesCopy = [...this.actor.system.types];

		if (index >= typesCopy.length) {
			return;
		}

		typesCopy.splice(index, 1);

		await this.actor.update({
			'system.types': typesCopy,
		});
	}

	async removeItem(uuid: string) {
		await this.actor.items.find((i) => i.uuid === uuid)?.delete();
	}
}
