import { Action } from "@root/aspects/actions/models/action.models";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { game } from "@root/domains/game/singletons/game.singletons";

type TRollingProps = {
	direction: TDirection
}

export class RollingAction extends Action {
	constructor(props: TRollingProps) {
		super({
			key: "rolling",
			animatedSprite: game.animatedSprites[`characters.monster1.rolling.${props.direction}`],
		});
	}
}