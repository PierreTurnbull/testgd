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
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CPostHitInvincibility } from "@root/app/common/components/postHitInvincibility/postHitInvincibility.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { CViewSortingCurveView } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { AVAILABLE_ACTIONS } from "@root/app/common/constants/availableActions.constants";
import { ANGLE_NAMES, DIRECTION8_ANGLES } from "@root/app/common/constants/space.constants";
import { entityManager } from "@root/app/common/entities/entityManager.singleton";
import { CMemory } from "@root/app/common/memory/components/memory/memory.component";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TViewSortingCurve } from "@root/app/domains/viewSortingCurve/types/viewSortingCurve.types";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { initAnimatedSprite } from "@root/app/common/views/utils/animatedSprite/initAnimatedSprite";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { MUDDYBUDDY_ROLLING_SPEED } from "@root/app/domains/muddyBuddy/constants/muddyBuddy.constants";
import { Graphics } from "pixi.js";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CVisibilityGraph } from "../../pathfinding/components/visibilityGraph/visibilityGraph.component";
import { createVisibilityGraph } from "../../pathfinding/utils/createVisibilityGraph/createVisibilityGraph";
import { CMustBeDestroyedOnCollision } from "../../projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { CProjectile } from "../../projectile/components/projectile/projectile.component";
import { CMuddyBuddy } from "../components/muddyBuddy/muddyBuddy.component";
import { CViewSortingCurveOffset } from "../../viewSortingCurve/components/viewSortingCurveOffset/viewSortingCurveOffset.component";
import { CViewSortingCurve } from "../../viewSortingCurve/components/viewSortingCurve/viewSortingCurve.component";
import { TOffset } from "@root/app/common/types/offset.types";
import { initViewSortingCurveView } from "../../viewSortingCurve/utils/initViewSortingCurveView/initViewSortingCurveView";
import { initBorderView } from "@root/app/common/views/utils/borderView/initBorderView";
import { initCenterView } from "@root/app/common/views/utils/centerView/initCenterView";

export const createMuddyBuddy = (
	initialCoordinates: TCoordinates,
	initialDirection: TDirection = DIRECTION8_ANGLES.down,
) => {
	const name = `characters.muddyBuddy.standing.${ANGLE_NAMES.get(initialDirection)}`;

	const animatedSprite = initAnimatedSprite(name, initialCoordinates);

	let border: Graphics | null = null;
	let center: Graphics | null = null;
	let viewSortingCurveView: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		border = initBorderView(animatedSprite, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenters) {
		center = initCenterView("characters.muddyBuddy", initialCoordinates);
	}

	const actionVelocities = {
		"rolling": MUDDYBUDDY_ROLLING_SPEED,
	};

	const availableActions = AVAILABLE_ACTIONS.muddyBuddy;
	const currentAction = "standing";

	const motionHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.muddyBuddy.motion.hitboxBorder"];
	if (!motionHitboxCenterOffset) {
		throw new Error("Missing center offset for muddyBuddy.");
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
			"characters.muddyBuddy",
			initialCoordinates,
			viewSortingCurve,
			viewSortingCurveOffset,
		);
	}

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
			new CMemory(),

			// view sorting curve
			new CViewSortingCurve(viewSortingCurve),
			new CViewSortingCurveOffset(viewSortingCurveOffset),
			new CViewSortingCurveView(viewSortingCurveView),

			// views
			new CView(animatedSprite),
			new CBorderView(border),
			new CCenterView(center),
		],
	);

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