import { AbilityItemSheet } from './ability';
import { ContagionItemSheet } from './contagion';
import { GearItemSheet } from './gear';
import { HostItemSheet } from './host';
import { QualityItemSheet } from './quality';
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

	Items.registerSheet('infinity', ContagionItemSheet, {
		types: ['contagion'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', GearItemSheet, {
		types: ['gear'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', HostItemSheet, {
		types: ['host'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', QualityItemSheet, {
		types: ['quality'],
		makeDefault: true,
	});

	Items.registerSheet('infinity', TalentItemSheet, {
		types: ['talent'],
		makeDefault: true,
	});
}
