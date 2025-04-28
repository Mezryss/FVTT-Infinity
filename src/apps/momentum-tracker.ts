import { HandlebarsMixin, HandlebarsParts } from '@/apps/sheets/handlebars-mixin';
import { SETTINGS_NAMESPACE } from '@/settings';
import {
	SETTINGS_KEY_HEAT,
	SETTINGS_KEY_MAX_MOMENTUM,
	SETTINGS_KEY_MOMENTUM,
	SETTINGS_KEY_SHOW_HEAT_TO_PLAYERS,
} from '@/settings/momentum';

import { emit as socketEmit, SocketOperation } from '@/socket';

const { ApplicationV2 } = foundry.applications.api;

enum TrackerPool {
	Momentum = 'momentum',
	Heat = 'heat',
}

/**
 * Handles Momentum updates either via Socket Message (for players) or direct settings modification (for GMs)
 */
function setMomentum(value: number) {
	let newValue = Math.max(0, Math.floor(value));

	// Enforce Momentum Cap
	const maxMomentum = +game.settings.get(SETTINGS_NAMESPACE, SETTINGS_KEY_MAX_MOMENTUM);
	if (!isNaN(maxMomentum)) {
		newValue = Math.min(newValue, maxMomentum);
	}

	// Players can't modify World Settings directly, so we emit a socket for a GM to modify Momentum.
	if (!game.user?.isGM) {
		socketEmit(SocketOperation.AdjustMomentum, {
			amount: newValue,
		});
		return;
	}

	game.settings.set(SETTINGS_NAMESPACE, SETTINGS_KEY_MOMENTUM, newValue);
}

/**
 * Handles Heat updates via direct settings modification (GMs only).
 */
function setHeat(value: number) {
	if (!game.user?.isGM) {
		console.error('Only GMs can set Heat');
		return;
	}

	const newValue = Math.max(0, Math.floor(value));
	game.settings.set(SETTINGS_NAMESPACE, SETTINGS_KEY_HEAT, newValue);
}

/**
 * The Momentum Tracker is injected into ui-left and handles displaying and modifying Momentum and Heat
 */
export class MomentumTracker extends HandlebarsMixin(ApplicationV2) {
	static DEFAULT_OPTIONS = {
		actions: {
			increasePool: MomentumTracker.#increasePool,
			decreasePool: MomentumTracker.#decreasePool,
		},
		id: 'momentum-tracker',
		tag: 'aside',
		window: {
			frame: false,
			positioned: false,
		},
	};

	static PARTS: HandlebarsParts = {
		tracker: {
			root: true,
			template: 'systems/infinity/templates/apps/momentum-tracker.hbs',
		},
	};

	/** Momentum Tracker app operates as a Singleton */
	static readonly instance: MomentumTracker = new MomentumTracker(
		MomentumTracker.DEFAULT_OPTIONS,
	);

	/**
	 * Utility accessor for the current Momentum value.
	 */
	get momentum(): number {
		return +game.settings.get(SETTINGS_NAMESPACE, SETTINGS_KEY_MOMENTUM);
	}

	/**
	 * Utility accessor for the current Heat value.
	 */
	get heat(): number {
		return +game.settings.get(SETTINGS_NAMESPACE, SETTINGS_KEY_HEAT);
	}

	/**
	 * Injects heat & momentum values, as well as determines whether the Heat Tracker should even be rendered based on game settings & user role.
	 */
	protected async _prepareContext(options: foundry.applications.types.ApplicationRenderOptions) {
		const baseContext = await super._prepareContext(options);

		const renderHeatTracker =
			game.user?.isGM ||
			!!game.settings.get(SETTINGS_NAMESPACE, SETTINGS_KEY_SHOW_HEAT_TO_PLAYERS);

		return {
			...baseContext,

			momentum: this.momentum,
			heat: this.heat,
			renderHeatTracker,
			isGM: game.user?.isGM,
		};
	}

	/**
	 * When the application first renders, move the application into the ui-left-column-1 interface column.
	 *
	 * This will allow it to stack on top of the Players List (accounting for any shift in the UI from expanding/collapsing the list), and hopefully remain compatible with any future UI changes.
	 */
	protected async _onFirstRender(
		context: foundry.applications.types.ApplicationRenderContext,
		options: foundry.applications.types.ApplicationRenderOptions,
	): Promise<void> {
		await super._onFirstRender(context, options);

		// Move the element into the ui-left stack.
		const uiLeft = document.querySelector<HTMLDivElement>('#ui-left-column-1');
		if (!uiLeft) {
			console.error('Error: Could not find #ui-left-column-1!');
			return;
		}

		const playerList = uiLeft.querySelector('#players');
		if (!playerList) {
			console.warn(
				'Could not find player list HTML element, appending Momentum Tracker to end of ui-left-column-1.',
			);
			uiLeft.appendChild(this.element);
			return;
		}

		uiLeft.insertBefore(this.element, playerList);
	}

	/**
	 * When the application is re-rendered, add event handlers to track when the input value changes.
	 */
	protected async _onRender(
		context: foundry.applications.types.ApplicationRenderContext,
		options: foundry.applications.types.ApplicationRenderOptions,
	) {
		await super._onRender(context, options);

		const momentumInput = this.element.querySelector<HTMLInputElement>('input[name=momentum]');
		momentumInput?.addEventListener('change', <any>this.#momentumInputChanged.bind(this));

		if (game.user?.isGM) {
			const heatInput = this.element.querySelector<HTMLInputElement>('input[name=heat]');
			heatInput?.addEventListener('change', <any>this.#heatInputChanged.bind(this));
		}
	}

	/**
	 * Callback when the Momentum input box is changed.
	 */
	#momentumInputChanged(event: Event) {
		const target = event.target as HTMLInputElement;

		let value = +target.value;
		if (isNaN(value)) {
			this.render();
			return;
		}

		value = Math.max(0, Math.floor(value));

		setMomentum(value);
		this.render();
	}

	/**
	 * Callback when the Heat input box is changed.
	 */
	async #heatInputChanged(event: Event) {
		const target = event.target as HTMLInputElement;

		if (!game.user?.isGM) {
			this.render();
			return;
		}

		let value = +target.value;
		if (isNaN(value)) {
			this.render();
			return;
		}

		value = Math.max(0, Math.floor(value));

		setHeat(value);
		this.render();
	}

	/**
	 * UI Action: Increase the value of a pool.
	 */
	static async #increasePool(this: MomentumTracker, _event: Event, target: HTMLElement) {
		const pool = target.dataset['pool'] as TrackerPool;

		let poolValue = NaN;

		switch (pool) {
			case TrackerPool.Heat:
				poolValue = this.heat;
				break;

			case TrackerPool.Momentum:
				poolValue = this.momentum;
				break;
		}

		// Double duty: validates we were given a valid pool, and that we have a valid current value to increment.
		if (isNaN(poolValue)) {
			console.warn('Pool value is NaN');
			return;
		}

		// No cheeky decimals!
		poolValue = Math.floor(poolValue) + 1;

		// Set the new value!
		switch (pool) {
			case TrackerPool.Heat:
				setHeat(poolValue);
				break;

			case TrackerPool.Momentum:
				setMomentum(poolValue);
				break;
		}
	}

	/**
	 * UI Action: Decrease the value of a pool.
	 */
	static async #decreasePool(this: MomentumTracker, _event: Event, target: HTMLElement) {
		const pool = target.dataset['pool'] as TrackerPool;

		let poolValue = NaN;

		switch (pool) {
			case TrackerPool.Heat:
				poolValue = this.heat;
				break;

			case TrackerPool.Momentum:
				poolValue = this.momentum;
				break;
		}

		// Double duty: validates we were given a valid pool, and that we have a valid current value to increment.
		if (isNaN(poolValue)) {
			console.warn('Pool value is NaN');
			return;
		}

		// No cheeky decimals!
		poolValue = Math.max(0, Math.floor(poolValue) - 1);

		// Set the new value!
		switch (pool) {
			case TrackerPool.Heat:
				setHeat(poolValue);
				break;

			case TrackerPool.Momentum:
				setMomentum(poolValue);
				break;
		}
	}
}
