import { Action } from "@root/aspects/actions/models/action.models";
import { TDirection } from "@root/aspects/actions/types/actions.types";
import { game } from "@root/domains/game/singletons/game.singletons";

type TAttackingProps = {
	direction: TDirection
}

export class AttackingAction extends Action {
	constructor(props: TAttackingProps) {
		super({
			key: "attacking",
			animatedSprite: game.animatedSprites[`characters.player.attacking.${props.direction}`],
		});
	}
}