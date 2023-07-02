import { defineStore } from 'pinia';
import { ref } from 'vue';

import { SETTINGS_NAMESPACE } from '@/settings';
import { SETTINGS_KEY_HEAT, SETTINGS_KEY_MOMENTUM } from '@/settings/momentumTracker';
import { SocketOperation, emit as socketEmit } from '@/socket';

export const useMomentumStore = defineStore('Momentum', () => {
	const momentum = ref(
		game.settings.get(SETTINGS_NAMESPACE, SETTINGS_KEY_MOMENTUM) as number
	);
	const heat = ref(
		game.settings.get(SETTINGS_NAMESPACE, SETTINGS_KEY_HEAT) as number
	);

	/**
	 * Handles modifying Momentum value.
	 *
	 * If `updateSetting` is true and the user is a non-GM, emit an appropriate socket to have the GM's client modify the game setting.
	 *
	 * @param newValue New value for Momentum
	 * @param updateSetting Whether to modify the Foundry game setting (GMs only) or simply to update the value.
	 * @param sendChatMessage Whether to send a chat message for the update.
	 */
	async function setMomentum(newValue: number, updateSetting = true, sendChatMessage = true) {
		if (updateSetting) {
			const amount = Math.abs(newValue - momentum.value);

			// If an actor was specified, create an appropriate chat message!
			if (sendChatMessage && amount > 0) {
				const wasSpend = newValue <= momentum.value;
				const chatTemplate = await renderTemplate('systems/infinity/templates/chat/momentum.hbs', { isGM: game.user.isGM, wasSpend, amount })
				await ChatMessage.create({
					user: game.userId,
					speaker: {
						actor: game.user.character?.id,
					},
					content: chatTemplate,
					type: CONST.CHAT_MESSAGE_TYPES.OOC,
				});
			}

			if (game.user.isGM) {
				game.settings.set(SETTINGS_NAMESPACE, SETTINGS_KEY_MOMENTUM, newValue);
			} else {
				// If non-GMs are attempting to update the setting, we need to send a socket message instead so a GM client can update.
				const amount = newValue - momentum.value;

				socketEmit(SocketOperation.AdjustMomentum, { amount });
			}
		} else {
			momentum.value = newValue;
		}
	}

	/**
	 * Handles modifying Heat value.
	 *
	 * @param newValue New value for Heat
	 * @param updateSetting Whether to modify the Foundry game setting (GMs only)
	 * @param sendChatMessage Whether to send a chat message for the update.
	 */
	async function setHeat(newValue: number, updateSetting = true, sendChatMessage = true) {
		if (updateSetting) {
			if (!game.user.isGM) { return; }

			const amount = Math.abs(newValue - heat.value);

			if (sendChatMessage && amount > 0) {
				const wasSpend = newValue <= heat.value;
				const chatTemplate = await renderTemplate('systems/infinity/templates/chat/heat.hbs', { isGM: game.user.isGM, wasSpend, amount })
				await ChatMessage.create({
					user: game.userId,
					speaker: {
						actor: game.user.character?.id,
					},
					content: chatTemplate,
					type: CONST.CHAT_MESSAGE_TYPES.OOC,
				});
			}

			game.settings.set(SETTINGS_NAMESPACE, SETTINGS_KEY_HEAT, newValue);
		} else {
			heat.value = newValue;
		}
	}

	return {
		momentum,
		heat,

		setMomentum,
		setHeat,
	};
});
