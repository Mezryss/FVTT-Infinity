export const SETTINGS_NAMESPACE = 'infinity';

import { register as registerMomentumTracker } from './momentumTracker';

export function register() {
	registerMomentumTracker(SETTINGS_NAMESPACE);
}
