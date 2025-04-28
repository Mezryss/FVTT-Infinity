import { SETTINGS_NAMESPACE } from '@/settings';
import { SETTINGS_KEY_MOMENTUM } from '@/settings/momentum';
import { SOCKET_NAME, SocketOperation, SocketPayload } from '@/socket';

/**
 * Payload data for Adjust Momentum socket event.
 */
export type AdjustMomentumPayloadData = {
	// Must be a type rather than interface, because interface wont match { [key: string]: unknown }
	amount: number;
};

async function handleMomentumPayload(payload: SocketPayload<AdjustMomentumPayloadData>) {
	// This method only handles Adjust Momentum operations.
	if (payload.operation !== SocketOperation.AdjustMomentum || !payload.data) {
		return;
	}

	// Only the GM client has permission to change the world's setting values.
	if (!game.user?.isActiveGM) {
		return;
	}

	// Only need to handle updating the setting here; the setting change will trigger appropriate UI updates.
	const { amount } = payload.data;
	const newValue = Math.max(0, Math.floor(amount));
	game.settings.set(SETTINGS_NAMESPACE, SETTINGS_KEY_MOMENTUM, newValue);
}

/**
 * Setup monitoring for the Momentum socket event.
 */
export function register() {
	Hooks.once('ready', async () => {
		game.socket.on(SOCKET_NAME, handleMomentumPayload);
	});
}
