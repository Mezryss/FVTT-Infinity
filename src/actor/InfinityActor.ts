import IHasPreCreate from '@/dataModel/IHasPreCreate';

/**
 * Base class for system Actors.
 *
 * Though written as an abstract class, this is more for the value of providing overridden type data where needed for BaseActor class properties
 * without a significant rewrite of the type data borrowed from the PF2E folks.
 */
export default abstract class InfinityActor<
	DataModelType extends foundry.abstract.DataModel = foundry.abstract.DataModel,
> extends Actor {
	/**
	 * Overrides the BaseActor.system property without actually defining it as a property in the resulting JavaScript source, giving us strong typing.
	 */
	abstract override get system(): DataModelType;

	/**
	 * Override the _preCreate callback to call preCreate from the data model class, if present.
	 * @inheritDoc
	 */
	protected override async _preCreate(
		data: PreDocumentId<this['_source']>,
		options: DocumentModificationContext<this>,
		user: User,
	) {
		await (this.system as IHasPreCreate<this>).preCreate?.(
			this,
			data,
			options,
			user,
		);

		return super._preCreate(data, options, user);
	}
}
