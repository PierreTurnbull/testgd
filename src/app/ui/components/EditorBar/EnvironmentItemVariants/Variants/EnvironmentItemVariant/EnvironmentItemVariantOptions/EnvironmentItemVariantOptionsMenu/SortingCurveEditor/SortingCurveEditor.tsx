import { gameEditorStore } from "@root/app/features/editor/store/store";
import { TDirection8 } from "@root/app/features/math/types/direction.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { TViewSortingCurve } from "@root/app/features/viewSortingCurve/types/viewSortingCurve.types";
import { Modal } from "@root/app/ui/components/common/Modal/Modal";
import { useEffect, useState } from "preact/hooks";
import { EditorButtons } from "../common/EditorButtons/EditorButtons";
import { SortingCurveEditorItem } from "./SortingCurveEditorItem/SortingCurveEditorItem";

type TSortingCurveEditorProps = {
	close:   () => void
	name:    string
	variant: number
}

export const SortingCurveEditor = ({
	close,
	name,
	variant,
}: TSortingCurveEditorProps) => {
	const [direction, setDirection] = useState<TDirection8>("up");
	const [sortingCurves, setSortingCurves] = useState<Record<TDirection8, TViewSortingCurve>>({
		up:        [],
		upRight:   [],
		right:     [],
		downRight: [],
		down:      [],
		downLeft:  [],
		left:      [],
		upLeft:    [],
	});
		
	useEffect(() => {
		if (!gameEditorStore) {
			throw new Error("Game editor store is not initialized.");
		}

		setSortingCurves(structuredClone({
			up:        gameEditorStore.data.config.environment[name][variant].up.sortingCurve,
			upRight:   gameEditorStore.data.config.environment[name][variant].upRight.sortingCurve,
			right:     gameEditorStore.data.config.environment[name][variant].right.sortingCurve,
			downRight: gameEditorStore.data.config.environment[name][variant].downRight.sortingCurve,
			down:      gameEditorStore.data.config.environment[name][variant].down.sortingCurve,
			downLeft:  gameEditorStore.data.config.environment[name][variant].downLeft.sortingCurve,
			left:      gameEditorStore.data.config.environment[name][variant].left.sortingCurve,
			upLeft:    gameEditorStore.data.config.environment[name][variant].upLeft.sortingCurve,
		}));
	}, []);

	const reset = () => {
		setSortingCurves(prev => {
			const nextSortingCurve = structuredClone(prev);

			nextSortingCurve[direction] = [];

			return nextSortingCurve;
		});
	};

	const undo = () => {
		setSortingCurves(prev => {
			const nextSortingCurve = structuredClone(prev);

			nextSortingCurve[direction] = nextSortingCurve[direction].slice(0, -1);

			return nextSortingCurve;
		});
	};

	return (
		<Modal
			close={close}
		>
			<div class="flex flex-col space-y-4 items-center">
				<p class="text-amber-400">{name}.{variant}.{direction}</p>
				<SortingCurveEditorItem
					name={name}
					variant={variant}
					direction={direction}
					sortingCurve={sortingCurves[direction]}
					appendSortingCurve={(sortingCurve: TPoint) => {
						setSortingCurves(prev => {
							const nextSortingCurve = structuredClone(prev[direction]);

							nextSortingCurve.push(sortingCurve);

							return {
								...prev,
								[direction]: nextSortingCurve,
							};
						});
					}}
					updateSortingCurve={(key: number, sortingCurve: TPoint) => {
						setSortingCurves(prev => {
							const nextSortingCurve = structuredClone(prev[direction]);

							nextSortingCurve[key] = sortingCurve;

							return {
								...prev,
								[direction]: nextSortingCurve,
							};
						});
					}}
				/>
				<EditorButtons
					submit={async () => {
						Object.entries(sortingCurves).forEach(entry => {
							gameEditorStore!.data.config.environment[name][variant][entry[0] as TDirection8].sortingCurve = entry[1];
						});
						close();
					}}
					close={close}
					reset={reset}
					undo={undo}
					setDirection={setDirection}
				/>
			</div>
		</Modal>
	);
};