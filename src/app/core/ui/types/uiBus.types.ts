import { EventBus } from "@root/app/common/utils/eventBus/eventBus";

type TUiBusEvents = "toggleEditorMenuIsOpen" | "closeFocusedUi"

/**
 * A bus to enable communication with the UI.
 */
export type TUiBus = EventBus<TUiBusEvents>