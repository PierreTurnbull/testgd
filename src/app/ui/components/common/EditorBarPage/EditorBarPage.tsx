import { uiBus } from "@root/app/ui/utils/uiBus/uiBus.singleton";
import { ReactNode } from "preact/compat";
import { EDITOR_BAR_HEIGHT } from "../../../constants/ui.constants";
import { IconButton } from "../IconButton/IconButton";

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
			class={"flex justify-between absolute z-1 bg-amber-800 w-full bottom-0 left-0 right-0 overflow-hidden leading-none p-2"}
			style={{
				height: EDITOR_BAR_HEIGHT,
			}}
		>
			{children}
			<IconButton
				icon="✖"
				onClick={() => uiBus.emit("closeFocusedUi")}
			/>
		</div>
	);
};