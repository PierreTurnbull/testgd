import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { handleKeydown } from "@root/app/editor/utils/handleKeydown/handleKeydown";
import { handleMousedown } from "@root/app/editor/utils/handleMousedown/handleMousedown";
import { handleMousemove } from "@root/app/editor/utils/handleMousemove/handleMousemove";
import { handleMouseup } from "@root/app/editor/utils/handleMouseup/handleMouseup";
import { handleWheel } from "@root/app/editor/utils/handleWheel/handleWheel";
import { init } from "@root/app/editor/utils/init/init";

export const watchInput = () => {
	const playerEntity = [...playerArchetype.entities][0];

	if (!playerEntity) {
		console.warn("No player entity found.");
		return;
	}

	const keyboardComponent = playerEntity.getComponent(CKeyboard);

	init();

	window.addEventListener("keydown", async event => {
		const isDevtools = event.code === "KeyJ" && event.metaKey && event.altKey;
		const isRefresh = event.code === "KeyR" && event.metaKey;
		if (isDevtools || isRefresh) {
			// keep the behaviour of the browser
			return;
		}

		event.preventDefault();

		let isHandled = false;

		isHandled = await handleKeydown(event);

		if (isHandled) {
			return;
		}

		if (event.metaKey === false && event.ctrlKey === false) {
			keyboardComponent.keyboard[event.code] = true;
		}
	});

	window.addEventListener("keyup", event => {
		event.preventDefault();

		if (event.metaKey === false && event.ctrlKey === false) {
			keyboardComponent.keyboard[event.code] = false;
		}
	});

	window.addEventListener("mousedown", event => {
		event.preventDefault();

		handleMousedown(event);
	});

	window.addEventListener("mouseup", event => {
		event.preventDefault();

		handleMouseup(event);
	});

	window.addEventListener("mousemove", event => {
		event.preventDefault();

		handleMousemove();
	});

	window.addEventListener("wheel", event => {
		handleWheel(event);
	});
};