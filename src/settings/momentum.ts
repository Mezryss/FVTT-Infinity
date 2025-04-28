import { MomentumTracker } from '@/apps/momentum-tracker';

/**
 * Setting: Current Momentum Value
 *
 * Type: Number
 */
export const SETTINGS_KEY_MOMENTUM = 'momentum';

/**
 * Setting: Maximum Momentum Value
 *
 * Type: Number
 */
export const SETTINGS_KEY_MAX_MOMENTUM = 'maxMomentum';

/**
 * Setting: Current Heat Value
 *
 * Type: Number
 */
export const SETTINGS_KEY_HEAT = 'heat';

/**
 * Setting: Should the Heat Tracker be displayed to players (true), or only GMs (false)?
 *
 * Type: Boolean
 */
export const SETTINGS_KEY_SHOW_HEAT_TO_PLAYERS = 'showHeatToPlayers';

/**
 * Registers Momentum Tracker-related settings.
 */
export function register(namespace: string) {
	game.settings.register(namespace, SETTINGS_KEY_MOMENTUM, {
		key: SETTINGS_KEY_MOMENTUM,
		namespace,
		hint: 'Infinity.Settings.Momentum.Hint',
		name: 'Infinity.Settings.Momentum.Name',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		async onChange(_newValue: any) {
			MomentumTracker.instance.render();
		},
	});

	game.settings.register(namespace, SETTINGS_KEY_HEAT, {
		key: SETTINGS_KEY_HEAT,
		namespace,
		hint: 'Infinity.Settings.Heat.Hint',
		name: 'Infinity.Settings.Heat.Name',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		async onChange(_newValue: any) {
			MomentumTracker.instance.render();
		},
	});

	game.settings.register(namespace, SETTINGS_KEY_SHOW_HEAT_TO_PLAYERS, {
		key: SETTINGS_KEY_SHOW_HEAT_TO_PLAYERS,
		namespace,
		hint: 'Infinity.Settings.ShowHeatToPlayers.Hint',
		name: 'Infinity.Settings.ShowHeatToPlayers.Name',
		scope: 'world',
		config: true,
		default: true,
		type: Boolean,
		async onChange(_newValue: any) {
			MomentumTracker.instance.render();
		},
	});

	game.settings.register(namespace, SETTINGS_KEY_MAX_MOMENTUM, {
		key: SETTINGS_KEY_MAX_MOMENTUM,
		namespace,
		hint: 'Infinity.Settings.MaxMomentum.Hint',
		name: 'Infinity.Settings.MaxMomentum.Name',
		scope: 'world',
		config: true,
		default: 6,
		type: Number,
		/**
		 * When the maximum momentum value changes, clamp the current Momentum
		 */
		async onChange(newValue: any) {
			// Only the active GM should modify settings.
			if (!game.user?.isActiveGM) {
				return;
			}

			// Clamp the Momentum value between 0 and the new max (inclusive).
			const currentMomentum = +game.settings.get(namespace, SETTINGS_KEY_MOMENTUM);
			let newMomentum = currentMomentum;

			if (isNaN(currentMomentum) || currentMomentum < 0) {
				newMomentum = 0;
			} else if (currentMomentum > newValue) {
				newMomentum = newValue;
			}

			game.settings.set(namespace, SETTINGS_KEY_MOMENTUM, newMomentum);
		},
	});
}
