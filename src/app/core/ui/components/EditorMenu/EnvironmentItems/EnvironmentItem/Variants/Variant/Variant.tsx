import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { MenuItem } from "@root/app/core/ui/components/common/MenuItem/MenuItem";

type TVariantProps = {
	name:    string
	variant: number
}

export const Variant = ({
	name,
	variant,
}: TVariantProps) => {
	return (
		<MenuItem onClick={() => {}}>
			<img
				src={assetsManager.textures[`environment.${name}.${variant}.down`].label}
				class="h-full"
			/>
		</MenuItem>
	);
};