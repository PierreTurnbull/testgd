import { TOffset } from "@root/app/common/types/offset.types";
import { Component } from "../../../../common/components/component.models";

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