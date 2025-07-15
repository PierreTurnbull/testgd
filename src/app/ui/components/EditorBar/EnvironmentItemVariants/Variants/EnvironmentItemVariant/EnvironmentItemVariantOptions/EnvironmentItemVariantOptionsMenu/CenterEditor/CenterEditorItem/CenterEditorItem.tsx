import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { useState } from "preact/hooks";
import { EditorImage } from "../../common/EditorImage/EditorImage";
import { EditorPoint } from "../../common/EditorPoint/EditorPoint";

type TCenterEditorItemProps = {
	name:      string
	variant:   number
	direction: TDirection8
	center:    TCoordinates
	setCenter: (center: TCoordinates) => void
}

export const CenterEditorItem = ({
	name,
	variant,
	direction,
	center,
	setCenter,
}: TCenterEditorItemProps) => {
	const [mouseCoordinatesInImage, setMouseCoordinatesInImage] = useState({ x: 0, y: 0 });

	return (
		<div class="border border-amber-400 rounded p-4">
			<div class="relative">
				<EditorImage
					name={name}
					variant={variant}
					direction={direction}
					onClick={(point: TPoint) => {
						setCenter({
							x: point.x,
							y: point.y,
						});
					}}
					onMouseMove={(point: TPoint) => {
						setMouseCoordinatesInImage({
							x: point.x,
							y: point.y,
						});
					}}
				/>
				<EditorPoint
					coordinates={center}
					mouseCoordinatesInImage={mouseCoordinatesInImage}
				/>
			</div>
		</div>
	);
};