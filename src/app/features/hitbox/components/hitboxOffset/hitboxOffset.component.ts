import { TOffset } from "@root/app/features/math/types/offset.types";
import { Component } from "../../../../ecs/components/models/component.models";

/**
 * The offset of a hitbox compared to the center of its parent.
 */
export class CHitboxOffset extends Component {
	constructor(
		offset: TOffset,
	) {
		super();

		this.offset = offset;
	}

	offset: TOffset;
}