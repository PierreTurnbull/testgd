import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CLocation } from "@root/app/common/components/location/location.component";
import { createRockLG } from "@root/app/domains/rockLG/utils/createRockLG";
import { createRockMD } from "@root/app/domains/rockMD/utils/createRockMD";
import { data } from "../../data/data";
import { setGameEditorStore } from "../../store/store";
import { getGlobalMouseCoordinates } from "../getGlobalMouseCoordinates/getGlobalMouseCoordinates";
import { getMouseCoordinates } from "../getMouseCoordinates/getMouseCoordinates";

const availableEntityBuilders = {
	rockLG: createRockLG,
	rockMD: createRockMD,
};

/**
 * Initializes the game editor.
 */
export const init = () => {
	const playerEntity = [...playerArchetype.entities][0];
	const playerLocationComponent = playerEntity.getComponent(CLocation);

	const mouseCoordinates = getMouseCoordinates();
	const globalMouseCoordinates = getGlobalMouseCoordinates();

	setGameEditorStore({
		draggedEntity:                   null,
		draggedEntityInitialCoordinates: null,
		selectedEntity:                  null,
		availableEntityBuilders:         availableEntityBuilders,
		data:                            data,
		playerCoordinates:               playerLocationComponent.coordinates,
		mouseCoordinates:                mouseCoordinates,
		globalMouseCoordinates:          globalMouseCoordinates,
	});
};