import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CView } from "@root/app/common/components/view/view.component";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { initBorderView } from "@root/app/common/views/utils/borderView/initBorderView";
import { initCenterView } from "@root/app/common/views/utils/centerView/initCenterView";
import { initSprite } from "@root/app/common/views/utils/sprites/initSprite";
import { configManager } from "@root/app/core/configManager/configManager.singleton";
import { Graphics } from "pixi.js";
import { HITBOXES_POINTS } from "../../hitbox/constants/hitboxes.constants";
import { TPolygonHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CRockMD } from "../components/rockMD/rockMD.component";

export const createRockMD = (
	coordinates: TCoordinates,
	variant: number,
) => {
	const name = `environment.rockMD.${variant}`;

	const sprite = initSprite(name, coordinates);

	let borderView: Graphics | null = null;
	let centerView: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		borderView = initBorderView(sprite, coordinates);
	}

	if (configManager.config.debug.showsEntityCenters) {
		centerView = initCenterView(name, coordinates);
	}

	const rockMDEntity = entityManager.createEntity("rockMD", [
		// identity
		new CRockMD(),

		// misc
		new CLocation(coordinates),

		// views
		new CView(sprite),
		new CBorderView(borderView),
		new CCenterView(centerView),
	]);

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: rockMDEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const centerOffset = ENTITIES_CENTER_OFFSETS[name];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${name}".`);
	}
	const motionHitboxSettings: TPolygonHitboxSettings = {
		shape:              "polygon",
		name:               name,
		type:               "motion",
		isActive:           true,
		initialCoordinates: coordinates,
		offset:             {
			x: centerOffset.x,
			y: centerOffset.y,
		},
		points: HITBOXES_POINTS[name],
	};

	// motion hitbox
	createHitbox(
		rockMDEntity,
		motionHitboxSettings,
	);
};