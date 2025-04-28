import { register as registerTextEnrichers } from '@/text-enrichers';

import '@/styles/main.css';

Hooks.once('init', () => {
	console.log('Infinity | Init');

	registerTextEnrichers();

	console.log('Infinity | Init Complete');
});
