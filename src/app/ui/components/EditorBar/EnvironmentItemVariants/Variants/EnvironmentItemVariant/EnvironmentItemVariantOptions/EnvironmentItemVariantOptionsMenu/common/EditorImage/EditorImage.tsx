import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { SCALE_FACTOR } from "@root/app/common/types/animatedSprites.types";
import { TPoint } from "@root/app/common/types/point.type";
import { useEffect, useRef } from "preact/hooks";

type TEditorImageProps = {
	name:         string
	variant:      number
	direction:    TDirection8
	onClick:      (point: TPoint) => void
	onMouseMove?: (point: TPoint) => void
}

export const EditorImage = ({
	name,
	variant,
	direction,
	onClick,
	onMouseMove,
}: TEditorImageProps) => {
	const imgRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		const scaleImage = async () => {
			if (!imgRef.current!.complete) {
				await new Promise((res) => {
					imgRef.current!.onload = res;
				});
			}

			imgRef.current!.width = imgRef.current!.width * SCALE_FACTOR;
		};

		scaleImage();
	}, []);

	/**
	 * The cursor appears slightly higher and on the left compared to the actual coordinates of the event.
	 */
	const CURSOR_VISUAL_OFFSET = 1;

	return (
		<img
			class="bg-white"
			style="image-rendering: pixelated;"
			ref={imgRef}
			src={`src/assets/sprites/environment.${name}.${variant}.${direction}/0000.png`}
			onClick={event => {
				onClick({
					x: event.offsetX - CURSOR_VISUAL_OFFSET,
					y: event.offsetY - CURSOR_VISUAL_OFFSET,
				});
			}}
			onMouseMove={onMouseMove
				? event => 
					onMouseMove({
						x: event.offsetX - CURSOR_VISUAL_OFFSET,
						y: event.offsetY - CURSOR_VISUAL_OFFSET,
					})
				: undefined
			}
		/>
	);
};