import { Action } from "@root/aspects/actions/models/action.models";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { game } from "@root/domains/game/singletons/game.singletons";

type TStandingProps = {
	direction: TDirection
}

export class StandingAction extends Action {
	constructor(props: TStandingProps) {
		super({
			key: "standing",
			animatedSprite: game.animatedSprites[`characters.monster1.standing.${props.direction}`],
		});
	}
}