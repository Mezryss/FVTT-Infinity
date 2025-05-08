//#region General Gear

/**
 * Gear. CRB, pp.328–397
 */
export enum GearType {
	/**
	 * Ammunition. CRB, p.339
	 */
	Ammunition = 'ammunition',

	/**
	 * Armour. CRB, p.341
	 */
	Armour = 'armour',

	/**
	 * Augmentations. CRB, p.344
	 */
	Augmentation = 'augmentation',

	/**
	 * Contagions. CRB, p.347
	 */
	Contagion = 'contagion',

	/**
	 * Explosive Devices. CRB, p.349
	 */
	ExplosiveDevice = 'explosiveDevice',

	/**
	 * Hacking Devices. CRB, p.352
	 */
	HackingDevice = 'hackingDevice',

	/**
	 * Resources. CRB, p.355
	 */
	Resource = 'resource',

	/**
	 * Tools. CRB, p.357
	 */
	Tool = 'tool',

	/**
	 * Weapons. CRB, p.358
	 */
	Weapon = 'weapon',

	/**
	 * Other Items. CRB, p.360
	 */
	Other = 'other',
}

/**
 * List of all Gear Types.
 */
export const ALL_GEAR_TYPES: GearType[] = [
	GearType.Ammunition,
	GearType.Armour,
	GearType.Augmentation,
	GearType.Contagion,
	GearType.ExplosiveDevice,
	GearType.HackingDevice,
	GearType.Resource,
	GearType.Tool,
	GearType.Weapon,
	GearType.Other,
];

/**
 * Construct labeled gear type data for Handlebars.
 */
function labeledGear(type: GearType) {
	return {
		key: type,
		label: `Infinity.GearTypes.${type}`,
	};
}

/**
 * Labeled gear types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_GEAR_TYPES = ALL_GEAR_TYPES.map(labeledGear);

//#endregion General Gear

//#region Ammunition

/**
 * Ammunition Categories. CRB, p.339
 */
export enum AmmunitionCategory {
	Standard = 'standard',
	Special = 'special',
	Heavy = 'heavy',
	Arrow = 'arrow',
	Shell = 'shell',
}

/**
 * List of all Ammunition Categories.
 */
export const ALL_AMMUNITION_CATEGORIES: AmmunitionCategory[] = [
	AmmunitionCategory.Arrow,
	AmmunitionCategory.Heavy,
	AmmunitionCategory.Shell,
	AmmunitionCategory.Special,
	AmmunitionCategory.Standard,
];

/**
 * Construct labeled ammunition category data for Handlebars.
 */
function labeledAmmunitionCategory(category: AmmunitionCategory) {
	return {
		key: category,
		label: `Infinity.AmmunitionCategories.${category}`,
	};
}

/**
 * Labeled ammunition categories, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_AMMUNITION_CATEGORIES =
	ALL_AMMUNITION_CATEGORIES.map(labeledAmmunitionCategory);

//#endregion Ammunition

//#region Armour

/**
 * Armour Types. CRB, p.342
 */
export enum ArmourType {
	Civilian = 'civilian',
	Combat = 'combat',
	Internal = 'internal',
	Powered = 'powered',
}

/**
 * List of all Armour Types.
 */
export const ALL_ARMOUR_TYPES: ArmourType[] = [
	ArmourType.Civilian,
	ArmourType.Combat,
	ArmourType.Internal,
	ArmourType.Powered,
];

/**
 * Construct labeled armour type data for Handlebars.
 */
function labeledArmourType(type: ArmourType) {
	return {
		key: type,
		label: `Infinity.ArmourTypes.${type}`,
	};
}

/**
 * Labeled armour types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_ARMOUR_TYPES = ALL_ARMOUR_TYPES.map(labeledArmourType);

//#endregion

//#region Augmentation

/**
 * Augmentation Types. CRB, p.344
 */
export enum AugmentationType {
	Implant = 'implant',
	LargeImplant = 'largeImplant',
	Replacement = 'replacement',
	FullBody = 'fullBody',
}

/**
 * Augmentation Categories. CRB, p.344
 */
export enum AugmentationCategory {
	Cybernetics = 'cybernetics',
	Biografting = 'biografting',
	Silk = 'silk',
}

/**
 * List of all Augmentation Types.
 */
export const ALL_AUGMENTATION_TYPES: AugmentationType[] = [
	AugmentationType.Implant,
	AugmentationType.LargeImplant,
	AugmentationType.Replacement,
	AugmentationType.FullBody,
];

/**
 * List of all Augmentation Categories.
 */
export const ALL_AUGMENTATION_CATEGORIES: AugmentationCategory[] = [
	AugmentationCategory.Cybernetics,
	AugmentationCategory.Biografting,
	AugmentationCategory.Silk,
];

/**
 * Construct labeled augmentation type data for Handlebars.
 */
function labeledAugmentationType(type: AugmentationType) {
	return {
		key: type,
		label: `Infinity.AugmentationTypes.${type}`,
	};
}

/**
 * Construct labeled augmentation category data for Handlebars.
 */
function labeledAugmentationCategory(category: AugmentationCategory) {
	return {
		key: category,
		label: `Infinity.AugmentationCategories.${category}`,
	};
}

/**
 * Labeled augmentation types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_AUGMENTATION_TYPES = ALL_AUGMENTATION_TYPES.map(labeledAugmentationType);

/**
 * Labeled augmentation categories, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_AUGMENTATION_CATEGORIES = ALL_AUGMENTATION_CATEGORIES.map(
	labeledAugmentationCategory,
);

//#endregion
