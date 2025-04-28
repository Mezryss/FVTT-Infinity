import { MomentumTracker } from '@/apps/momentum-tracker';

// Open (render) any auto-open Apps.
Hooks.once('ready', () => {
	MomentumTracker.instance.render({ force: true });
});
