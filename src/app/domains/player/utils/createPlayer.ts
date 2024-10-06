import { setAnimatedSprite } from "@root/app/common/animatedSprites/utils/animatedSprite/setAnimatedSprite";
import { setAnimatedSpriteBorder } from "@root/app/common/animatedSprites/utils/animatedSpriteBorder/setAnimatedSpriteBorder";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CUser } from "@root/app/common/components/user/user.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.entity";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { animatedSpritesManager } from "@root/app/core/animatedSpritesManager/animatedSpritesManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";

export const createPlayer = () => {
	const userComponent = new CUser();
	const keyboardComponent = new CKeyboard();
	const locationComponent = new CLocation();
	const directionComponent = new CDirection();
	const viewComponent = new CView();
	const velocityComponent = new CVelocity();
	const actionComponent = new CAction();
	
	const initialCoordinates = {
		x: 200,
		y: 200, 
	};
	locationComponent.coordinates = initialCoordinates;
	const initialAnimatedSprite = animatedSpritesManager.animatedSprites["characters.player.standing.down"];
	setAnimatedSprite(viewComponent, initialAnimatedSprite, initialCoordinates);
	if (configManager.config.debug.showsEntityBorders) {
		setAnimatedSpriteBorder(viewComponent, initialCoordinates);
	}
	velocityComponent.actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};
	actionComponent.availableActions = ["standing", "running", "attacking"];
	actionComponent.currentAction = "standing";

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
		],
	);
};