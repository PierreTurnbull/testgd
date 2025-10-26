import { CAction } from "@root/app/ecs/components/common/action.component";
import { CDirection } from "@root/app/ecs/components/common/direction.component";
import { CHealth } from "@root/app/ecs/components/common/health.component";
import { CKeyboard } from "@root/app/ecs/components/common/keyboard.component";
import { CLocation } from "@root/app/ecs/components/common/location.component";
import { CPostHitInvincibility } from "@root/app/ecs/components/common/postHitInvincibility.component";
import { CVelocity } from "@root/app/ecs/components/common/velocity.component";
import { entityManager } from "@root/app/ecs/entities/singletons/entityManager.singleton";
import { AVAILABLE_ACTIONS } from "@root/app/features/action/constants/availableActions.constants";
import { configManager } from "@root/app/features/config/singletons/configManager.singleton";
import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { PLAYER_RUNNING_SPEED } from "@root/app/features/player/constants/player.constants";
import { relationsManager } from "@root/app/features/relation/relationsManager.singleton";
import { rockLGArchetype } from "@root/app/features/rockLG/archetypes/rockLG.archetype";
import { rockMDArchetype } from "@root/app/features/rockMD/archetypes/rockMD.archetype";
import { CBorderView } from "@root/app/features/view/components/borderView.component";
import { CCenterView } from "@root/app/features/view/components/centerView.component";
import { CView } from "@root/app/features/view/components/view.component";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/features/view/constants/views.constants";
import { getCenterView } from "@root/app/features/view/utils/common/getCenterView/getCenterView";
import { TViewSortingCurve } from "@root/app/features/viewSortingCurve/types/viewSortingCurve.types";
import { wallArchetype } from "@root/app/features/wall/archetypes/wall.archetype";
import { HITBOX_BOUNDS } from "../../hitbox/constants/hitboxes.constants";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { ANGLE_NAMES } from "../../math/constants/space.constants";
import { TDirection } from "../../math/types/direction.types";
import { getBorderView } from "../../view/utils/common/getBorderView/getBorderView";
import { createView } from "../../view/utils/create/createView/createView";
import { getAnimatedSprite } from "../../view/utils/getAnimatedSprite/getAnimatedSprite";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveView } from "../../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { getViewSortingCurveView } from "../../viewSortingCurve/utils/getViewSortingCurveView/getViewSortingCurveView";
import { CPlayer } from "../components/user/user.component";

export const createPlayer = (
	initialCoordinates: TCoordinates,
	initialDirection: TDirection = 90,
) => {
	const viewName = `characters.player.standing.${ANGLE_NAMES.get(initialDirection)}`;

	const actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};

	const availableActions = AVAILABLE_ACTIONS.player;
	const currentAction = "standing";

	const motionHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.player.motion.hitboxBorder"];
	if (!motionHitboxCenterOffset) {
		throw new Error("Missing center offset for player.");
	}

	const centerOffset = ENTITIES_CENTER_OFFSETS[viewName];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${viewName}".`);
	}

	const viewSortingCurve: TViewSortingCurve = [
		{
			x: 0 - centerOffset.x - HITBOX_BOUNDS["characters.player.motion"].w / 2,
			y: 0 - centerOffset.y,
		},
		{
			x: 0 - centerOffset.x + HITBOX_BOUNDS["characters.player.motion"].w / 2,
			y: 0 - centerOffset.y,
		},
	];

	const playerEntity = entityManager.createEntity(
		"player",
		[
			// identity
			new CPlayer(),

			// misc
			new CKeyboard(),
			new CLocation(initialCoordinates),
			new CDirection(initialDirection),
			new CVelocity(actionVelocities),
			new CAction(currentAction, availableActions),
			new CHealth(300),
			new CPostHitInvincibility(),

			// view sorting curve
			new CViewSortingCurve(viewSortingCurve),
			new CViewSortingCurveView(null),

			// views
			new CView(null),
			new CBorderView(null),
			new CCenterView(null),
		],
	);
	
	createView(playerEntity, CView, getAnimatedSprite, "view");

	if (configManager.config.debug.showsEntityBorders) {
		createView(playerEntity, CBorderView, getBorderView, "borderView");
	}

	if (configManager.config.debug.showsEntityCenters) {
		createView(playerEntity, CCenterView, getCenterView, "centerView");
	}

	if (configManager.config.debug.showsViewSortingCurves) {
		createView(playerEntity, CViewSortingCurveView, getViewSortingCurveView, "viewSortingCurveView");
	}

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: playerEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const hitboxSettings: TRectangleHitboxSettings = {
		type:                      "motion",
		shape:                     "rectangle",
		initialCoordinates:        initialCoordinates,
		name:                      "characters.player.motion",
		motionCollisionCandidates: [
			wallArchetype,
			rockMDArchetype,
			rockLGArchetype,
		],
		isActive: true,
		offset:   motionHitboxCenterOffset,
	};

	createHitbox(
		playerEntity,
		hitboxSettings,
	);

	return playerEntity;
};