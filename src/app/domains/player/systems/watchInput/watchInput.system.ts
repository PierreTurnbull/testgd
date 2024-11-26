import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";

export const watchInput = () => {
	const playerEntity = [...playerArchetype.entities][0];

	if (!playerEntity) {
		console.warn("No player entity found.");
		return;
	}

	const keyboardComponent = playerEntity.getComponent(CKeyboard);

	window.onkeydown = event => {
		keyboardComponent.keyboard[event.code] = true;
	};

	window.onkeyup = event => {
		keyboardComponent.keyboard[event.code] = false;
	};
};