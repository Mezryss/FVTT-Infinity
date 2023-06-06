import { VueSheet } from '@/VueSheet';

import InfinityActorSheet from '../InfinityActorSheet';
import VehicleDataModel from '../data/VehicleDataModel';
import VehicleSheetView from '../views/VehicleSheetView.vue';

export default class VehicleSheet extends VueSheet(InfinityActorSheet<VehicleDataModel>) {
	/**
	 * Vue Component
	 */
	override get vueComponent() {
		return VehicleSheetView;
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
}
