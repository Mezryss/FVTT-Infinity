/**
 * Damage Types.
 */
enum DamageType {
	Mental = 'Mental',
	Physical = 'Physical',
	Quantronic = 'Quantronic',
}

namespace DamageType {
	/**
	 * Convenience accessor for all damage types.
	 */
	export const all: DamageType[] = [DamageType.Mental, DamageType.Physical, DamageType.Quantronic];
}

export default DamageType;
