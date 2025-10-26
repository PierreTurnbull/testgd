import { sortableViewArchetype } from "../../../viewSortingCurve/archetypes/sortableView.archetype";
import { getSortedEntities } from "./utils/getSortedEntities/getSortedEntities";
import { sortViewsFromEntities } from "./utils/sortViewsFromEntities/sortViewsFromEntities";

/**
 * Updates the order in which views are rendered.
 * This makes items visually coherent with each other: items that are behind (with lower y coordinates)
 * appear behind items that are in front (with higher y coordinates).
 */
export const sortViews = () => {
	const sortableViewEntities = [...sortableViewArchetype.entities];

	const sortedViewEntities = getSortedEntities(sortableViewEntities);

	sortViewsFromEntities(sortedViewEntities);
};