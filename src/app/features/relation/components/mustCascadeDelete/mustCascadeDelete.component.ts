import { Component } from "@root/app/ecs/components/models/component.models";

/**
 * Whether the child entities must be deleted when the parent entities are deleted.
 */
export class CMustCascadeDelete extends Component {
	constructor(
		mustCascadeDelete: boolean,
	) {
		super();

		this.mustCascadeDelete = mustCascadeDelete;
	}

	mustCascadeDelete: boolean;
}