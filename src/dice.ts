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
