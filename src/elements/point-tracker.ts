import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('point-tracker')
export class PointTrackerElement extends LitElement {
	static formAssociated = true;

	@property({ type: Boolean, reflect: true })
	disabled?: boolean = false;

	@property({ type: String, reflect: true })
	name?: string = '';

	@property({ type: Number, reflect: true })
	max?: number = 5;

	@property({ type: Number, reflect: true })
	value?: number = 0;

	@property({ type: Number })
	columns?: number = 5;

	#internals = this.attachInternals();

	static styles = css`
		:host {
			height: 100%;
		}

		.container {
			display: grid;
			gap: 2px;
			height: 100%;
		}

		.box {
			display: flex;
			padding: 2px;
			background: white;
			color: black;
			cursor: pointer;

			div {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 1rem;
				opacity: 0%;
				transition: opacity 0.25s ease-in-out;
				background: #1c3156;

				&.active {
					opacity: 100%;
				}

				&.hover {
					opacity: 50%;
				}
			}
		}
	`;

	render() {
		this.#internals.setFormValue(`${this.value ?? '0'}`);

		let numBoxes = 1;
		if (this.max && this.max > 0) {
			numBoxes = this.max;
		}

		const boxes: TemplateResult[] = [];

		for (let i = 0; i < numBoxes; i++) {
			boxes.push(html`
				<div class="box">
					<div
						@click="${this.#click}"
						@mouseenter="${this.#mouseEnter}"
						@mouseleave="${this.#mouseLeave}"
						class="${i < (this.value ?? 0) ? 'active' : ''}"
						data-value="${i + 1}"
					></div>
				</div>
			`);
		}

		return html`
			<div class="container" style="grid-template-columns: repeat(${this.columns}, 1fr);">
				${boxes}
			</div>
		`;
	}

	#click(event: PointerEvent) {
		if (this.disabled) {
			return;
		}

		const target = event.target as HTMLElement;
		const value = +(target.dataset['value'] ?? '');

		if (isNaN(value)) {
			return;
		}

		if (value === this.value) {
			this.value = 0;
			this.#internals.setFormValue('0');
		} else {
			this.value = value;
			this.#internals.setFormValue(`${value}`);
		}

		const changeEvent = new Event('change', { bubbles: true, composed: true });
		this.dispatchEvent(changeEvent);
	}

	#mouseEnter(event: MouseEvent) {
		if (this.disabled) {
			return;
		}

		const target = event.target as HTMLElement;
		target.classList.add('hover');
	}

	#mouseLeave(event: MouseEvent) {
		if (this.disabled) {
			return;
		}

		const target = event.target as HTMLElement;
		target.classList.remove('hover');
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'point-tracker': PointTrackerElement;
	}
}
