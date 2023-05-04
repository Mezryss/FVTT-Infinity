import InfinityActor from './actor/InfinityActor';
import InfinityItem from './item/InfinityItem';

declare global {
	const ui: FoundryUI;
	const canvas: Canvas;

	const CONFIG: Config<
		AmbientLightDocument,
		ActiveEffect,
		// Custom Actor Typing
		InfinityActor,
		// Actor Directory
		ActorDirectory<InfinityActor>,
		// idc about the rest of this.
		ChatLog,
		ChatMessage,
		Combat,
		Combatant,
		CombatTracker,
		CompendiumDirectory,
		Hotbar,
		// Custom Item Typing
		InfinityItem
	>;

	const game: Game<InfinityActor, Actors, ChatMessage, Combat, InfinityItem>;
}
