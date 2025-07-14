import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { gameEditorStore } from "@root/app/domains/editor/store/store";
import { useEffect, useRef } from "preact/hooks";

type TCenterEditorItemProps = {
	name:      string
	variant:   number
	direction: TDirection8
	center:    TCoordinates
	setCenter: (direction: TDirection8, center: TCoordinates) => void
}

export const CenterEditorItem = ({
	name,
	variant,
	direction,
	center,
	setCenter,
}: TCenterEditorItemProps) => {
	const imgRef = useRef<HTMLImageElement | null>(null);
	const currentCenterEl = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const scaleImage = async () => {
			if (!imgRef.current!.complete) {
				await new Promise((res) => {
					imgRef.current!.onload = res;
				});
			}

			imgRef.current!.width = imgRef.current!.width * 3;
		};

		scaleImage();
	}, []);

	useEffect(() => {
		currentCenterEl.current!.style = `left: ${center.x * SCALE_FACTOR}px; top: ${center.y * SCALE_FACTOR}px;`;
	}, [center]);

	return (
		<div class="border border-amber-400 rounded p-4">
			<div class="relative">
				<img
					class="bg-white"
					style="image-rendering: pixelated;"
					ref={imgRef}
					src={`src/assets/sprites/environment.${name}.${variant}.${direction}/0000.png`}
					onClick={event => {
						/**
						 * The cursor appears slightly higher and on the left compared to the actual coordinates of the event.
						 */
						const CURSOR_VISUAL_OFFSET = 1;
						setCenter(direction, {
							x: Math.round((event.offsetX - CURSOR_VISUAL_OFFSET) / 3),
							y: Math.round((event.offsetY - CURSOR_VISUAL_OFFSET) / 3),
						});
					}}
				/>
				<div
					class="absolute top-0 left-0 w-2 h-2 rounded bg-amber-400 -translate-1 pointer-events-none"
					ref={currentCenterEl}
				/>
			</div>
		</div>
	);
};