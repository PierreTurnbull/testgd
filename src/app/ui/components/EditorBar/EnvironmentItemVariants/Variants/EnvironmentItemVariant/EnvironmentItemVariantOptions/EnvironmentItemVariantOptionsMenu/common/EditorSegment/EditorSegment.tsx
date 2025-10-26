import { TSegment } from "@root/app/features/math/types/segment.types";
import { getAngleFromPoints } from "@root/app/features/math/utils/getAngleFromPoints/getAngleFromPoints";
import { getDistance } from "@root/app/features/math/utils/getDistance/getDistance";
import { TColor } from "../colors/colors";

type TEditorSegmentProps = {
	segment: TSegment
	color?:  TColor
}

export const EditorSegment = ({
	segment,
	color = "amber",
}: TEditorSegmentProps) => {
	const angle = getAngleFromPoints(segment[0], segment[1]);
	const distance = getDistance(segment[0], segment[1]);

	return (
		<div
			class={`
				absolute
				h-[2px]
				${color === "blue" ? "bg-blue-600" : ""}
				${color === "amber" ? "bg-amber-400" : ""}
				origin-top-left
				pointer-events-none
			`}
			style={{
				width:     distance,
				left:      segment[0].x,
				top:       segment[0].y,
				transform: `rotate(${angle}deg)`,
			}}
		/>
	);
};