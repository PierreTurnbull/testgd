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
import { CUser } from "@root/app/common/components/identity/user/user.component";
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
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";

export const createPlayer = (
	initialCoordinates: TCoordinates,
) => {
	const userComponent = new CUser();
	const keyboardComponent = new CKeyboard();
	const locationComponent = new CLocation();
	const directionComponent = new CDirection();
	const viewComponent = new CView();
	const velocityComponent = new CVelocity();
	const actionComponent = new CAction();
	const hitboxViewComponent = new CHitboxView();
	const centerViewComponent = new CCenterView();

	locationComponent.coordinates = initialCoordinates;

	const centerOffset = ENTITIES_CENTER_OFFSETS["characters.player.hitboxBorder"];
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
			x: HITBOX_BOUNDS["characters.player"].w,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS["characters.player"].w,
			y: HITBOX_BOUNDS["characters.player"].h,
		},
		{
			x: 0,
			y: HITBOX_BOUNDS["characters.player"].h,
		},
	];
	const hitboxBody = collisionsManager.system.createPolygon(
		hitboxCoordinates,
		hitboxPoints,
	);

	setAnimatedSprite(viewComponent, "characters.player.standing.down", initialCoordinates);

	if (configManager.config.debug.showsEntityBorders) {
		setBorder(viewComponent, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityHitbox) {
		setHitboxBorder(hitboxViewComponent, "characters.player", hitboxPoints, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenter) {
		setCenterView(centerViewComponent, "characters.player", initialCoordinates);
	}

	velocityComponent.actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};

	actionComponent.availableActions = ["standing", "running", "attacking"];
	actionComponent.currentAction = "standing";

	const hitboxComponent = new CHitbox(hitboxBody, "characters.player.hitboxBorder");

	createEntity(
		"player",
		[
			userComponent,
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