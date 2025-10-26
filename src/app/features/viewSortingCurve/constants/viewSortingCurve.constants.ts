import { flatEnvironmentConfigItems } from "@root/app/features/editor/constants/editor.constants";
import { TViewSortingCurve } from "../types/viewSortingCurve.types";

export const VIEW_SORTING_CURVES: Record<string, TViewSortingCurve> = {
	...Object.fromEntries(Object.entries(flatEnvironmentConfigItems).map(entry => {
		return [
			entry[0],
			entry[1].sortingCurve,
		];
	})),
};