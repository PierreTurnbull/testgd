import { animatedSpritesManager } from "@root/app/common/animatedSprites/animatedSpritesManager.singletons";
import { replaceAnimatedSprite } from "@root/app/common/animatedSprites/utils/replaceAnimatedSprite";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CUser } from "@root/app/common/components/user/user.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.entity";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";

const initPlayer = () => {
	const initialCoordinates = {
		x: 300,
		y: 300, 
	};
	const initialAnimatedSprite = animatedSpritesManager.animatedSprites["characters.player.standing.down"];

	const userComponent = new CUser();
	const keyboardComponent = new CKeyboard();
	const locationComponent = new CLocation();
	const directionComponent = new CDirection();
	locationComponent.coordinates = initialCoordinates;
	const viewComponent = new CView();
	viewComponent.animatedSprite = initialAnimatedSprite;
	replaceAnimatedSprite(viewComponent, null, initialAnimatedSprite, initialCoordinates);
	const velocityComponent = new CVelocity();
	velocityComponent.actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};
	const actionComponent = new CAction();

	createEntity(
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

// const initMonster1 = () => {
// 	entityManager.entities.push(
// 		new Monster1({
// 			initialCoordinates: {
// 				x: 500,
// 				y: 500, 
// 			}, 
// 		}),
// 	);
// };

export const initCharacters = () => {
	initPlayer();
	// initMonster1();
};