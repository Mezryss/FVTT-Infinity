import { VueSheet } from "@/VueSheet";

import MomentumTrackerView from './views/MomentumTracker.vue';

/**
 * Static, singleton Application for handling Momentum & Heat tracker display.
 *
 * All actual functionality is handled in the accompanying Vue app.
 */
export class MomentumTracker extends VueSheet(Application) {
	static #instance: MomentumTracker = new MomentumTracker();

	static get instance() { return this.#instance; }

	static override get defaultOptions() {
		return {
			...super.defaultOptions,
			classes: ['infinity', 'momentum-tracker'],
			id: 'momentum-tracker',
			popOut: false,
			resizable: false,
			width: 'auto',
		};
	}

	override get vueComponent() {
		return MomentumTrackerView;
	}

	private constructor(options = {}) {
		super(options);
	}
}

Hooks.once('ready', async () => {
	MomentumTracker.instance.render(true);
});
