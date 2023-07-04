import MomentumTracker from './MomentumTracker.mjs';
import { SOCKET_NAME, SocketOperation } from '../../socket.mjs';

export const SETTINGS_KEY_MOMENTUM = 'momentum';
export const SETTINGS_KEY_HEAT = 'heat';

Hooks.once('init', async () => {
	// Register the Momentum Tracker hidden settings.
	game.settings.register('infinity', SETTINGS_KEY_MOMENTUM, {
		name: 'Momentum',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		onChange: () => MomentumTracker.instance.render(true),
	});

	game.settings.register('infinity', SETTINGS_KEY_HEAT, {
		name: 'Heat',
		scope: 'world',
		config: false,
		default: 0,
		type: Number,
		onChange: () => MomentumTracker.instance.render(true),
	});
});

/**
 * Initialize the Momentum Tracker & begin monitoring for socket events when players set momentum.
 */
Hooks.once('ready', async () => {
	if (MomentumTracker.instance) {
		return;
	}

	new MomentumTracker();
	MomentumTracker.instance.render(true);

	game.socket.on(
		SOCKET_NAME,
		/** @param {SocketPayload} payload */ async (payload) => {
			if (!MomentumTracker.instance) {
				return;
			}

			switch (payload.operation) {
				/**
				 * Player has spent Momentum.
				 */
				case SocketOperation.PlayerSetMomentum: {
					// Only GM clients should actually process the operation.
					if (!game.user.isGM) {
						return;
					}

					/** @type number */
					let newValue = payload.data.value;
					if (isNaN(+newValue)) {
						console.error('Infinity | Received invalid value for Set Momentum payload:', newValue);
						return;
					}

					// Clamp the Momentum value to a range of 0–6 (inclusive), and ensure it isn't fractional.
					newValue = Math.floor(Math.min(6, Math.max(0, newValue)));

					await game.settings.set('infinity', SETTINGS_KEY_MOMENTUM, newValue);

					break;
				}
			}
		},
	);
});
