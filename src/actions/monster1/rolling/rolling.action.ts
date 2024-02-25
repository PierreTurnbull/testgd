import { game } from "@root/game/game"
import { Action } from "../../action.entity"
import { TDirection } from "@root/types/action/direction.type"

type TRollingProps = {
	direction: TDirection
}

export class RollingAction extends Action<"rolling"> {
	constructor(props: TRollingProps) {
		super({
			key: "rolling",
			animationSpeed: 0.4,
			textures: game.textures.monster1.rolling[props.direction],
		})
	}
}