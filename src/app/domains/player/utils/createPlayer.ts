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
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TViewSortingCurve } from "@root/app/domains/viewSortingCurve/types/viewSortingCurve.types";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { initAnimatedSprite } from "@root/app/common/views/utils/animatedSprite/initAnimatedSprite";
import { configManager } from "@root/app/core/configManager/configManager.singleton";
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";
import { Graphics } from "pixi.js";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CPlayer } from "../components/user/user.component";
import { TOffset } from "@root/app/common/types/offset.types";
import { initBorderView } from "@root/app/common/views/utils/borderView/initBorderView";
import { initCenterView } from "@root/app/common/views/utils/centerView/initCenterView";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { CViewSortingCurveOffset } from "../../viewSortingCurve/components/viewSortingCurveOffset/viewSortingCurveOffset.component";
import { CViewSortingCurveView } from "../../viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { initViewSortingCurveView } from "../../viewSortingCurve/utils/initViewSortingCurveView/initViewSortingCurveView";

export const createPlayer = (
	initialCoordinates: TCoordinates,
	initialDirection: TDirection = 90,
) => {
	const name = `characters.player.standing.${ANGLE_NAMES.get(initialDirection)}`;

	const animatedSprite = initAnimatedSprite(name, initialCoordinates);

	let borderView: Graphics | null = null;
	let centerView: Graphics | null = null;
	let viewSortingCurveView: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		borderView = initBorderView(animatedSprite, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenters) {
		centerView = initCenterView("characters.player", initialCoordinates);
	}

	const actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};

	const availableActions = AVAILABLE_ACTIONS.player;
	const currentAction = "standing";

	const motionHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.player.motion.hitboxBorder"];
	if (!motionHitboxCenterOffset) {
		throw new Error("Missing center offset for player.");
	}

	const centerOffset = ENTITIES_CENTER_OFFSETS[name];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${name}".`);
	}

	const viewSortingCurveOffset: TOffset = {
		x: centerOffset.x,
		y: centerOffset.y,
	};
	const viewSortingCurve: TViewSortingCurve = [
		{ x: 0, y: -viewSortingCurveOffset.y },
		{ x: animatedSprite.width, y: -viewSortingCurveOffset.y },
	];

	if (configManager.config.debug.showsViewSortingCurves) {
		viewSortingCurveView = initViewSortingCurveView(
			"characters.player",
			initialCoordinates,
			viewSortingCurve,
			viewSortingCurveOffset,
		);
	}

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
			new CViewSortingCurveOffset(viewSortingCurveOffset),
			new CViewSortingCurveView(viewSortingCurveView),

			// views
			new CView(animatedSprite),
			new CBorderView(borderView),
			new CCenterView(centerView),
		],
	);

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