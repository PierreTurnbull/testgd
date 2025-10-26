import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { useEffect, useState } from "preact/hooks";
import { TColor } from "../colors/colors";

type TEditorPoint = {
	coordinates:              TCoordinates
	mouseCoordinatesInImage?: TPoint
	updatePoint?:             (point: TPoint) => void
	color?:                   TColor
}

export const EditorPoint = ({
	coordinates,
	mouseCoordinatesInImage,
	updatePoint,
	color = "amber",
}: TEditorPoint) => {
	const [isDragging, setIsDragging] = useState(false);
	const [localCoordinates, setLocalCoordinates] = useState(coordinates);

	useEffect(() => {
		if (!isDragging || !updatePoint || !mouseCoordinatesInImage) return;

		const nextPoint = {
			x: mouseCoordinatesInImage.x,
			y: mouseCoordinatesInImage.y,
		};

		setLocalCoordinates(nextPoint);
	}, [isDragging, mouseCoordinatesInImage]);

	useEffect(() => {
		setLocalCoordinates(coordinates);
	}, [coordinates]);

	return (
		<div
			class={`
				absolute
				top-0
				left-0
				w-2
				h-2
				rounded
				${color === "blue" ? "bg-blue-600" : ""}
				${color === "amber" ? "bg-amber-400" : ""}
				-translate-1
				${updatePoint ? "" : "pointer-events-none"}
			`}
			onMouseDown={updatePoint && mouseCoordinatesInImage ? () => setIsDragging(true) : undefined}
			onMouseUp={updatePoint && mouseCoordinatesInImage ? () => {
				setIsDragging(false);
				updatePoint(localCoordinates);
			} : undefined}
			style={`left: ${localCoordinates.x}px; top: ${localCoordinates.y}px;`}
		/>
	);
};