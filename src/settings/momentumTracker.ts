export const SETTINGS_KEY_MOMENTUM = 'momentum';
export const SETTINGS_KEY_HEAT = 'heat';

import { useMomentumStore } from '@/stores/momentumStore';

export function register(namespace: string) {
	game.settings.register(namespace, SETTINGS_KEY_MOMENTUM, {
		name: 'Momentum',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		onChange: async (newValue: any) => {
			const momentumStore = useMomentumStore();
			await momentumStore.setMomentum(+newValue, false, false);
		},
	});

	game.settings.register(namespace, SETTINGS_KEY_HEAT, {
		name: 'Heat',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		onChange: async (newValue: any) => {
			const momentumStore = useMomentumStore();
			await momentumStore.setHeat(+newValue, false, false);
		},
	});
}
