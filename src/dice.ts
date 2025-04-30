const { Die, DiceTerm } = foundry.dice.terms;

/**
 * DiceTerm constructor params.
 */
interface DiceTermOptions {
	number?: number | foundry.dice.Roll;
	faces?: number | foundry.dice.Roll;
	method: string;
	modifiers?: string[];
	results?: foundry.dice.DiceTermResult[];
	options?: object;
}

/**
 * Dice Term for Infinity's Combat Die.
 *
 * 1 = 1, 2 = 2, 3-5 = 0, 6 = 1 + Effect
 */
export class CombatDie extends DiceTerm {
	/** @inheritdoc */
	static override DENOMINATION = 'n';

	/** @inheritdoc */
	static override MODIFIERS = Die.MODIFIERS;

	constructor(termData: DiceTermOptions) {
		termData.faces = 6;

		super(termData);
	}

	/**
	 * Calculate the number of Effect results from this term.
	 */
	get rolledEffects(): number | undefined {
		if (!this._evaluated) {
			return undefined;
		}

		return this.results.reduce((t, r) => {
			if (!r.active) {
				return t;
			}

			if (r.count !== undefined) {
				return t + r.count;
			}

			if (r.result === 6) {
				return t + 1;
			}

			return t;
		}, 0);
	}

	/** @inheritdoc */
	override get total(): number | undefined {
		if (!this._evaluated) {
			return undefined;
		}

		return this.results.reduce((t, r) => {
			if (!r.active) {
				return t;
			}

			if (r.count !== undefined) {
				return t + r.count;
			}

			if (r.result === 6) {
				return t + 1;
			}

			return t + r.result;
		}, 0);
	}

	/** @inheritdoc */
	override mapRandomFace(randomUniform: number): number {
		// Random face between 1–6 (inclusive)
		const face = Math.floor(randomUniform * <number>this.faces) + 1;

		// 1 & 2 count as their respective value.
		if (face <= 2) {
			return face;
		}
		// 3–5 are ignored
		if (face < 6) {
			return 0;
		}

		// 6 is 1 + Effect
		return face;
	}

	/** @inheritdoc */
	getResultLabel(result: foundry.dice.DiceTermResult): string {
		const res = result.result;

		if (res < 6) {
			return res.toString();
		} else {
			return 'N';
		}
	}

	/** @inheritdoc */
	getResultCSS(result: foundry.dice.DiceTermResult): (string | null)[] {
		const res = result.result;
		const classes = ['font-orbitron'];

		switch (res) {
			case 0:
				classes.push('combat-die-zero');
				break;

			case 6:
				classes.push('max');
				break;
		}

		return classes;
	}
}

/**
 * Handler for Complication Range modifier for dice rolls.
 *
 * 2d20comp			Rolls of 20 count as a Complication.
 * 2d20comp>18		Rolls of 19–20 count as a Complication
 * 2d20comp>=18		Rolls of 18–20 count as a Complication
 */
function diceComplications(this: foundry.dice.terms.Die, modifier: string) {
	const regexp = /(?:comp)([<>=]+)?([0-9]+)?/i;
	const match = modifier.match(regexp);
	if (!match) {
		return false;
	}

	// Yes ESLint, I know that targetStr isn't mutated. 😒
	// eslint-disable-next-line
	let [comparison, targetStr] = match.slice(1);
	comparison = comparison || '=';
	let target = +targetStr;

	if (isNaN(target)) {
		target = 1;
	}

	// Cycle through results and add to (or modify!) their success value.
	for (const result of this.results) {
		const complication = DiceTerm.compareResult(result.result, comparison, target);

		Object.assign(result, { complication });
	}
}

/**
 * Handler for a Focus Range modifier for dice rolls. Requires a countSuccess modifier to have already been applied.
 *
 * 2d20foc		Rolls of 1 count as an extra success.
 * 2d20foc<5	Rolls of 1–4 count as an extra success.
 * 2d20foc<=5	Rolls of 1–5 count as an extra success.
 *
 * Core of this method is copied from Foundry's existing countSuccess modifier.
 */
function diceFocus(this: foundry.dice.terms.Die, modifier: string) {
	const regexp = /(?:foc)([<>=]+)?([0-9]+)?/i;
	const match = modifier.match(regexp);
	if (!match) {
		return false;
	}

	// Yes ESLint, I know that targetStr isn't mutated. 😒
	// eslint-disable-next-line
	let [comparison, targetStr] = match.slice(1);
	comparison = comparison || '=';
	let target = +targetStr;

	if (isNaN(target)) {
		target = 1;
	}

	// Cycle through results and add to (or modify!) their success value.
	for (const result of this.results) {
		if (DiceTerm.compareResult(result.result, comparison, target)) {
			if (result.count === undefined) {
				ui.notifications.warn(
					game.i18n.localize('Infinity.Chat.Rolls.InvalidFocusModifier'),
				);
				result.success = true;
				delete result.failure;

				// Practically speaking, it should never happen that focus is higher than the combined Target Number, but...
				result.count = 2;
			} else {
				// Just in case somehow we got a count already, but it was treated as a failure..
				result.count = 2;
				result.success = true;
				delete result.failure;
			}
		} else if (result.count === undefined) {
			ui.notifications.warn(game.i18n.localize('Infinity.Chat.Rolls.InvalidFocusModifier'));
			result.failure = true;
			delete result.success;
			result.count = 0;
		}
	}
}

/**
 * Register all custom dice settings.
 */
export function register() {
	CONFIG.Dice.terms[CombatDie.DENOMINATION] = CombatDie;
	CONFIG.Dice.types.push(CombatDie);

	Object.assign(Die.MODIFIERS, {
		comp: diceComplications,
		foc: diceFocus,
	});
}

/**
 * Intercept rendered chat messages to inject number of Effects into output for Combat Dice rolls.
 */
Hooks.on(
	'renderChatMessageHTML',
	(
		message: foundry.documents.ChatMessage,
		element: HTMLElement,
		_data: foundry.documents.types.ChatMessageData,
	) => {
		const rolls = message.rolls as foundry.dice.Roll[];
		let hasCombatDice = false;
		let effects = 0;

		let complications = 0;

		// Loop over every roll & its terms to find Complications & Effects.
		for (const roll of rolls) {
			roll.terms.forEach((term) => {
				if (term instanceof CombatDie) {
					hasCombatDice = true;
					effects += (<CombatDie>term).rolledEffects ?? 0;
				}

				if (term instanceof DiceTerm) {
					complications += term.results.reduce((total, term) => {
						if ((term as any).complication) {
							return total + 1;
						} else {
							return total;
						}
					}, 0);
				}
			});
		}

		const total = element.querySelector<HTMLHeadingElement>('.dice-total');
		if (!total) {
			return;
		}
		const rollTotal = total.innerText;

		// Inject Effects count for combat dice
		if (hasCombatDice) {
			const plurality = effects !== 1 ? 'Plural' : 'Singular';

			total.innerText = game.i18n.format(`Infinity.Chat.Rolls.WithEffects.${plurality}`, {
				total: rollTotal,
				effects,
			});
		}

		if (complications) {
			const plurality = complications !== 1 ? 'Plural' : 'Singular';

			total.innerText = game.i18n.format(
				`Infinity.Chat.Rolls.WithComplications.${plurality}`,
				{
					total: rollTotal,
					complications,
				},
			);
		}
	},
);
