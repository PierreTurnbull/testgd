import { gameEditorStore } from "@root/app/features/editor/store/store";
import { TDirection8 } from "@root/app/features/math/types/direction.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { TSegment } from "@root/app/features/math/types/segment.types";
import { TViewSortingCurve } from "@root/app/features/viewSortingCurve/types/viewSortingCurve.types";
import { useState } from "preact/hooks";
import { EditorImage } from "../../common/EditorImage/EditorImage";
import { EditorPoint } from "../../common/EditorPoint/EditorPoint";
import { EditorSegment } from "../../common/EditorSegment/EditorSegment";

type TSortingCurveEditorItemProps = {
	name:               string
	variant:            number
	direction:          TDirection8
	sortingCurve:       TViewSortingCurve
	appendSortingCurve: (sortingCurve: TPoint) => void
	updateSortingCurve: (key: number, sortingCurve: TPoint) => void
}

export const SortingCurveEditorItem = ({
	name,
	variant,
	direction,
	sortingCurve,
	appendSortingCurve,
	updateSortingCurve,
}: TSortingCurveEditorItemProps) => {
	const [mouseCoordinatesInImage, setMouseCoordinatesInImage] = useState({ x: 0, y: 0 });

	if (!gameEditorStore) {
		throw new Error("Game editor store is not initialized.");
	}

	const hitboxPoints = gameEditorStore.data.config.environment[name][variant][direction].hitboxPoints;

	return (
		<div class="border border-amber-400 rounded p-4">
			<div class="relative">
				<EditorImage
					name={name}
					variant={variant}
					direction={direction}
					onClick={(point: TPoint) => {
						appendSortingCurve({
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

				{/* Display hitbox points as a reference. They cannot be updated from here. */}

				{
					hitboxPoints.map((hitboxPoint, key) => {
						const isLastPoint = key === hitboxPoints.length - 1;

						const segment: TSegment = isLastPoint
							? [hitboxPoint, hitboxPoints[0]]
							: [hitboxPoint, hitboxPoints[key + 1]];

						return (
							<div key={`${hitboxPoint.x}.${hitboxPoint.y}`} class="pointer-events-none">
								<EditorSegment
									segment={segment}
								/>
							</div>
						);
					})
				}
				{
					hitboxPoints.map(hitboxPoint => {
						return (
							<div key={`${hitboxPoint.x}.${hitboxPoint.y}`}>
								<EditorPoint
									coordinates={hitboxPoint}
								/>
							</div>
						);
					})
				}

				{/* Edit the sorting curve. */}

				{
					sortingCurve.slice(0, -1).map((point, key) => {
						const segment: TSegment = [point, sortingCurve[key + 1]];

						return (
							<EditorSegment
								segment={segment}
								color={"blue"}
							/>
						);
					})
				}
				{
					sortingCurve.map((point, key) => {
						return (
							<div key={`${point.x}.${point.y}`}>
								<EditorPoint
									coordinates={point}
									mouseCoordinatesInImage={mouseCoordinatesInImage}
									updatePoint={(point: TPoint) => updateSortingCurve(key, point)}
									color={"blue"}
								/>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};