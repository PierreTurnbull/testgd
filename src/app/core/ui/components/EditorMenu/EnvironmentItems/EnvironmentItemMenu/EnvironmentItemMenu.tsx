import { EditorBar } from "../../../common/EditorBar/EditorBar";
import { Variants } from "../EnvironmentItem/Variants/Variants";

type TEnvironmentItemMenuProps = {
    name: string
}

export const EnvironmentItemMenu = ({
	name,
}: TEnvironmentItemMenuProps) => {
	return (
		<EditorBar>
			<Variants name={name} />
		</EditorBar>
	);
};