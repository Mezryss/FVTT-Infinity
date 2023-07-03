import { App, createApp } from 'vue';

import { StoreManager } from '@/StoreManager';

/**
 * For DocumentSheets specifically, injection point for the Document UUID.
 */
export const DocumentUuid = Symbol('Document UUID');

/**
 * For all applications, injection point for the App ID.
 */
export const AppId = Symbol('Application ID');

/**
 * Typing data for Vue Sheet constructors. The functions defined here are the minimum from Foundry needed for proper type-checking within VueSheet.
 */
type Constructor = new (...args: any[]) => {
	/* Critical items from Application classes */
	id: string;
	activateListeners(html: JQuery): void;
	close(options?: {}): Promise<void>;

	/* Optional items defined prior to the Vue Sheet for interacting with Vue. */
	readonly documentUuid?: string;
	updateStores?(): Promise<void>;
};

/**
 * Mixin adding support for Vue sheet definitions for Foundry app.
 */
export function VueSheet<BaseClass extends Constructor>(baseClass: BaseClass) {
	return class extends baseClass {
		/**
		 * Technically speaking we're redefining the form property here, but so far it hasn't been a problem.
		 */
		form?: HTMLFormElement;

		/**
		 * Handle for the active Vue app.
		 */
		vueApp?: App;

		/**
		 * This component must be implemented by children to define the Vue component to use for the sheet.
		 */
		get vueComponent(): any {
			return null;
		}

		/**
		 *
		 * @param _data
		 * @param options
		 * @returns
		 */
		async _renderInner(_data: unknown, options: any) {
			// Instantiate our form object.
			if (!this.form) {
				const form = document.createElement('form');

				const cssClass = (options?.classes && (options?.classes as string[] | undefined))?.join(' ') ?? '';

				form.className = `${cssClass} vue-app`;
				form.setAttribute('autocomplete', 'off');

				this.form = form;
			}

			// Initialize the vue app if necessary
			if (!this.vueApp) {
				this.vueApp = createApp(this.vueComponent);
				StoreManager.initialized = true;
				this.vueApp.use(StoreManager.instance);
				this.vueApp.provide(AppId, this.id);
				this.vueApp.provide(DocumentUuid, this.documentUuid);

				this.updateStores?.();

				this.vueApp.mount(this.form);
			} else {
				this.updateStores?.();
			}

			return $(<HTMLElement>this.form);
		}

		/**
		 * Unmount and destroy the sfc app for this sheet on close.
		 */
		override async close(options = {}) {
			this.vueApp?.unmount();
			this.vueApp = undefined;

			await super.close(options);
		}

		/**
		 * Deactivate JQuery event listeners to prevent them triggering multiple times.
		 */
		deactivateListeners(html: JQuery) {
			html.find('img[data-edit]').off('click');
			html.find('input,select,textarea').off('change');
			html.find('button.file-picker').off('click');
		}

		override activateListeners(html: JQuery) {
			this.deactivateListeners(html);

			if ((this as any)._onEditImage) {
				html.find('img[data-edit]').on('click', (this as any)._onEditImage.bind(this));
			}

			super.activateListeners(html);
		}

		_activateEditor(_: JQuery | HTMLElement) {}
		async saveEditor(name: string, _: { remove?: boolean } = {}) {}
	};
}
