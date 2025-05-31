import { ReactNode } from "preact/compat";
import { EDITOR_BAR_HEIGHT } from "../../../constants/ui.constants";

type TEditorBarProps = {
	children: ReactNode
}

/**
 * A bar that can display some content.
 */
export const EditorBarPage = ({
	children,
}: TEditorBarProps) => {
	return (
		<div
			class={"absolute z-1 bg-amber-900 w-full bottom-0 overflow-hidden leading-none p-2 space-x-2 flex"}
			style={{
				height: EDITOR_BAR_HEIGHT,
			}}
		>
			{children}
		</div>
	);
};