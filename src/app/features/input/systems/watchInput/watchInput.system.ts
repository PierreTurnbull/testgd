import { CKeyboard } from "@root/app/ecs/components/common/keyboard.component";
import { handleKeydown as editorHandleKeyDown } from "@root/app/features/editor/utils/handleKeydown/handleKeydown";
import { handleMousedown as editorHandleMousedown } from "@root/app/features/editor/utils/handleMousedown/handleMousedown";
import { handleMousemove as editorHandleMousemove } from "@root/app/features/editor/utils/handleMousemove/handleMousemove";
import { handleMouseup as editorHandleMouseup } from "@root/app/features/editor/utils/handleMouseup/handleMouseup";
import { handleWheel as editorHandleWheel } from "@root/app/features/editor/utils/handleWheel/handleWheel";
import { init } from "@root/app/features/editor/utils/init/init";
import { playerArchetype } from "@root/app/features/player/archetypes/player.archetype";
import { handleKeyDown } from "./utils/handleKeyDown/handleKeydown";

export const watchInput = () => {
	const playerEntity = [...playerArchetype.entities][0];

	if (!playerEntity) {
		console.warn("No player entity found.");
		return;
	}

	const keyboardComponent = playerEntity.getComponent(CKeyboard);

	init();

	window.addEventListener("keydown", async event => {
		const isDevtools = event.code === "KeyJ" && event.ctrlKey && event.shiftKey;
		const isRefresh = event.code === "KeyR" && event.ctrlKey;
		if (isDevtools || isRefresh) {
			// keep the behaviour of the browser
			return;
		}

		event.preventDefault();

		let isHandled = false;

		isHandled = handleKeyDown(event);

		if (isHandled) {
			return;
		}

		isHandled = await editorHandleKeyDown(event);

		if (isHandled) {
			return;
		}

		if (event.ctrlKey === false && event.ctrlKey === false) {
			keyboardComponent.keyboard[event.code] = true;
		}
	});

	window.addEventListener("keyup", event => {
		event.preventDefault();

		if (event.ctrlKey === false && event.ctrlKey === false) {
			keyboardComponent.keyboard[event.code] = false;
		}
	});

	window.addEventListener("mousedown", async event => {
		event.preventDefault();

		await editorHandleMousedown(event);
	});

	window.addEventListener("mouseup", event => {
		event.preventDefault();

		editorHandleMouseup();
	});

	window.addEventListener("mousemove", event => {
		event.preventDefault();

		editorHandleMousemove();
	});

	window.addEventListener("wheel", event => {
		editorHandleWheel(event);
	});
};