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
 * Register all custom dice settings.
 */
export function register() {
	CONFIG.Dice.terms[CombatDie.DENOMINATION] = CombatDie;
	CONFIG.Dice.types.push(CombatDie);
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

		// Calculate the number of Effects rolled on any combat dice in the roll.
		const effects = rolls.reduce((total, roll) => {
			let effectsInRoll = 0;

			roll.terms.forEach((term) => {
				if (term instanceof CombatDie) {
					hasCombatDice = true;
					effectsInRoll += (<CombatDie>term).rolledEffects ?? 0;
				}
			});

			return total + effectsInRoll;
		}, 0);

		// Nothing to do if no Combat Dice terms were found, or if no Effects were even rolled.
		if (!hasCombatDice) {
			return;
		}

		// Inject the number of Effects into the message.
		const total = element.querySelector<HTMLHeadingElement>('.dice-total');
		if (!total) {
			return;
		}

		const value = total.innerText;
		total.innerText = game.i18n.format('Infinity.Chat.Rolls.WithEffects', {
			total: value,
			effects,
			plural: effects !== 1 ? 's' : '',
		});
	},
);
