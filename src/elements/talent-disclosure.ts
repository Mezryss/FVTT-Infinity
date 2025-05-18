import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

@customElement('talent-disclosure')
export class TalentDisclosureElement extends LitElement {
	static styles = css`
		:host {
			display: block;
			border: 1px solid #6dbcd2;
			border-top: none;
			background: #b1d8e5;
			width: 100%;
			color: black;
			break-inside: avoid;

			--transition-time: 0.25s;
		}

		.header {
			display: flex;
			flex-flow: row nowrap;
			gap: 0.5em;
			padding: 0.25em;
			font-family: var(--font-orbitron), sans-serif;
			font-weight: var(--fw-medium);

			.name {
				flex-grow: 1;
			}
		}

		.description-container {
			border-top: 1px solid #6dbcd2;
			background: white;
			overflow: hidden;
			/*noinspection CssUnresolvedCustomProperty*/
			transition: all ease-in-out var(--transition-time);
		}

		.collapsed {
			border-top-width: 0;
		}

		.measure {
			padding: 0 0.5em;
		}

		.disclosure-icon {
			/*noinspection CssUnresolvedCustomProperty*/
			transition: all ease-in-out var(--transition-time);
			transform: rotate(0deg);
		}

		.rotated {
			transform: rotate(90deg);
		}
	`;

	/**
	 * Whether the talent should be expanded.
	 */
	@property({ type: Boolean, reflect: true })
	expanded: boolean = false;

	#description = createRef<HTMLDivElement>();
	#icon = createRef<HTMLDivElement>();
	#measure = createRef<HTMLDivElement>();

	render() {
		let measureHeight = this.#measure.value?.clientHeight ?? NaN;

		return html`
			<div class="header">
				<div class="disclosure-icon ${this.expanded ? 'rotated' : ''}" ${ref(this.#icon)}>
					<slot name="disclosure-icon"></slot>
				</div>
				<div class="name" @click="${this.#toggle}"><slot name="name"></slot></div>
				<div class="rank"><slot name="rank"></slot></div>
				<div class="actions"><slot name="actions"></slot></div>
			</div>
			<div
				class="description-container ${this.expanded ? '' : 'collapsed'}"
				style="height: ${this.expanded
					? isNaN(measureHeight)
						? 'auto'
						: `${measureHeight}px`
					: '0px'}"
				${ref(this.#description)}
			>
				<div class="measure" ${ref(this.#measure)}><slot name="description"></slot></div>
			</div>
		`;
	}

	protected firstUpdated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);

		const visibilityObserver = new IntersectionObserver(
			() => {
				const height = this.#measure.value?.clientHeight;

				if (
					height !== undefined &&
					height > 0 &&
					this.#description.value!.style.height === 'auto'
				) {
					this.#description.value!.style.height = `${height}px`;
					visibilityObserver.disconnect();
				}
			},
			{
				root: this,
			},
		);

		visibilityObserver.observe(this.#measure.value!);
	}

	#toggle() {
		const expanded = !this.expanded;

		if (expanded) {
			this.#description.value?.classList.remove('collapsed');
			this.#icon.value?.classList.remove('rotated');
			this.#description.value!.style.height = `${this.#measure.value!.clientHeight}px`;
		} else {
			this.#description.value?.classList.add('collapsed');
			this.#icon.value?.classList.add('rotated');
			this.#description.value!.style.height = '0px';
		}

		this.expanded = expanded;

		const event = new ToggleCollapseEvent(!expanded, { bubbles: true, cancelable: false });
		this.dispatchEvent(event);
	}
}

export class ToggleCollapseEvent extends Event {
	collapsed: boolean;

	constructor(collapsed: boolean, options: EventInit) {
		super('toggleCollapse', options);

		this.collapsed = collapsed;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'talent-disclosure': TalentDisclosureElement;
	}
}
