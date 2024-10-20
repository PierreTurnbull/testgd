import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/animatedSprites/constants/animatedSprites.constants";
import { setAnimatedSprite } from "@root/app/common/animatedSprites/utils/animatedSprite/setAnimatedSprite";
import { setBorder } from "@root/app/common/animatedSprites/utils/border/setBorder";
import { setCenterView } from "@root/app/common/animatedSprites/utils/center/setCenterView";
import { setHitboxBorder } from "@root/app/common/animatedSprites/utils/hitboxBorder/setHitboxBorder";
import { CAction } from "@root/app/common/components/action/action.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { CMuddyBuddy } from "@root/app/common/components/identity/muddyBuddy/muddyBuddy.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { HITBOX_BOUNDS } from "@root/app/common/hitboxes/constants/hitboxes.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { MUDDYBUDDY_ROLLING_SPEED } from "@root/app/domains/muddyBuddy/constants/muddyBuddy.constants";

export const createMuddyBuddy = (
	initialCoordinates: TCoordinates,
) => {
	const muddyBuddyComponent = new CMuddyBuddy();
	const keyboardComponent = new CKeyboard();
	const locationComponent = new CLocation();
	const directionComponent = new CDirection();
	const viewComponent = new CView();
	const velocityComponent = new CVelocity();
	const actionComponent = new CAction();
	const hitboxViewComponent = new CHitboxView();
	const centerViewComponent = new CCenterView();

	locationComponent.coordinates = initialCoordinates;

	const centerOffset = ENTITIES_CENTER_OFFSETS["characters.muddyBuddy.hitboxBorder"];
	const hitboxCoordinates: TCoordinates = {
		x: initialCoordinates.x + centerOffset.x,
		y: initialCoordinates.y + centerOffset.y,
	};
	const hitboxPoints: TPoint[] = [
		{
			x: 0,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS["characters.muddyBuddy"].w,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS["characters.muddyBuddy"].w,
			y: HITBOX_BOUNDS["characters.muddyBuddy"].h,
		},
		{
			x: 0,
			y: HITBOX_BOUNDS["characters.muddyBuddy"].h,
		},
	];
	const hitboxBody = collisionsManager.system.createPolygon(
		hitboxCoordinates,
		hitboxPoints,
	);

	setAnimatedSprite(viewComponent, "characters.muddyBuddy.standing.down", initialCoordinates);

	if (configManager.config.debug.showsEntityBorders) {
		setBorder(viewComponent, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityHitbox) {
		setHitboxBorder(hitboxViewComponent, "characters.muddyBuddy", hitboxPoints, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenter) {
		setCenterView(centerViewComponent, "characters.muddyBuddy", initialCoordinates);
	}

	velocityComponent.actionVelocities = {
		"rolling": MUDDYBUDDY_ROLLING_SPEED,
	};

	actionComponent.availableActions = ["standing", "rolling"];
	actionComponent.currentAction = "standing";

	const hitboxComponent = new CHitbox(hitboxBody, "characters.muddyBuddy.hitboxBorder");

	createEntity(
		"muddyBuddy",
		[
			muddyBuddyComponent,
			keyboardComponent,
			locationComponent,
			directionComponent,
			viewComponent,
			velocityComponent,
			actionComponent,
			hitboxComponent,
			hitboxViewComponent,
			centerViewComponent,
		],
	);
};