import { muddyBuddyArchetype } from "@root/app/common/archetypes/muddyBuddy/muddyBuddy.archetype";
import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { rockLGArchetype } from "@root/app/common/archetypes/rockLG/rockLG.archetype";
import { rockMDArchetype } from "@root/app/common/archetypes/rockMD/rockMD.archetype";
import { wallArchetype } from "@root/app/common/archetypes/wall/wall.archetype";
import { CAction } from "@root/app/common/components/action/action.component";
import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDamage } from "@root/app/common/components/damage/damage.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { CHealth } from "@root/app/common/components/health/health.component";
import { CIsFindingPath } from "@root/app/common/components/isFindingPath/isFindingPath.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CPostHitInvincibility } from "@root/app/common/components/postHitInvincibility/postHitInvincibility.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { AVAILABLE_ACTIONS } from "@root/app/common/constants/availableActions.constants";
import { ANGLE_NAMES, DIRECTION8_ANGLES } from "@root/app/common/constants/space.constants";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/constants/views.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { entityManager } from "@root/app/domains/entity/entityManager.singleton";
import { MUDDYBUDDY_ROLLING_SPEED } from "@root/app/domains/muddyBuddy/constants/muddyBuddy.constants";
import { relationsManager } from "@root/app/domains/relationManager/relationsManager.singleton";
import { getCenterView } from "@root/app/domains/view/utils/common/getCenterView/getCenterView";
import { CViewSortingCurveView } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { TViewSortingCurve } from "@root/app/domains/viewSortingCurve/types/viewSortingCurve.types";
import { HITBOX_BOUNDS } from "../../hitbox/constants/hitboxes.constants";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CMemory } from "../../memory/components/memory/memory.component";
import { CVisibilityGraph } from "../../pathfinding/components/visibilityGraph/visibilityGraph.component";
import { createVisibilityGraph } from "../../pathfinding/utils/visibilityGraph/createVisibilityGraph/createVisibilityGraph";
import { CMustBeDestroyedOnCollision } from "../../projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { CProjectile } from "../../projectile/components/projectile/projectile.component";
import { getBorderView } from "../../view/utils/common/getBorderView/getBorderView";
import { createView } from "../../view/utils/create/createView/createView";
import { getAnimatedSprite } from "../../view/utils/getAnimatedSprite/getAnimatedSprite";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { getViewSortingCurveView } from "../../viewSortingCurve/utils/getViewSortingCurveView/getViewSortingCurveView";
import { CMuddyBuddy } from "../components/muddyBuddy/muddyBuddy.component";

export const createMuddyBuddy = (
	initialCoordinates: TCoordinates,
	initialDirection: TDirection = DIRECTION8_ANGLES.down,
) => {
	const viewName = `characters.muddyBuddy.standing.${ANGLE_NAMES.get(initialDirection)}`;

	const actionVelocities = {
		"rolling": MUDDYBUDDY_ROLLING_SPEED,
	};

	const availableActions = AVAILABLE_ACTIONS.muddyBuddy;
	const currentAction = "standing";

	const motionHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.muddyBuddy.motion.hitboxBorder"];
	if (!motionHitboxCenterOffset) {
		throw new Error("Missing center offset for muddyBuddy.");
	}

	const centerOffset = ENTITIES_CENTER_OFFSETS[viewName];
	if (!centerOffset) {
		throw new Error(`Missing center offsets for "${viewName}".`);
	}

	const viewSortingCurve: TViewSortingCurve = [
		{
			x: 0 - centerOffset.x - HITBOX_BOUNDS["characters.muddyBuddy.motion"].w / 2,
			y: 0 - centerOffset.y,
		},
		{
			x: 0 - centerOffset.x + HITBOX_BOUNDS["characters.muddyBuddy.motion"].w / 2,
			y: 0 - centerOffset.y,
		},
	];

	const muddyBuddyEntity = entityManager.createEntity(
		"muddyBuddy",
		[
			// identity
			new CMuddyBuddy(),
			new CProjectile("ram"),

			// misc
			new CKeyboard(),
			new CLocation(initialCoordinates),
			new CDirection(initialDirection),
			new CVelocity(actionVelocities),
			new CAction(currentAction, availableActions),
			new CHealth(3),
			new CMustBeDestroyedOnCollision(false),
			new CDamage(1),
			new CPostHitInvincibility(),
			new CVisibilityGraph(),
			new CIsFindingPath(),
			new CMemory(),

			// view sorting curve
			new CViewSortingCurve(viewSortingCurve),
			new CViewSortingCurveView(null),

			// views
			new CView(null),
			new CBorderView(null),
			new CCenterView(null),
		],
	);

	createView(muddyBuddyEntity, CView, getAnimatedSprite, "view");

	if (configManager.config.debug.showsEntityBorders) {
		createView(muddyBuddyEntity, CBorderView, getBorderView, "borderView");
	}

	if (configManager.config.debug.showsEntityCenters) {
		createView(muddyBuddyEntity, CCenterView, getCenterView, "centerView");
	}

	if (configManager.config.debug.showsViewSortingCurves) {
		createView(muddyBuddyEntity, CViewSortingCurveView, getViewSortingCurveView, "viewSortingCurveView");
	}

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: muddyBuddyEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const damageHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.muddyBuddy.damage.hitboxBorder"];
	if (!damageHitboxCenterOffset) {
		throw new Error("Missing center offset for muddyBuddy.");
	}

	const baseHitboxSettings: Pick<TRectangleHitboxSettings, "shape"> = {
		shape: "rectangle",
	};

	const motionHitboxSettings: TRectangleHitboxSettings = {
		...baseHitboxSettings,
		name:                      "characters.muddyBuddy.motion",
		type:                      "motion",
		motionCollisionCandidates: [
			wallArchetype,
			muddyBuddyArchetype,
			rockMDArchetype,
			rockLGArchetype,
		],
		pathfindingCollisionCandidates: [
			wallArchetype,
			rockMDArchetype,
			rockLGArchetype,
		],
		isActive:           true,
		initialCoordinates: initialCoordinates,
		offset:             motionHitboxCenterOffset,
	};

	const damageHitboxSettings: TRectangleHitboxSettings = {
		...baseHitboxSettings,
		name:                      "characters.muddyBuddy.damage",
		type:                      "damage",
		damageCollisionCandidates: [playerArchetype],
		isActive:                  false,
		initialCoordinates:        initialCoordinates,
		offset:                    damageHitboxCenterOffset,
	};

	// motion hitbox
	createHitbox(
		muddyBuddyEntity,
		motionHitboxSettings,
	);

	// damage hitbox
	createHitbox(
		muddyBuddyEntity,
		damageHitboxSettings,
	);

	createVisibilityGraph(muddyBuddyEntity);

	return muddyBuddyEntity;
};