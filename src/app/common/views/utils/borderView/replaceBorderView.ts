import { CBorderView } from "@root/app/common/components/borderView/borderView.component";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { CView } from "@root/app/common/components/view/view.component";
import { initBorderView } from "./initBorderView";

export const replaceBorder = (
	viewComponent: CView,
	borderViewComponent: CBorderView,
	coordinates: TCoordinates,
) => {
	const prevBorder = borderViewComponent.borderView;

	borderViewComponent.borderView = initBorderView(viewComponent.view, coordinates);

	prevBorder.removeFromParent();
};