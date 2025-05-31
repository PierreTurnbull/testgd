import { MenuItem } from "../../../common/MenuItem/MenuItem";

type TEnvironmentItemProps = {
    openEnvironmentItemMenu: () => void
    name:                    string
}

export const EnvironmentItem = ({
	openEnvironmentItemMenu,
	name,
}: TEnvironmentItemProps) => {
	return (
		<MenuItem onClick={openEnvironmentItemMenu}>
			<img src={`src/assets/sprites/environment.${name}.0.down/0000.png`} />
		</MenuItem>
	);
};