import { InfinityActor } from '@/actors/infinity-actor';
import { register as registerModels } from '@/actors/models';
import { register as registerSheets } from '@/actors/sheets';

/**
 * Registers all Actor classes (sheets, data models, base class, etc.)
 */
export function register() {
	CONFIG.Actor.documentClass = InfinityActor;

	registerModels();
	registerSheets();
}

/**
 * Actor Types. Keep in sync with public/system.json
 */
export enum ActorType {
	Player = 'player',
	Adversary = 'adversary',
	Geist = 'geist',
	Remote = 'remote',
	Vehicle = 'vehicle',
}
