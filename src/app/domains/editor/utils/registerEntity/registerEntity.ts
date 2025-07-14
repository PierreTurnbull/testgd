import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CGameEditorId } from "@root/app/common/components/gameEditorId/gameEditorId.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVariant } from "@root/app/common/components/variant/variant.component";
import { Entity } from "@root/app/domains/entity/entity.models";
import { gameEditorStore } from "../../store/store";
import { getEntityIsPersisted } from "../getEntityIsPersisted/getEntityIsPersisted";
import { getPersistedEntity } from "../getPersistedEntity/getPersistedEntity";

/**
 * Register the entity in the game editor data. Note this does not persist it,
 * it's only in memory.
 */
export const registerEntity = (
	entity: Entity,
) => {
	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const gameEditorIdComponent = entity.getComponent(CGameEditorId);
	const locationComponent = entity.getComponent(CLocation);
	const variantComponent = entity.getComponent(CVariant);
	const directionComponent = entity.getComponent(CDirection);

	const isPersisted = getEntityIsPersisted(entity);

	if (isPersisted) {
		const gameEditorId = gameEditorIdComponent.gameEditorId;
		const persistedEntity = getPersistedEntity(gameEditorId)!;

		persistedEntity.coordinates = locationComponent.coordinates;
	} else {
		gameEditorStore.data.items.environment.push({
			gameEditorId: gameEditorIdComponent.gameEditorId,
			name:         entity.name,
			coordinates:  gameEditorStore.mouseCoordinates,
			variant:      variantComponent.variant,
			direction8:   directionComponent.direction8,
		});
	}
};