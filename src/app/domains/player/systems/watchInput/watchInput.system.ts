import { archetypeManager } from "@root/app/common/archetypes/archetypeManager.singleton";
import { APlayer } from "@root/app/common/archetypes/player/player.archetype";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
// import debounce from "lodash/debounce";

export const watchInput = () => {
	const playerEntity = archetypeManager.getEntitiesByArchetype(APlayer)[0];

	const keyboardComponent = playerEntity.getComponent(CKeyboard);

	// const resetKey = debounce((keyCode: string) => {
	// 	keyboardComponent.keyboard[keyCode] = false;
	// }, 250);

	window.onkeydown = event => {
		// // todo : check if resetKey needed.
		// resetKey(event.code);

		keyboardComponent.keyboard[event.code] = true;
	};

	window.onkeyup = event => {
		keyboardComponent.keyboard[event.code] = false;
	};
};