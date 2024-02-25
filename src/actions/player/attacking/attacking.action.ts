import { game } from "@root/game/game"
import { Action } from "../../action.entity"
import { TDirection } from "@root/types/action/direction.type"

type TAttackingProps = {
	direction: TDirection
}

export class AttackingAction extends Action<"attacking"> {
	constructor(props: TAttackingProps) {
		super({
			key: "attacking",
			animationSpeed: 0.8,
			textures: game.textures.player.attacking[props.direction],
		})
	}
}