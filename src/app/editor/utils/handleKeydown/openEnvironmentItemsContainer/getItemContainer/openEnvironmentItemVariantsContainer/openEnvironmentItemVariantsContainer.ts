import spritesDatas from "@assets/sprites/spritesDatas.json";
import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { gameEditorStore } from "@root/app/editor/store/store";
import { createMenu } from "@root/app/editor/utils/common/createMenu/createMenu";
import { getItemVariantContainer } from "./getItemVariantContainer/getItemVariantContainer";

export const openEnvironmentItemVariantsContainer = (
	name: string,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	if (gameEditorStore.environmentItemVariantsContainer) {
		return;
	}
	const variants = [...new Set(
		spritesDatas
			.filter(spriteDatas => spriteDatas.name.includes(`environment.${name}`))
			.map(spriteDatas => spriteDatas.name)
			.map(name => trimDirection(name)),
	)]
		.map((_, key) => key);

	gameEditorStore.environmentItemVariantsContainer = createMenu();

	for (let i = 0; i < variants.length; i++) {
		const variant = variants[i];

		const environmentItemContainer = getItemVariantContainer(name, variant);

		gameEditorStore.environmentItemVariantsContainer.addChild(environmentItemContainer);
	}
};