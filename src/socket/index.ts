import { register as registerMomentum, type AdjustMomentumPayloadData } from './momentum';

/**
 * Identifier for system-originated Socket messages
 */
export const SOCKET_NAME = 'system.infinity';

/**
 * Container for all possible Socket operations.
 */
export enum SocketOperation {
	/**
	 * A player is adjusting Momentum.
	 */
	AdjustMomentum,
}

/**
 * Socket Payload Typing
 */
export interface SocketPayload<DataType extends { [key: string]: unknown }> {
	operation: SocketOperation;
	data: DataType | null;
}

/**
 * Sockets: Player wishes to adjust Momentum value.
 */
export function emit(
	operation: SocketOperation.AdjustMomentum,
	data: AdjustMomentumPayloadData,
): void;

/**
 * Utility wrapper for socket emission, with type-saving argument checking.
 *
 * @see {@link SocketOperation}
 */
export function emit<DataType extends { [key: string]: unknown }>(
	operation: SocketOperation,
	data: DataType | null = null,
): void {
	const payload: SocketPayload<DataType> = { operation, data };

	game.socket.emit(SOCKET_NAME, payload);
}

/**
 * Register Socket operations that need monitoring.
 */
export function register() {
	registerMomentum();
}
