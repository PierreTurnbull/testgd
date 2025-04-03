import { ReactNode } from "preact/compat";

type TEditorBarProps = {
	children: ReactNode
}

/**
 * A bar that can display some content.
 */
export const EditorBar = ({
	children,
}: TEditorBarProps) => {
	return (
		<div
			class="absolute z-1 bg-amber-900 w-full h-[100px] bottom-0 overflow-hidden leading-none p-2 space-x-2 flex"
		>
			{children}
		</div>
	);
};