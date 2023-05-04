/**
 * Armour Types.
 */
enum ArmourType {
	Civilian = 'Civilian',
	Combat = 'Combat',
	Internal = 'Internal',
	Powered = 'Powered',
	// Symbiont armours behave differently from human armours.
	Symbiont = 'Symbiont',
}

namespace ArmourType {
	/**
	 * Convenience accessor for all Armour types.
	 */
	export const all: ArmourType[] = [ArmourType.Civilian, ArmourType.Combat, ArmourType.Internal, ArmourType.Powered, ArmourType.Symbiont];
}

export default ArmourType;
