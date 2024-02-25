import { game } from "@root/game/game"
import { Action } from "../../action.entity"
import { TDirection } from "@root/types/action/direction.type"

type TStandingProps = {
	direction: TDirection
}

export class StandingAction extends Action<"standing"> {
	constructor(props: TStandingProps) {
		super({
			key: "standing",
			animationSpeed: 0.8,
			textures: game.textures.monster1.standing[props.direction],
		})
	}
}