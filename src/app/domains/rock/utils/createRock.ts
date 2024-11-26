import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { CRock } from "../components/rock/rock.component";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { CLocation } from "@root/app/common/components/location/location.component";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { TOffset } from "@root/app/common/types/offset.types";
import { TPoint } from "@root/app/common/types/point.type";
import { initSprite } from "@root/app/common/views/utils/sprites/initSprite";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { initBorder } from "@root/app/common/views/utils/border/initBorder";
import { initCenter } from "@root/app/common/views/utils/center/initCenter";
import { Graphics } from "pixi.js";
import { CBorderView } from "@root/app/common/components/border/border.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { CView } from "@root/app/common/components/view/view.component";

export const createRock = (
	coordinates: TCoordinates,
) => {
	const sprite = initSprite("environment.rock.0", coordinates);

	let border: Graphics | null = null;
	let center: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		border = initBorder(sprite, coordinates);
	}

	if (configManager.config.debug.showsEntityCenters) {
		center = initCenter("environment.rock.0", coordinates);
	}

	const rockEntity = entityManager.createEntity("rock", [
		// identity
		new CRock(),

		// misc
		new CLocation(coordinates),

		// views
		new CView(sprite),
		new CBorderView(border),
		new CCenterView(center),
	]);

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: rockEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const motionHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["environment.rock.0.hitboxBorder"];
	if (!motionHitboxCenterOffset) {
		throw new Error("Missing center offset for muddyBuddy.");
	}

	const motionHitboxSettings: TRectangleHitboxSettings = {
		shape:              "rectangle",
		name:               "environment.rock.0",
		type:               "motion",
		isActive:           true,
		initialCoordinates: coordinates,
		offset:             motionHitboxCenterOffset,
	};

	// motion hitbox
	createHitbox(
		rockEntity,
		motionHitboxSettings,
	);
};