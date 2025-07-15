import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { useEffect, useState } from "preact/hooks";

type TEditorPoint = {
	coordinates:             TCoordinates
	mouseCoordinatesInImage: TPoint
	updatePoint?:            (point: TPoint) => void
}

export const EditorPoint = ({
	coordinates,
	mouseCoordinatesInImage,
	updatePoint,
}: TEditorPoint) => {
	const [isDragging, setIsDragging] = useState(false);
	const [localCoordinates, setLocalCoordinates] = useState(coordinates);

	useEffect(() => {
		if (!isDragging || !updatePoint) return;

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
			class={"absolute top-0 left-0 w-2 h-2 rounded bg-amber-400 -translate-1"}
			onMouseDown={updatePoint ? () => setIsDragging(true) : undefined}
			onMouseUp={updatePoint ? () => {
				setIsDragging(false);
				updatePoint(localCoordinates);
			} : undefined}
			style={`left: ${localCoordinates.x}px; top: ${localCoordinates.y}px;`}
		/>
	);
};