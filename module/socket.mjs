export const SOCKET_NAME = 'system.infinity';

/**
 * @readonly
 * @enum {number}
 */
export const SocketOperation = {
	/**
	 * A player is modifying current Momentum.
	 */
	PlayerSetMomentum: 0,
};

/**
 * @typedef {object} SocketPayload
 *
 * @property {SocketOperation} operation
 * @property {any} data
 */

/**
 * Emit a Socket operation.
 *
 * @param {SocketOperation} operation
 * @param {any} data
 */
export function socketEmit(operation, data = undefined) {
	/** @type SocketPayload */
	const payload = { operation, data };

	game.socket.emit(SOCKET_NAME, payload);
}
