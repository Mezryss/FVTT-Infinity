/**
 * Interface for a DataModel class that has a preCreate method to be called on document creation.
 */
export default interface IHasPreCreate<
	DocumentType extends foundry.abstract.Document,
> {
	/**
	 * Callback used when the document associated with this data model is created.
	 */
	preCreate?(
		document: DocumentType,
		data: PreDocumentId<any>,
		options: DocumentModificationContext<DocumentType>,
		user: foundry.documents.BaseUser,
	): Promise<void>;
}
