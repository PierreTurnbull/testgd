import { EventBus } from "@root/app/common/utils/eventBus/eventBus";

type TUiBusEvents = [
	/**
	 * Open or close the editor menu.
	 */
	{
		key:      "toggleEditorMenuIsOpen",
		callback: (didUpdateState: boolean) => void
		// todo: prevent other keys
	}
	/**
	 * Close the UI that is focused, if any.
	 */,
	{
		key:     "closeFocusedUi",
		payload: number
	},
]

/**
 * A bus to enable communication with the UI.
 */
export type TUiBus = EventBus<TUiBusEvents>