/**
 * Character defenses.
 */
enum Defence {
	Firewall = 'Firewall',
	Security = 'Security',
	Resolve = 'Resolve',
	Morale = 'Morale',
	Vigour = 'Vigour',
	Armour = 'Armour',
}

namespace Defence {
	/**
	 * Convenience accessor for all character defences.
	 */
	export const all: Defence[] = [Defence.Firewall, Defence.Security, Defence.Resolve, Defence.Morale, Defence.Vigour, Defence.Armour];
}

export default Defence;
