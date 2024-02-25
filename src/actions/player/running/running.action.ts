import { game } from "@root/game/game"
import { Action } from "../../action.entity"
import { TDirection } from "@root/types/action/direction.type"

type TRunningProps = {
	direction: TDirection
}

export class RunningAction extends Action<"running"> {
	constructor(props: TRunningProps) {
		super({
			key: "running",
			animationSpeed: 0.8,
			textures: game.textures.player.running[props.direction],
		})
	}
}