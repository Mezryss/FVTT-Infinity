import { AbilityItemSheet } from './ability';
import { TalentItemSheet } from './talent';

/**
 * Register Item Sheets
 */
export function register() {
	const { Items } = foundry.documents.collections;
	const { ItemSheet } = foundry.appv1.sheets;

	Items.unregisterSheet('core', ItemSheet);

	Items.registerSheet('infinity', AbilityItemSheet, {
		types: ['ability'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', TalentItemSheet, {
		types: ['talent'],
		makeDefault: true,
	});
}
