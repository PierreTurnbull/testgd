import { TSegment } from "@root/app/common/types/segment.types";
import { getAngleFromPoints } from "@root/app/common/utils/geometry/getAngleFromPoints/getAngleFromPoints";
import { getDistance } from "@root/app/common/utils/geometry/getDistance/getDistance";

type TEditorSegmentProps = {
	segment: TSegment
}

export const EditorSegment = ({
	segment,
}: TEditorSegmentProps) => {
	const angle = getAngleFromPoints(segment[0], segment[1]);
	const distance = getDistance(segment[0], segment[1]);

	return (
		<div
			class={`
				absolute
				h-[2px]
				bg-amber-400
				origin-top-left
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