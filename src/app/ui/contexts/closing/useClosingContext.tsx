import { useContext, useEffect } from "preact/hooks";
import { uiBus } from "../../utils/uiBus/uiBus.singleton";
import { ClosingContext } from "./closing.context";

export const useClosingContext = (
	name: string,
	close: () => void,
) => {
	const closingContext = useContext(ClosingContext);

	if (!closingContext) {
		throw new Error("Context ClosingContext has no value.");
	}

	// On mount, register the current component in the closing context.
	// On dismount, remove it from the closing context.
	useEffect(() => {
		closingContext.registerUi(name);

		return () => {
			closingContext.removeUi(name);
		};
	}, []);
	
	// When the user requests to close the focused ui, the current component
	// is closed if it's the one that was opened the most recently.
	useEffect(() => {
		const closeListenerId = uiBus.subscribe("closeFocusedUi", () => {
			if (name === closingContext.getLastOpenedUi()) {
				close();
			}
		});

		return () => {
			uiBus.unsubscribe(closeListenerId);
		};
	}, []);

	return closingContext;
};