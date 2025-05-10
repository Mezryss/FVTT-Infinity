import { labeledEnum } from './utility';

/**
 * Contagions. CRB, p.347
 */
export enum ContagionType {
	Instant = 'instant',
	Complex = 'complex',
	Progressive = 'progressive',
}

/**
 * A list of all contagion types.
 */
export const ALL_CONTAGION_TYPES = [
	ContagionType.Instant,
	ContagionType.Complex,
	ContagionType.Progressive,
];

/**
 * Labeled list of contagion types, ready for use in Handlebars selectOptions helper
 */
export const LABELED_CONTAGION_TYPES = ALL_CONTAGION_TYPES.map((t) =>
	labeledEnum('ContagionTypes', t),
);
