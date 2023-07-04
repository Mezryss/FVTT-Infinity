import { SETTINGS_KEY_MOMENTUM, SETTINGS_KEY_HEAT } from './index.mjs';
import { socketEmit, SocketOperation } from '../../socket.mjs';

/**
 * Momentum & Heat Tracker app for both players and GMs.
 *
 * Singleton, use {@link MomentumTracker.instance} to access.
 *
 * TODO: Needs a big refactor for spending & storing Heat & Momentum.
 */
export default class MomentumTracker extends Application {
	/** @type {MomentumTracker} */
	static #instance;

	/**
	 * Singleton instance used to access the Momentum Tracker
	 *
	 * @returns {MomentumTracker}
	 */
	static get instance() {
		return this.#instance;
	}

	static get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['infinity', 'momentum-tracker'],
			id: 'momentum-tracker',
			popOut: false,
			resizable: false,
			width: 'auto',
		};
	}

	/**
	 * Whether the user is directly editing Momentum.
	 *
	 * @type {boolean}
	 */
	directEditMomentum = false;

	/**
	 * Whether the user is directly editing Heat.
	 *
	 * @type {boolean}
	 */
	directEditHeat = false;

	/**
	 * Which input to focus on.
	 *
	 * @type {string|null}
	 */
	focusTarget = null;

	get template() {
		return 'systems/infinity/templates/apps/momentum-tracker.hbs';
	}

	/**
	 * Current Momentum value in the game.
	 *
	 * @returns {number}
	 */
	get momentum() {
		return game.settings.get('infinity', SETTINGS_KEY_MOMENTUM);
	}

	/**
	 * Current Heat value in the game.
	 *
	 * @returns {number}
	 */
	get heat() {
		return game.settings.get('infinity', SETTINGS_KEY_HEAT);
	}

	constructor(options = {}) {
		if (MomentumTracker.#instance) {
			throw new Error('Attempted to create multiple instances of the MomentumTracker singleton.');
		}

		super(options);

		MomentumTracker.#instance = this;
	}

	getData(options = {}) {
		return {
			...super.getData(options),
			momentum: this.momentum,
			heat: this.heat,
			isGM: game.user.isGM,
			directEditMomentum: this.directEditMomentum,
			directEditHeat: this.directEditHeat,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find('[data-action="increase"]').on('click', this.increase.bind(this));
		html.find('[data-action="decrease"]').on('click', this.decrease.bind(this));

		html.find('[data-action="toggle-edit"]').on('click', this.toggleDirectEdit.bind(this));
		html.find('input').on('keydown', this.inputKeydown.bind(this));

		if (this.focusTarget !== null) {
			html.find(`input[data-type="${this.focusTarget}"]`).trigger('focus').trigger('select');
			this.focusTarget = null;
		}
	}

	/**
	 * Event Handler; When the user clicks on either the Momentum or Threat value, change it to an input and allow manual entry.
	 *
	 * @param {MouseEvent} event
	 */
	async toggleDirectEdit(event) {
		const type = $(event.currentTarget).data('type');

		switch (type) {
			case 'momentum':
				this.directEditMomentum = true;
				break;

			case 'heat':
				this.directEditHeat = true;
				break;
		}

		this.focusTarget = type;
		this.render(true);
	}

	/**
	 * Event Handler; Handle the Enter key being pressed on the direct-edit input fields, storing the new value and outputting an appropriate chat message.
	 *
	 * @param {KeyboardEvent} event
	 */
	async inputKeydown(event) {
		if (event.key !== 'Enter') {
			return;
		}

		const target = $(event.currentTarget);
		const type = target.data('type');

		if (type === 'heat' && !game.user.isGM) {
			return;
		}

		let currentValue = 0;
		switch (type) {
			case 'momentum':
				currentValue = this.momentum;
				break;

			case 'heat':
				currentValue = this.heat;
				break;
		}
		let newValue = +target.val();
		if (isNaN(newValue) || newValue === currentValue) {
			return;
		}
		// No cheeky fractions allowed.
		newValue = Math.floor(Math.max(0, newValue));

		if (type === 'momentum') {
			newValue = Math.min(6, newValue);
		}

		// TODO: This part should be refactored out.
		if (game.user.isGM) {
			game.settings.set('infinity', type, newValue);
		} else {
			socketEmit(SocketOperation.PlayerSetMomentum, { value: newValue });
		}

		const amount = Math.abs(newValue - currentValue);

		const chatTemplate = await renderTemplate(`systems/infinity/templates/chat/${type}.hbs`, { isGM: game.user.isGM, amount: amount, wasSpend: newValue < currentValue });
		await ChatMessage.create({
			user: game.userId,
			speaker: {
				actor: game.user.character?.id,
			},
			content: chatTemplate,
			type: CONST.CHAT_MESSAGE_TYPES.OOC,
		});

		this.directEditHeat = false;
		this.directEditMomentum = false;

		this.render(true);
	}

	/**
	 * Event Handler; Decrement the amount of Heat or Momentum.
	 *
	 * @param {MouseEvent} event
	 */
	async decrease(event) {
		const target = $(event.currentTarget);
		const type = target.data('type');

		switch (type) {
			case 'momentum':
				await MomentumTracker.spendMomentum();
				break;

			case 'heat':
				await MomentumTracker.spendHeat();
				break;
		}
	}

	/**
	 * Event Handler; Increment the amount of Heat or Momentum.
	 *
	 * @param {MouseEvent} event
	 */
	async increase(event) {
		const target = $(event.currentTarget);
		const type = target.data('type');

		// Only GMs can spend Heat, and they're responsible for tracking it as well.
		if (type === 'heat' && !game.user.isGM) {
			return;
		}

		let newValue = game.settings.get('infinity', type) + 1;

		if (game.user.isGM) {
			// Momentum is capped at 6.
			if (type === 'momentum' && newValue > 6) {
				return;
			}

			await game.settings.set('infinity', type, newValue);
		} else {
			socketEmit(SocketOperation.PlayerSetMomentum, { value: newValue });
		}

		const chatTemplate = await renderTemplate(`systems/infinity/templates/chat/${type}.hbs`, { isGM: game.user.isGM, amount: 1, wasSpend: false });
		await ChatMessage.create({
			user: game.userId,
			speaker: {
				actor: game.user.character?.id,
			},
			content: chatTemplate,
			type: CONST.CHAT_MESSAGE_TYPES.OOC,
		});
	}

	/**
	 * Spend a single point of Momentum.
	 *
	 * TODO: Refactor this to handle setting the amount of momentum.
	 */
	static async spendMomentum() {
		if (!MomentumTracker.instance) {
			return;
		}

		const momentum = MomentumTracker.instance.momentum;

		if (momentum === 0) {
			ui.notifications.info(game.i18n.localize('Notifications.NotEnoughMomentum'));
			return;
		}

		const newValue = momentum - 1;

		if (game.user.isGM) {
			await game.settings.set('infinity', SETTINGS_KEY_MOMENTUM, newValue);
		} else {
			socketEmit(SocketOperation.PlayerSetMomentum, { value: newValue });
		}

		const chatTemplate = await renderTemplate('systems/infinity/templates/chat/momentum.hbs', { isGM: game.user.isGM, amount: 1, wasSpend: true });
		await ChatMessage.create({
			user: game.userId,
			speaker: {
				actor: game.user.character?.id,
			},
			content: chatTemplate,
			type: CONST.CHAT_MESSAGE_TYPES.OOC,
		});
	}

	/**
	 * Spend a single point of Heat.
	 *
	 * TODO: Refactor this to handle setting the amount of heat.
	 */
	static async spendHeat() {
		if (!MomentumTracker.instance || !game.user.isGM) {
			return;
		}

		const heat = MomentumTracker.instance.heat;

		if (heat === 0) {
			ui.notifications.info(game.i18n.localize('Notifications.NotEnoughHeat'));
			return;
		}

		await game.settings.set('infinity', SETTINGS_KEY_HEAT, heat - 1);

		const chatTemplate = await renderTemplate('systems/infinity/templates/chat/heat.hbs', { isGM: game.user.isGM, amount: 1, wasSpend: true });
		await ChatMessage.create({
			user: game.userId,
			speaker: {
				actor: game.user.character?.id,
			},
			content: chatTemplate,
			type: CONST.CHAT_MESSAGE_TYPES.OOC,
		});
	}
}
