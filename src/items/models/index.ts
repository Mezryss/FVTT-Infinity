import { AbilityDataModel } from '@/items/models/ability.ts';
import { AmmunitionDataModel } from '@/items/models/ammunition.ts';
import { ArmourDataModel } from '@/items/models/armour.ts';
import { AugmentationDataModel } from '@/items/models/augmentation.ts';
import { ContagionDataModel } from '@/items/models/contagion.ts';
import { ExplosiveDeviceDataModel } from '@/items/models/explosive-device.ts';
import { FakeIDDataModel } from '@/items/models/fake-id.ts';
import { GearDataModel } from '@/items/models/gear.ts';
import { HackingDeviceDataModel } from '@/items/models/hacking-device.ts';
import { HostDataModel } from '@/items/models/host.ts';
import { LifestyleDataModel } from '@/items/models/lifestyle.ts';
import { ProgramDataModel } from '@/items/models/program.ts';
import { QualityDataModel } from '@/items/models/quality.ts';
import { TalentDataModel } from '@/items/models/talent.ts';
import { WeaponDataModel } from '@/items/models/weapon.ts';

/**
 * Register Item Data Models
 */
export function register() {
	Object.assign(CONFIG.Item.dataModels, {
		ability: AbilityDataModel,
		ammunition: AmmunitionDataModel,
		armour: ArmourDataModel,
		augmentation: AugmentationDataModel,
		contagion: ContagionDataModel,
		drug: GearDataModel,
		explosiveDevice: ExplosiveDeviceDataModel,
		fakeID: FakeIDDataModel,
		hackingDevice: HackingDeviceDataModel,
		host: HostDataModel,
		lifestyle: LifestyleDataModel,
		other: GearDataModel,
		program: ProgramDataModel,
		quality: QualityDataModel,
		resource: GearDataModel,
		talent: TalentDataModel,
		tool: GearDataModel,
		weapon: WeaponDataModel,
	});
}
