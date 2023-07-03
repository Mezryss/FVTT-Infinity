import { AdjustMomentumPayloadData } from './momentum';

import './momentum';

/**
 * Identifier for system-originated Socket messages
 */
export const SOCKET_NAME = 'system.infinity';

/**
 * Container for all possible socket operations.
 */
export enum SocketOperation {
	/**
	 * A player is adjusting momentum.
	 */
	AdjustMomentum,
}

/**
 * Socket payload typing
 */
export type SocketPayload<T extends { [key: string]: unknown }> = {
	operation: SocketOperation;
	data: T | null;
};

/**
 * Player wishes to spend Momentum
 */
export function emit(operation: SocketOperation.AdjustMomentum, data: AdjustMomentumPayloadData): void;

/**
 * Utility wrapper for Infinity's socket emits, providing type-safe argument checking.
 *
 * @see {@link SocketOperation}
 */
export function emit<T extends { [key: string]: unknown }>(operation: SocketOperation, data: T | null = null): void {
	const payload: SocketPayload<T> = {
		operation,
		data,
	};

	game.socket.emit(SOCKET_NAME, payload);
}
