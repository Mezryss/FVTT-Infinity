import '../foundry/client/global.d.mts';

declare global {
	const Hooks = foundry.helpers.Hooks;

	async function fromUuid<
		DocumentType extends foundry.abstract.Document = foundry.abstract.Document,
	>(uuid: string, options?: {
		relative?: foundry.abstract.Document,
		invalid?: boolean,
	}): Promise<DocumentType|null>;
}
