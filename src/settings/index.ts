import { register as registerMomentum } from './momentum';

export const SETTINGS_NAMESPACE = 'infinity';

/**
 * Register all System Settings.
 */
export function register() {
	registerMomentum(SETTINGS_NAMESPACE);
}
