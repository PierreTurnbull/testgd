import { Component } from "../component.models";

/**
 * The gameEditorId of an entity. It is used to identify entities in the game editor independently
 * from the entity's id system, preventing any conflict with un-editable entities.
 */
export class CGameEditorId extends Component {
	constructor(
		initialGameEditorId: number,
	) {
		super();

		this.gameEditorId = initialGameEditorId;
	}

	gameEditorId: number;
}
