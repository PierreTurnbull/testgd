import { Action } from "@root/aspects/actions/models/action.models";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { game } from "@root/domains/game/singletons/game.singletons";

type TRunningProps = {
	direction: TDirection
}

export class RunningAction extends Action {
	constructor(props: TRunningProps) {
		super({
			key: "running",
			animatedSprite: game.animatedSprites[`characters.player.running.${props.direction}`],
		});
	}
}