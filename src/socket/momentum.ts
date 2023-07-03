import { useMomentumStore } from '@/stores/momentumStore';

import { SOCKET_NAME, SocketOperation, SocketPayload } from '.';

/**
 * Socket payload data when Spending Momentum.
 */
export type AdjustMomentumPayloadData = {
	amount: number;
};

/**
 * Handle processing of momentum socket data.
 */
Hooks.once('ready', async () => {
	game.socket.on(SOCKET_NAME, async (payload: SocketPayload<AdjustMomentumPayloadData>) => {
		// Only GM client has the permissions to change world settings values.
		if (!game.user.isGM) {
			return;
		}

		const momentumStore = useMomentumStore();

		switch (payload.operation) {
			case SocketOperation.AdjustMomentum: {
				const amount = payload.data?.amount ?? 0;

				momentumStore.setMomentum(Math.max(0, Math.min(6, momentumStore.momentum + amount)), true, false);

				break;
			}
		}
	});
});
