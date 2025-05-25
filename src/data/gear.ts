import { labeledEnum } from './utility';

//#region General Gear

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
 * Equipped State.
 */
export enum EquipState {
	Equipped = 'equipped',
	Carried = 'carried',
	Dropped = 'dropped',
}

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
 * List of all Equip States.
 */
export const ALL_EQUIP_STATES: EquipState[] = [
	EquipState.Equipped,
	EquipState.Carried,
	EquipState.Dropped,
];

/**
 * Labeled item sizes, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_ITEM_SIZES = ALL_ITEM_SIZES.map((s) => labeledEnum('ItemSizes', s));

/**
 * Sort order based on equipped state.
 */
export const EQUIP_STATE_SORT_VALUE: Record<EquipState, number> = {
	[EquipState.Equipped]: -1,
	[EquipState.Carried]: 0,
	[EquipState.Dropped]: 1,
};

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
 * Labeled ammunition categories, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_AMMUNITION_CATEGORIES = ALL_AMMUNITION_CATEGORIES.map((c) =>
	labeledEnum('AmmunitionCategories', c),
);

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
 * Labeled armour types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_ARMOUR_TYPES = ALL_ARMOUR_TYPES.map((t) => labeledEnum('ArmourTypes', t));

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
 * Labeled augmentation types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_AUGMENTATION_TYPES = ALL_AUGMENTATION_TYPES.map((t) =>
	labeledEnum('AugmentationTypes', t),
);

/**
 * Labeled augmentation categories, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_AUGMENTATION_CATEGORIES = ALL_AUGMENTATION_CATEGORIES.map((c) =>
	labeledEnum('AugmentationCategories', c),
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
 * Labeled explosive categories, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_EXPLOSIVE_CATEGORIES = ALL_EXPLOSIVE_CATEGORIES.map((c) =>
	labeledEnum('ExplosiveCategories', c),
);

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
 * Labeled program types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_PROGRAM_TYPES = ALL_PROGRAM_TYPES.map((t) => labeledEnum('ProgramTypes', t));

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
 * Labeled Weapon Types, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_WEAPON_TYPES = ALL_WEAPON_TYPES.map((t) => labeledEnum('WeaponTypes', t));

//#endregion

//#region Lifestyles

/**
 * Social Classes. CRB, p.387
 */
export enum LifestyleRating {
	Underclass = 'underclass',
	Demogrant = 'demogrant',
	Middle = 'middle',
	Upper = 'upper',
	Elite = 'elite',
	HyperElite = 'hyperElite',
}

/**
 * List of all Lifestyle Ratings.
 */
export const ALL_LIFESTYLE_RATINGS: LifestyleRating[] = [
	LifestyleRating.Underclass,
	LifestyleRating.Demogrant,
	LifestyleRating.Middle,
	LifestyleRating.Upper,
	LifestyleRating.Elite,
	LifestyleRating.HyperElite,
];

/**
 * Labeled Lifestyle Ratings, ready for passing to selectOptions helper in Handlebars.
 */
export const LABELED_LIFESTYLE_RATINGS = ALL_LIFESTYLE_RATINGS.map((t) =>
	labeledEnum('LifestyleRating', t),
);

//#endregion
