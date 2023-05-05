/**
 * Augmentation Types
 */
export enum AugmentationType {
	Implant = 'Implant',
	LargeImplant = 'LargeImplant',
	Replacement = 'Replacement',
	FullBody = 'FullBody',
}

export namespace AugmentationType {
	/**
	 * Convenience accessor for all Augmentation types.
	 */
	export const all: AugmentationType[] = [AugmentationType.Implant, AugmentationType.LargeImplant, AugmentationType.Replacement, AugmentationType.FullBody];

	/**
	 * Some augmentations require specifying where (whether it's an organ or hit location) it is installed.
	 *
	 * @param type Augmentation Type to check.
	 * @returns `true` if location is required.
	 */
	export function requiresLocation(type: AugmentationType): boolean {
		return [AugmentationType.LargeImplant, AugmentationType.Replacement].includes(type);
	}
}

/**
 * Augmentation Categories
 */
export enum AugmentationCategory {
	Cybernetic = 'Cybernetic',
	Biograft = 'Biograft',
	Silk = 'Silk',
}

export namespace AugmentationCategory {
	/**
	 * Convenience accessor for all Augmentation categories.
	 */
	export const all: AugmentationCategory[] = [AugmentationCategory.Cybernetic, AugmentationCategory.Biograft, AugmentationCategory.Silk];
}
