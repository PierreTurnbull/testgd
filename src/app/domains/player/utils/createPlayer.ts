import { rockLGArchetype } from "@root/app/common/archetypes/rockLG/rockLG.archetype";
import { rockMDArchetype } from "@root/app/common/archetypes/rockMD/rockMD.archetype";
import { wallArchetype } from "@root/app/common/archetypes/wall/wall.archetype";
import { CAction } from "@root/app/common/components/action/action.component";
import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { CHealth } from "@root/app/common/components/health/health.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CPostHitInvincibility } from "@root/app/common/components/postHitInvincibility/postHitInvincibility.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { AVAILABLE_ACTIONS } from "@root/app/common/constants/availableActions.constants";
import { ANGLE_NAMES } from "@root/app/common/constants/space.constants";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/constants/views.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";
import { relationsManager } from "@root/app/domains/relationManager/relationsManager.singleton";
import { getCenterView } from "@root/app/domains/view/utils/common/getCenterView/getCenterView";
import { TViewSortingCurve } from "@root/app/domains/viewSortingCurve/types/viewSortingCurve.types";
import { HITBOX_BOUNDS } from "../../hitbox/constants/hitboxes.constants";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
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
			new CHealth(3),
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