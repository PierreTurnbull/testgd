import { assetsManager } from "@root/app/domains/assetsManager/assetsManager.singletons";
import { MenuItem } from "@root/app/ui/components/common/MenuItem/MenuItem";
import { uiBus } from "@root/app/ui/utils/uiBus/uiBus.singleton";

type TEnvironmentItemVariantProps = {
	name:    string
	variant: number
}

export const EnvironmentItemVariant = ({
	name,
	variant,
}: TEnvironmentItemVariantProps) => {
	return (
		<MenuItem
			onClick={() => {
				uiBus.emit("interactWithEditorBar");
				uiBus.emit("selectEnvironmentItemVariant", {
					payload: {
						name:    name,
						variant: variant,
					},
				});
			}}
		>
			<img
				src={assetsManager.textures[`environment.${name}.${variant}.down`].label}
				class="h-full"
			/>
		</MenuItem>
	);
};