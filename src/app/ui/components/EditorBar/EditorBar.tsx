import { EditorBarPage } from "../common/EditorBarPage/EditorBarPage";
import { EnvironmentItems } from "./EnvironmentItems/EnvironmentItems";

type TEditorBarProps = {
	close: () => void
}

export const EditorBar = ({
	close,
}: TEditorBarProps) => {
	return (
		<EditorBarPage>
			<EnvironmentItems
				close={close}
			/>
		</EditorBarPage>
	);
};