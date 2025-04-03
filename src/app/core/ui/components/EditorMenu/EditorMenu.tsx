import { useEffect, useState } from "preact/hooks";
import { uiBus } from "../../utils/uiBus/uiBus.singleton";
import { EditorBar } from "../common/EditorBar/EditorBar";
import { EnvironmentItems } from "./EnvironmentItems/EnvironmentItems";

/**
 * The base of the menu of the editor.
 */
export const EditorMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const toggleListenerId = uiBus.subscribe("toggleEditorMenuIsOpen", () => {
			setIsOpen(prevIsOpen => !prevIsOpen);
			return true;
		});
		const closeListenerId = uiBus.subscribe("closeFocusedUi", () => {
			setIsOpen(false);
		});

		return () => {
			uiBus.unsubscribe(toggleListenerId);
			uiBus.unsubscribe(closeListenerId);
		};
	}, []);

	return (
		isOpen
			? (
				<EditorBar>
					<EnvironmentItems />
				</EditorBar>
			)
			: null
	);
};