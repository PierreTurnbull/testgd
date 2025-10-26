import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CVariant } from "@root/app/ecs/components/common/variant.component";
import { Entity } from "@root/app/ecs/entities/models/entity.models";
import { CGameEditorId } from "@root/app/features/editor/components/gameEditorId.component";
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