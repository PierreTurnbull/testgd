import { useEffect, useState } from "preact/hooks";
import { appManager } from "../features/app/appManager.singleton";
import { EditorBar } from "./components/EditorBar/EditorBar";
import { GameMenu } from "./components/GameMenu/GameMenu";
import { ClosingProvider } from "./contexts/closing/closing.provider";
import { sharedStore } from "./sharedStore/sharedStore";
import { uiBus } from "./utils/uiBus/uiBus.singleton";

export const App = () => {
	const [editorBarIsOpen, setEditorBarIsOpen] = useState(false);
	const [gameMenuIsOpen, setGameMenuIsOpen] = useState(false);

	useEffect(() => {
		sharedStore.editorMenuIsOpen = editorBarIsOpen;
	}, [editorBarIsOpen]);

	useEffect(() => {
		if (gameMenuIsOpen) return;

		const toggleListenerId = uiBus.subscribe("toggleEditorBarIsOpen", () => {
			setEditorBarIsOpen(prev => !prev);
		});

		return () => {
			uiBus.unsubscribe(toggleListenerId);
		};
	}, [gameMenuIsOpen]);

	useEffect(() => {
		if (editorBarIsOpen) return;

		const listenerId = uiBus.subscribe("escape", () => {
			setGameMenuIsOpen(true);
		});

		return () => {
			uiBus.unsubscribe(listenerId);
		};
	}, [editorBarIsOpen]);

	useEffect(() => {
		if (gameMenuIsOpen) {
			appManager.app.ticker.stop();
		} else {
			appManager.app.ticker.start();
		}
	}, [gameMenuIsOpen]);

	return (
		<ClosingProvider>
			{
				gameMenuIsOpen
					? (
						<GameMenu
							close={() => setGameMenuIsOpen(false)}
						/>
					)
					: null
			}
			{
				editorBarIsOpen
					? (
						<EditorBar
							close={() => setEditorBarIsOpen(false)}
						/>
					)
					: null
			}
		</ClosingProvider>
	);
};