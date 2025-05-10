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
	 * Drugs. CRB, p.348
	 *
	 * Covers Drugs & Poisons. These fall under "Contagions", but those will use a different Item type.
	 */
	Drug = 'drug',

	/**
	 * Explosive Devices. CRB, p.349
	 */
	ExplosiveDevice = 'explosiveDevice',

	/**
	 * Hacking Devices. CRB, p.352
	 */
	HackingDevice = 'hackingDevice',

	/**
	 * Hacking Devices. CRB, p.352
	 */
	Program = 'program',

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
 * Item Sizes. CRB, p.332
 */
export enum ItemSize {
	Negligible = 'negligible',
	OneHanded = 'oneHanded',
	TwoHanded = 'twoHanded',
	Unbalanced = 'unbalanced',
	Unwieldy = 'unwieldy',
	Mounted = 'mounted',
	Massive = 'massive',
	Facility = 'facility',
}

/**
 * List of all Gear Types.
 */
export const ALL_GEAR_TYPES: GearType[] = [
	GearType.Ammunition,
	GearType.Armour,
	GearType.Augmentation,
	GearType.Drug,
	GearType.ExplosiveDevice,
	GearType.HackingDevice,
	GearType.Program,
	GearType.Resource,
	GearType.Tool,
	GearType.Weapon,
	GearType.Other,
];

/**
 * List of all Item Sizes.
 */
export const ALL_ITEM_SIZES: ItemSize[] = [
	ItemSize.Negligible,
	ItemSize.OneHanded,
	ItemSize.TwoHanded,
	ItemSize.Unbalanced,
	ItemSize.Unwieldy,
	ItemSize.Mounted,
	ItemSize.Massive,
	ItemSize.Facility,
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
 * Construct labeled item size data for Handlebars.
 */
function labeledItemSize(size: ItemSize) {
	return {
		key: size,
		label: `Infinity.ItemSizes.${size}`,
	};
}

/**
 * Labeled gear types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_GEAR_TYPES = ALL_GEAR_TYPES.map(labeledGear);

/**
 * Labeled item sizes, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_ITEM_SIZES = ALL_ITEM_SIZES.map(labeledItemSize);

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

//#region Augmentations

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

//#region Explosive Devices

/**
 * Explosive Categories. CRB, p.349
 */
export enum ExplosiveCategory {
	Charges = 'charges',
	Grenades = 'grenades',
	Mines = 'mines',
}

/**
 * List of all Explosive Categories.
 */
export const ALL_EXPLOSIVE_CATEGORIES: ExplosiveCategory[] = [
	ExplosiveCategory.Charges,
	ExplosiveCategory.Grenades,
	ExplosiveCategory.Mines,
];

/**
 * Construct labeled explosive category data for Handlebars.
 */
function labeledExplosiveCategory(category: ExplosiveCategory) {
	return {
		key: category,
		label: `Infinity.ExplosiveCategories.${category}`,
	};
}

/**
 * Labeled explosive categories, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_EXPLOSIVE_CATEGORIES = ALL_EXPLOSIVE_CATEGORIES.map(labeledExplosiveCategory);

//#endregion

//#region Hacking Devices

/**
 * Program Types. CRB, p.352
 */
export enum ProgramType {
	SWORD = 'sword',
	CLAW = 'claw',
	SHIELD = 'shield',
	GADGET = 'gadget',
	IC = 'ic',
	UPGRADE = 'upgrade',
}

/**
 * A list of all Program Types.
 */
export const ALL_PROGRAM_TYPES: ProgramType[] = [
	ProgramType.CLAW,
	ProgramType.GADGET,
	ProgramType.IC,
	ProgramType.SHIELD,
	ProgramType.SWORD,
	ProgramType.UPGRADE,
];

/**
 * Construct labeled program type data for Handlebars.
 */
function labeledProgramType(type: ProgramType) {
	return {
		key: type,
		label: `Infinity.ProgramTypes.${type}`,
	};
}

/**
 * Labeled program types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_PROGRAM_TYPES = ALL_PROGRAM_TYPES.map(labeledProgramType);

//#endregion

//#region Weapons

/**
 * Weapons. CRB, p.358
 */
export enum WeaponType {
	Melee = 'melee',
	Ranged = 'ranged',
}

/**
 * List of all Weapon Types.
 */
export const ALL_WEAPON_TYPES: WeaponType[] = [WeaponType.Melee, WeaponType.Ranged];

/**
 * Construct labeled weapon type data for Handlebars.
 */
function labeledWeaponType(type: WeaponType) {
	return {
		key: type,
		label: `Infinity.WeaponTypes.${type}`,
	};
}

/**
 * Labeled Weapon Types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_WEAPON_TYPES = ALL_WEAPON_TYPES.map(labeledWeaponType);

//#endregion
