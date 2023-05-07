/**
 * Interface for a DataModel class that has a prepareDerivedData method to be called from the actor.
 */
export default interface IHasDerivedData<DocumentType extends foundry.abstract.Document> {
	/**
	 * Callback used for calculating derived data.
	 */
	prepareDerivedData?(document: DocumentType): void;
}
