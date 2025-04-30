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
 * Custom Modifier for Infinity rolls. Combines success count, focus, and complications into a single modifier.
 *
 * Xd20inf:tTN:fFoc:cComp
 * 	- TN = Target Number (roll <= for Success)
 *  - Foc = Focus (roll <= for +1 Success)
 *  - Comp = Complication (roll >= for +1 Complication)
 */
function infinityModifier(this: foundry.dice.terms.Die, modifier: string) {
	const regexp = /(?:inf)\.(?<target_number>\d+)(\.(?<focus>\d+))?(\.(?<complication>\d+))?/i;
	const match = modifier.match(regexp);
	if (!match?.groups) {
		return false;
	}

	// Capture the various number thresholds
	let target_number = +match.groups['target_number'];
	let focus = +match.groups['focus'];
	let complication = +match.groups['complication'];

	// Set default values for unspecified thresholds.
	if (isNaN(target_number)) {
		target_number = 1;
	}
	if (isNaN(focus)) {
		focus = 1;
	}
	if (isNaN(complication)) {
		complication = 20;
	}

	// Cycle through the results and process their values.
	for (const result of this.results) {
		const roll = result.result;

		// If the result is less than the Focus value, it's 2 Successes.
		if (roll <= focus) {
			result.success = true;
			delete result.failure;
			result.count = 2;
		} else if (roll <= target_number) {
			result.success = true;
			delete result.failure;
			result.count = 1;
		} else {
			result.count = 0;
		}

		// Even if it's a success, Complications count!
		if (roll >= complication) {
			// In the unlikely event that a result is both successful and a complication, values are high enough that we mainly want to flag which ones were complications (because the others are also likely successes).
			// More likely than not somebody's trying to be goofy.
			delete result.success;

			Object.assign(result, {
				complication: true,
				failure: true,
			});
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
		inf: infinityModifier,
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
