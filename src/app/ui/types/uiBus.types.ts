import { EventBus } from "@root/app/domains/eventBus/utils/eventBus/eventBus";

type TUiBusEvents = (
	"escape" |
	"interactWithEditorBar" |
	"selectEnvironmentItemVariant" |
	"stopDraggingEntity" |
	"toggleEditorBarIsOpen" |
	"startDraggingEntity"
)

/**
 * A bus that enables communication between various parts of the game and the UI.
 */
export type TUiBus = EventBus<TUiBusEvents>