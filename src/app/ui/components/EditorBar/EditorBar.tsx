import { useEffect, useState } from "preact/hooks";
import { sharedStore } from "../../sharedStore/sharedStore";
import { uiBus } from "../../utils/uiBus/uiBus.singleton";
import { EditorBarPage } from "../common/EditorBarPage/EditorBarPage";
import { EnvironmentItems } from "./EnvironmentItems/EnvironmentItems";

export const EditorBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		sharedStore.editorMenuIsOpen = isOpen;
	}, [isOpen]);

	useEffect(() => {
		const toggleListenerId = uiBus.subscribe("toggleEditorBarIsOpen", () => {
			setIsOpen(prev => !prev);
		});

		return () => {
			uiBus.unsubscribe(toggleListenerId);
		};
	}, []);

	if (!isOpen) {
		return null;
	}

	return (
		<EditorBarPage>
			<EnvironmentItems
				close={() => setIsOpen(false)}
			/>
		</EditorBarPage>
	);
};